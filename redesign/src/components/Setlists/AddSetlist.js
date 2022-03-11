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
      <input onChange={e => setlistTitle(e.target.value)} name="title" value={listTitle} />
      <button disabled={!listTitle.length} onClick={clearTitleAndSubmit}>+ Add New Setlist</button>
    </div>
  )
}

AddSetlist.propTypes = {
  handleAddSetlist: PropTypes.func
}

export default AddSetlist;
