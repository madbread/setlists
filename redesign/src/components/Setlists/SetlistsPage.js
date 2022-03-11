import {useState, useEffect} from 'react';
import api from '../../api';
import {onValue, get, set, push, remove} from 'firebase/database';
import Setlist from './Setlist';
import SetlistAdmin from './SetlistAdmin';
import SelectSetlist from './SelectSetlist';
import HighlightControls from './HighlightControls';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    const makeArrayFromDB = snapshot => {
      return Object.entries(snapshot.val()).map(([id, item]) => {
        item.id = id;
        return item;
      });
    }
    
    const songlistsRef = onValue(api.getSonglistsRef(), snapshot => {
      setSetlistMap(snapshot.val());
      const lists = makeArrayFromDB(snapshot);
      setSetlists(lists);
      setLoadingSetlists(false);
    });
    
    const songsRef = onValue(api.getSongsRef(), snapshot => {
      setSongsMap(snapshot.val());
      const songsArr = makeArrayFromDB(snapshot);
      setSongs(songsArr);
      setLoadingSongs(false);
    });

    return () => {
      songlistsRef();
      songsRef();
    }
  }, []);

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
  };

  const handleReorderSetlist = (startIndex, endIndex) => {
    const songlistSongsRef = api.getSonglistSongsRef(selectedListId);
    get(songlistSongsRef).then(songs => {
      const songsData = songs.val();
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
      set(songlistSongsRef, songsData);
    });
  };

  const handleAddSetlist = title => {
    const songlistsRef = api.getSonglistsRef();
    const newListRef = push(songlistsRef);
    set(newListRef, {title});
  }

  const handleDeleteList = () => {
    if (setlists.length === 1) {
      alert('You cannot delete the Last Setlist');
    } else {
      const firstListId = setlists[0].id;
      const newListId = firstListId === selectedListId ? setlists[1].id : firstListId;
      const songlistRef = api.getSonglistRef(selectedListId);
      remove(songlistRef)
      setSelectedListId(newListId);
    }
  }

  const handleAddSong = songId => {
    const songlistSongsRef = api.getSonglistSongsRef(selectedListId);
    get(songlistSongsRef).then(songs => {
      const songsData = songs.val() || {};
      const setlistObj = setlistMap[selectedListId]
      const songsObj = setlistObj?.songs || {};
      const newLastNumber = Object.keys(songsObj).length
      songsData[songId] = newLastNumber;
      set(songlistSongsRef, songsData);
    });
  }

  if (loadingSetlists || loadingSongs) return <p>Loading...</p>

  if (selectedListId === null) setSelectedListId(setlists[0].id);

  const setlistObj = setlistMap[selectedListId || setlists[0].id]
  const songsObj = setlistObj?.songs || {};
  const includedSongIds =  Object.keys(songsObj);
  const songsNotInList = songs.filter(s => !includedSongIds.includes(s.id));

  const inLegend = new Set();
  if (highlight !== '') includedSongIds.forEach(id => inLegend.add(songsMap[id][highlight]));

  return  (
    <div className="page-setlist">
      <SelectSetlist
        setSelectedListId={setSelectedListId}
        setEditMode={setEditMode}
        editMode={editMode}
        selectedListId={selectedListId}
        setlists={setlists}
      />

      <HighlightControls
        inLegend={inLegend}
        highlight={highlight}
        showNate={showNate}
        showMike={showMike}
        showAdam={showAdam}
        showCarl={showCarl}
        setShowNate={setShowNate}
        setShowMike={setShowMike}
        setShowAdam={setShowAdam}
        setShowCarl={setShowCarl}
        setHighlight={setHighlight}/>
      
      {editMode &&
        <SetlistAdmin
          handleAddSong={handleAddSong}
          handleAddSetlist={handleAddSetlist}
          handleDeleteList={handleDeleteList}
          songsNotInList={songsNotInList}
        />
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
      <Link className="btn float-right" to={`/print/${selectedListId}`} target="_blank">Print List</Link>
    </div>
  )
}

export default SetlistsPage;
