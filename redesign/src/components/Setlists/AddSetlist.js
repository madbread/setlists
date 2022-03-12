import PropTypes from 'prop-types';
import {useState} from 'react';

const AddSetlist = ({handleAddSetlist}) => {
  const [listTitle, setlistTitle] = useState('');

  const clearTitleAndSubmit = () => {
    const newTitle = listTitle;
    handleAddSetlist(newTitle);
    setlistTitle('');
  };

  return  (
    <div className="add-setlist">
      <div className="field-pair">
        <label htmlFor="add_list">New Setlist</label>
        <input id="add_list" onChange={e => setlistTitle(e.target.value)} name="title" value={listTitle} />
      </div>
      <div className="align-right">
        <button disabled={!listTitle.length} onClick={clearTitleAndSubmit}>+ Add New Setlist</button>
      </div>
    </div>
  )
}

AddSetlist.propTypes = {
  handleAddSetlist: PropTypes.func
}

export default AddSetlist;
