import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useFormData} from '../../Forms/useFormData';
import {keyOptions, singerOptions, instrumentOptions} from './songData';
import api from '../../api';
import {set, push, remove} from 'firebase/database';

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
    const songRef = api.getSongRef(id);
    remove(songRef);
    handleCancel();
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
          className="long-input"
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
          {instrumentOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="carl">Carl</label>
        <select name="carl" value={formData.carl || 'Guitar'} onChange={handleInputChange}>
          {instrumentOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="mike">Mike</label>
        <select name="mike" value={formData.mike || 'Bass'} onChange={handleInputChange}>
          {instrumentOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="nate">Nate</label>
        <select name="nate" value={formData.nate || ''} onChange={handleInputChange}>
          {instrumentOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div className="field-pair">
        <label htmlFor="bpm">bpm</label>
        <input name="bpm" type="number" value={formData.bpm || ''} onChange={handleInputChange} />
      </div>

      <div className="field-pair">
        <label></label>
        <button type="submit">save</button>
        <button className="cancel" type="button" onClick={handleCancel}>cancel</button>
      </div>

      {song.id && 
        <>
          <div className="field-pair">
            <label htmlFor="enable_delete">Enable Delete</label>
            <input id="enable_delete" type="checkbox" value={enableDelete} onChange={() => setEnableDelete(enabled => !enabled)} />
          </div>
          
          <div className="field-pair">
            <label></label>
              <button disabled={!enableDelete} className="delete" type="button" onClick={() => handleDelete(song.id)}>
                x delete song
              </button>
          </div>
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
