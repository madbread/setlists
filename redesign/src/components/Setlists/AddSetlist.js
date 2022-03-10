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
      <div className="controls">
        <button disabled={!listTitle.length} onClick={clearTitleAndSubmit}>Add Setlist</button>
        <input onChange={e => setlistTitle(e.target.value)} name="title" value={listTitle} />
      </div>
    </div>
  )
}

AddSetlist.propTypes = {
  handleAddSetlist: PropTypes.func
}

export default AddSetlist;
