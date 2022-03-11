import PropTypes from 'prop-types';
import {useState} from 'react';
import FilterSongOptions from './FilterSongOptions';

const AddSong = ({songs,  handleAddSong}) => {
  const [filter, setFilter] = useState('');

  const [availableSongs,  setAvailableSongs] = useState([...songs]);
  const [filteredSongs, setFilteredSongs] = useState([...availableSongs]);
  const [selectedSong, setSelectedSong] = useState(filteredSongs[0]?.id)

  const handleSaveSong = () =>  {
    handleAddSong(selectedSong)
    const nowAvailable = availableSongs.filter(s => s.id !== selectedSong);
    setAvailableSongs(nowAvailable);
    setFilteredSongs([...nowAvailable]);
    setSelectedSong(nowAvailable[0]?.id);
    setFilter('');
  }

  const handleSetFilter = e => {
    setFilter(e.target.value);
    if (e.target.value?.length > 1) {
      const matchStr = e.target.value.toLowerCase();
      const newFilteredSongs = songs.filter(s => s.title.toLowerCase().includes(matchStr));
      setFilteredSongs(newFilteredSongs);
      setSelectedSong(newFilteredSongs[0]?.id);
    } else {
      setFilteredSongs([...songs])
    }
  }

  return  (
    <div className="add-song">
      <FilterSongOptions filter={filter} setFilter={handleSetFilter}/>
      <select value={selectedSong} onChange={e => setSelectedSong(e.target.value)} >
        {filteredSongs.map(song => <option value={song.id} key={song.id}>{song.title}</option>)}
      </select>
      <button type="button" onClick={handleSaveSong}>+ Add Song</button>
    </div>
  )
}

AddSong.propTypes = {
  songs: PropTypes.array,
  handleAddSong: PropTypes.func
}

export default AddSong;
