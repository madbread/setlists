import PropTypes from 'prop-types';

const Setlist = ({
  editMode,
  setlist,
  songsMap,
  handleRemoveSong,
  showNate,
  showMike,
  showAdam,
  showCarl,
  highlight
}) => {

  const displayList = () => {
    const sorted = Object.entries(setlist.songs).sort(([,a],[,b]) => a-b);
    return sorted.map((song, idx) => {
      const songId = song[0];
      return(
        <tr key={songId} className={`color_${songsMap[songId][highlight] || ''}`}>
          <td className="song-title">{idx + 1}) {songsMap[songId].title}</td>
          {showNate && <td className="name-col">{songsMap[songId].nate}</td>}
          {showMike && <td className="name-col">{songsMap[songId].mike}</td>}
          {showAdam && <td className="name-col">{songsMap[songId].adam}</td>}
          {showCarl && <td className="name-col">{songsMap[songId].carl}</td>}
          <td className="short-col song-key">{songsMap[songId].key}</td>
          {editMode && <td className="short-col"><button className="remove-button" type="button" onClick={() => handleRemoveSong(songId)}>X</button></td>}
        </tr>);
    })
  }

  return  (
    <div className="songlist-container">
      {setlist && 
        <table className="songlist">
          <thead>
            <tr>
              <th className="song-title"></th>
              {showNate && <th className="name-col">Nate</th>}
              {showMike && <th className="name-col">Mike</th>}
              {showAdam && <th className="name-col">Adam</th>}
              {showCarl && <th className="name-col">Carl</th>}
              <th className="short-col song-key">key</th>
              {editMode && <th className="short-col"></th>}
            </tr>
          </thead>
          <tbody>
            {displayList()}
          </tbody>
        </table>
      }
    </div>
  )
}

Setlist.propTypes = {
  setlist: PropTypes.object,
  songsMap: PropTypes.object,
  handleRemoveSong: PropTypes.func,
  editMode: PropTypes.bool,
  showNate: PropTypes.bool,
  showMike: PropTypes.bool,
  showAdam: PropTypes.bool,
  showCarl: PropTypes.bool,
  highlight: PropTypes.string
}


export default Setlist;
