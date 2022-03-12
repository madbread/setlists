import {useState, useEffect} from 'react';
import api from '../../api';
import {onValue, off} from 'firebase/database';
import EditSongForm from './EditSongForm';
import ViewSongs from './ViewSongs';
import {getNewSong} from './songData';

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [selectedSong, setSelectedSong] = useState('none');
  const [filter, setFilter] = useState('');
  const [selectedSongData, setSelectedSongData] = useState(null);

  useEffect(() => {
    const makeArrayFromDB = snapshot => {
      return Object.entries(snapshot.val()).map(([id, item]) => {
        item.id = id;
        return item;
      });
    }
    
    const songsRef = api.getSongsRef();
    onValue(songsRef, snapshot => {
      const songsArr = makeArrayFromDB(snapshot);
      songsArr.sort((a, b) => (a.title > b.title) ? 1 : -1);
      setSongs(songsArr);
      setFilteredSongs([...songsArr]);
      setLoadingSongs(false);
    });

    return () => {
      off(songsRef);
    }
  }, []);

  useEffect(() => {
    if (selectedSong !== 'none') {
      setSelectedSongData(songs.find(s => s.id === selectedSong))
    }
  }, [selectedSong, songs])
  
  if (loadingSongs) return <p>Loading...</p>

  const handleSetFilter = e => {
    setFilter(e.target.value);
    if (e.target.value?.length > 1) {
      const matchStr = e.target.value.toLowerCase();
      const newFilteredSongs = songs.filter(s => s.title.toLowerCase().includes(matchStr));
      setFilteredSongs(newFilteredSongs);
      setSelectedSong('none');
    } else {
      setFilteredSongs([...songs])
    }
  }

  const handleAddSong = () => {
    setSelectedSong('none');
    setSelectedSongData(getNewSong());
  };

  const handleCancel = () => {
    setSelectedSong('none');
    setSelectedSongData(null);
  };

  const options = () => {
    const songOptions =  filteredSongs.map(s => <option value={s.id} key={s.id}>{s.title}</option>);
    return [<option value="none" key="none">Select A Song</option>].concat(songOptions);
  };

  return  (
    <div className="page-songs">
      <div className="songlist-container">
          <h2>Edit Songs</h2>
          <div className="field-pair">
            <label htmlFor="song-filter">Filter Songs</label>
            <input onChange={handleSetFilter} value={filter} />
          </div>
        <div className="field-pair">
          <label htmlFor="song-select">Edit Song</label>
          <select id="song-select" value={selectedSong} onChange={e => setSelectedSong(e.target.value)} >
            {options()}
          </select>
        </div>
        <button onClick={handleAddSong} type="button">+ New Song</button>
        {selectedSongData && <EditSongForm song={selectedSongData} handleCancel={handleCancel} />}
      </div>
      <div className="songlist-container">
        <ViewSongs songs={songs} />
      </div>
    </div>
  )
}

export default SongsPage;
