import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AddSong from './AddSong';
import AddSetlist from './AddSetlist';

import './setlist-admin.css'

const SetlistAdmin = ({handleAddSong, handleAddSetlist, handleDeleteList, songsNotInList}) => {
  const [enableDeleteList, setEnableDeleteList] = useState(false);

  const resetEnableDelete = () => {
    setEnableDeleteList(false);
    handleDeleteList();
  };

  return  (
    <div className="list-admin">
      <h3>Edit Setlists</h3>
      <AddSong handleAddSong={handleAddSong} songs={songsNotInList} />
      <hr />
      <AddSetlist handleAddSetlist={handleAddSetlist} />
      <hr />
      <button disabled={!enableDeleteList} onClick={resetEnableDelete}>Delete This Setlist</button> <label htmlFor="enableDel">Enable Delete</label>
      <input id="enableDel" name="enableDel" onChange={() => setEnableDeleteList(enabled => !enabled)} type="checkbox" checked={enableDeleteList} />
    </div>
  )
}

SetlistAdmin.propTypes = {
  handleAddSong: PropTypes.func,
  handleAddSetlist: PropTypes.func,
  handleDeleteList: PropTypes.func,
  songsNotInList: PropTypes.array
};


export default SetlistAdmin;
