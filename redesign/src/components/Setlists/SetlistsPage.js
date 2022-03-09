import {useState, useEffect} from 'react';
import api from '../../api';
import {onValue, get, set} from 'firebase/database';
import Setlist from './Setlist';
import AddSong from './AddSong';

const SetlistsPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const [setlists, setSetlists] = useState([]);
  const [songs, setSongs] = useState([]);

  const [showNate, setShowNate]   = useState(false);
  const [showMike, setShowMike]   = useState(false);
  const [showAdam, setShowAdam]   = useState(false);
  const [showCarl, setShowCarl]   = useState(false);
  const [highlight, setHighlight] = useState('');

  const [setlistMap, setSetlistMap] = useState({});
  const [songsMap, setSongsMap] = useState({});

  const [loadingSongs, setLoadingSongs] = useState(true);
  const [loadingSetlists, setLoadingSetlists] = useState(true);

  const makeArrayFromDB = snapshot => {
    return Object.entries(snapshot.val()).map(([id, item]) => {
      item.id = id;
      return item;
    });
  }

  const handleRemoveSong = songId => {
    const songlistSongsRef = api.getSonglistSongsRef(selectedListId);
    get(songlistSongsRef).then(songs => {
      const songsData = songs.val();
      const removedOrder = songsData[songId];
      delete songsData[songId];
      for (const song in songsData) {
        if (songsData[song] > removedOrder ) {
          songsData[song]--;
        }
      }
      set(songlistSongsRef, songsData);
    });
  }

  const handleReorderSetlist = (startIndex, endIndex) => {
    const songlistSongsRef = api.getSonglistSongsRef(selectedListId);
    get(songlistSongsRef).then(songs => {
      const songsData = songs.val();
      console.log('before: ', {...songsData});
      for (const song in songsData) {
        const oldPos = songsData[song];
        if (oldPos === startIndex ) {
          songsData[song] = endIndex;
        } else if (oldPos < startIndex  && oldPos >= endIndex) {
          songsData[song] = oldPos + 1;
        } else if (oldPos > startIndex  && oldPos <= endIndex) {
          songsData[song] = oldPos - 1;
        }
      }
      console.log('after: ', {...songsData});
      console.log(startIndex, endIndex);
      set(songlistSongsRef, songsData);
    });

      // const result = Array.from(list);
    // const [removed] = result.splice(startIndex, 1);
    // result.splice(endIndex, 0, removed);
  
  };

  const handleAddSong = songId => {
    const songlistSongsRef = api.getSonglistSongsRef(selectedListId);
    get(songlistSongsRef).then(songs => {
      const songsData = songs.val();
      const newLastNumber = Object.keys(setlistMap[selectedListId].songs).length
      songsData[songId] = newLastNumber;
      set(songlistSongsRef, songsData);
    });
  }

  useEffect(() => {
    onValue(api.getSonglistsRef(), snapshot => {
      setSetlistMap(snapshot.val());
      const lists = makeArrayFromDB(snapshot);
      setSetlists(lists);
      setLoadingSetlists(false);
    });
    
    onValue(api.getSongsRef(), snapshot => {
      setSongsMap(snapshot.val());
      const songsArr = makeArrayFromDB(snapshot);
      setSongs(songsArr);
      setLoadingSongs(false);
    });
  }, [])

  if (loadingSetlists || loadingSongs) return <p>Loading...</p>

  if (selectedListId === null) setSelectedListId(setlists[0].id);
  const includedSongIds =  Object.keys(setlistMap[selectedListId || setlists[0].id].songs);
  const songsNotInList = songs.filter(s => !includedSongIds.includes(s.id));

  const inLegend = new Set();
  if (highlight !== '') includedSongIds.forEach(id => inLegend.add(songsMap[id][highlight]));

  return  (
    <div className="page-setlist">
      <div className="list-selector">
        <div className="select-container">
          <select value={selectedListId} onChange={e => setSelectedListId(e.target.value)}>
            {setlists.map(list => <option value={list.id} key={list.id}>{list.title}</option>)}
          </select>
        </div>
        <button type="button" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Edit Mode' : 'Read Only'}
        </button>
      </div>

      <div className="highlight-controls">
        <label htmlFor="cb_nate">Nate</label>
        <input id="cb_nate" type="checkbox" checked={showNate} onChange={e => setShowNate(e.target.checked)}/>
        <label htmlFor="cb_mike">Mike</label>
        <input id="cb_mike" type="checkbox" checked={showMike} onChange={e => setShowMike(e.target.checked)}/>
        <label htmlFor="cb_adam">Adam</label>
        <input id="cb_adam" type="checkbox" checked={showAdam} onChange={e => setShowAdam(e.target.checked)}/>
        <label htmlFor="cb_carl">Carl</label>
        <input id="cb_carl" type="checkbox" checked={showCarl} onChange={e => setShowCarl(e.target.checked)}/>
        <select value={highlight} onChange={e => setHighlight(e.target.value)}>
          <option value="">None</option>
          <option value="nate">Nate</option>
          <option value="mike">Mike</option>
          <option value="adam">Adam</option>
          <option value="carl">Carl</option>
        </select>
      </div>

      {highlight !== '' &&
        <div className="highlight-legend">
          {inLegend.has('Mandolin') && <span className="color_Mandolin">Mandolin</span>}
          {inLegend.has('Bass') && <span className="color_Bass">Bass</span>}
          {inLegend.has('Fiddle') && <span className="color_Fiddle">Fiddle</span>}
          {inLegend.has('Guitar') && <span className="color_Guitar">Guitar</span>}
          {inLegend.has('Electric') && <span className="color_Electric">Electric</span>}
          {inLegend.has('Banjo') && <span className="color_Banjo">Banjo</span>}
          {inLegend.has('Harmonica') && <span className="color_Harmonica">Harmonica</span>}
        </div>
      }
      <Setlist
        editMode={editMode}
        setlist={setlistMap[selectedListId]}
        songsMap={songsMap}
        handleRemoveSong={handleRemoveSong}
        handleReorderSetlist={handleReorderSetlist}
        showNate={showNate}
        showMike={showMike}
        showAdam={showAdam}
        showCarl={showCarl}
        highlight={highlight}
      />
      {editMode && <AddSong handleAddSong={handleAddSong} songs={songsNotInList} />}
    </div>
  )
}

export default SetlistsPage;
