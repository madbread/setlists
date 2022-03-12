import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import AddSong from './AddSong';
import AddSetlist from './AddSetlist';

import './setlist-admin.css'

const SetlistAdmin = ({handleAddSong, handleAddSetlist, handleDeleteList, handleRenameSetlist, songsNotInList, title}) => {
  const [enableDeleteList, setEnableDeleteList] = useState(false);
  const [newTitle, setTitle] = useState(title);

  useEffect(() => setTitle(title), [title]);

  const resetEnableDelete = () => {
    setEnableDeleteList(false);
    handleDeleteList();
  };

  return  (
    <div className="list-admin">
      <AddSong handleAddSong={handleAddSong} songs={songsNotInList} />
      <hr />
      <h3>Rename This List</h3>
      <div className="field-pair">
        <label htmlFor="new_list_title">Name</label>
        <input id="new_list_title" name="title" value={newTitle} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="align-right">
        <button disabled={newTitle === title || newTitle === ''} onClick={() => handleRenameSetlist(newTitle)}>Update Name</button>
      </div>
      <hr />
      <div className="field-pair">
        <label htmlFor="enableDel">Delete</label>
        <button className={enableDeleteList ? 'delete' : 'hidden'} disabled={!enableDeleteList} onClick={resetEnableDelete}>Delete This Setlist</button>
        <input className="hidden" id="enableDel" name="enableDel" onChange={() => setEnableDeleteList(enabled => !enabled)} type="checkbox" checked={enableDeleteList} />
      </div>
        
      <hr />
      <h3>Add New Setlist</h3>
      <AddSetlist handleAddSetlist={handleAddSetlist} />
    </div>
  )
}

SetlistAdmin.propTypes = {
  handleAddSong: PropTypes.func,
  handleAddSetlist: PropTypes.func,
  handleDeleteList: PropTypes.func,
  handleRenameSetlist: PropTypes.func,
  songsNotInList: PropTypes.array,
  title: PropTypes.string
};


export default SetlistAdmin;
