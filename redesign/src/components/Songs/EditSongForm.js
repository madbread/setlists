import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useFormData} from '../../Forms/useFormData';
import {keyOptions, singerOptions, instrumentOptions} from './songData';
import api from '../../api';
import {get, set, push, remove} from 'firebase/database';

const abbr = title => {
  let newTitle;
  switch (title) {
    case 'Guitar':
      newTitle = 'Acoustic Guitar';
      break;
    case 'Electric':
      newTitle = 'Electric Guitar';
      break;
    default:
      newTitle = title;
  }
  return newTitle
}

const handleAddSetlist = data => {
  const songsRef = api.getSongsRef();
  const newSongsRef = push(songsRef);
  set(newSongsRef, data);
};

const EditSongForm = ({song, handleCancel}) => {

  const handleSave = data => {
    if (!data.id) handleAddSetlist(data);
    handleCancel();
  };

  const handleDelete = id => {
    
    // Check for existing song on any setlist
    const songlistsRef = api.getSonglistsRef();
    get(songlistsRef).then(songs => {
      const songsData = songs.val();
      const songIdsByList = Object.values(songsData).map(l => l.songs).map(i => Object.keys(i));
      const songInUse = songIdsByList.some(l => l.find(i => i === id))

      if (songInUse) {
        alert('That song is currently on a setlist. Remove from all setlists to delete.')
      } else {
        const songRef = api.getSongRef(id);
        remove(songRef);
        handleCancel();
      }
    });
  };

  const {formData, handleSubmit, handleInputChange, handleSetFormData} = useFormData(handleSave, song);
  const [enableDelete, setEnableDelete] = useState(false);

  useEffect(() => {
    if (song.id !== formData.id) handleSetFormData(song);
  }, [song, handleSetFormData, formData]);

  return (
    <form className="basic-form" onSubmit={handleSubmit}>
      <div className="field-pair">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={formData.title || ''}
          onChange={handleInputChange}
          className="full-width"
        />
      </div>
      <div className="field-pair">
        <label htmlFor="key">Key</label>
        <select name="key" value={formData.key || 'A'} onChange={handleInputChange}>
          {keyOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="singer">Singer</label>
        <select name="singer" value={formData.singer || 'Carl'} onChange={handleInputChange}>
          {singerOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="adam">Adam</label>
        <select name="adam" value={formData.adam || 'Banjo'} onChange={handleInputChange}>
          {instrumentOptions.map(o => <option key={o} value={o}>{abbr(o)}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="carl">Carl</label>
        <select name="carl" value={formData.carl || 'Guitar'} onChange={handleInputChange}>
          {instrumentOptions.map(o => <option key={o} value={o}>{abbr(o)}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="mike">Mike</label>
        <select name="mike" value={formData.mike || 'Bass'} onChange={handleInputChange}>
          {instrumentOptions.map(o => <option key={o} value={o}>{abbr(o)}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="nate">Nate</label>
        <select name="nate" value={formData.nate || ''} onChange={handleInputChange}>
          {instrumentOptions.map(o => <option key={o} value={o}>{abbr(o)}</option>)}
        </select>
      </div>

      <div className="field-pair">
        <label htmlFor="bpm">bpm</label>
        <input className="full-width" name="bpm" type="number" value={formData.bpm || ''} onChange={handleInputChange} />
      </div>

      <div className="field-pair">
        <label></label>
        <button type="submit">save</button>
        <button className="cancel" type="button" onClick={handleCancel}>cancel</button>
      </div>

      {song.id && 
        <>
          <div className="field-pair">
            <label htmlFor="enable_delete">Delete</label>
            {enableDelete &&
            <button className={enableDelete ? 'delete full-width' : ' delete hidden full-width'} type="button" onClick={() => handleDelete(song.id)}>
              x delete song
            </button>
            }
          </div>
          <input className="hidden" id="enable_delete" type="checkbox" value={enableDelete} onChange={() => setEnableDelete(enabled => !enabled)} />
        </>
      }
    </form>
  )
}

EditSongForm.propTypes = {
  song: PropTypes.object,
  handleCancel: PropTypes.func
};

EditSongForm.defaultProps = {
  song: {}
};

export default EditSongForm
