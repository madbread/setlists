import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const abbr = title => {
  let newTitle;
  switch (title) {
    case 'Mandolin':
      newTitle = 'Mando';
      break;
    case 'Harmonica':
      newTitle = 'Harp';
      break;
    case 'Guitar':
      newTitle = 'Guitar';
      break;
    case 'Fiddle':
      newTitle = 'Fidd';
      break;
    case 'Lap Steel':
      newTitle = 'Lap';
      break;
    case 'Electric':
      newTitle = 'Elec';
      break;
    default:
      newTitle = title;
  }
  return newTitle
}

const Setlist = ({
  editMode,
  setlist,
  songsMap,
  handleRemoveSong,
  handleReorderSetlist,
  showMike,
  showAdam,
  showCarl,
  highlight
}) => {
  const songs = setlist.songs || {};
  const sorted = Object.entries(songs).sort(([,a],[,b]) => a-b);
  
  const displayList = () => sorted.map((song, idx) => {
    const songId = song[0];
    return (
      <Draggable key={songId} draggableId={songId} index={idx} isDragDisabled={!editMode}>
        {(provided, snapshot) => (
          <tr
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`color_${songsMap[songId][highlight] || ''}`}
          >
            <td className="song-title">{idx + 1}) {songsMap[songId].title}</td>
            {showMike && <td className="name-col">{abbr(songsMap[songId].mike)}</td>}
            {showAdam && <td className="name-col">{abbr(songsMap[songId].adam)}</td>}
            {showCarl && <td className="name-col">{abbr(songsMap[songId].carl)}</td>}
            <td className="short-col song-key">{songsMap[songId].key}</td>
            {editMode && <td className="short-col"><button className="remove-button" type="button" onClick={() => handleRemoveSong(songId)}>X</button></td>}
          </tr>
        )}
      </Draggable>
    );
  });

  const onDragEnd = result => {
    if (!result.destination || !editMode) return;
    handleReorderSetlist(result.source.index, result.destination.index);
  }

  return  (
    <div className={editMode ? 'edit-mode songlist-container' : 'songlist-container'}>
      {setlist && 
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <table className="songlist"
                ref={provided.innerRef}
              >
                <thead>
                  <tr>
                    <th className="song-title"></th>
                    {showMike && <th className="name-col">Mike</th>}
                    {showAdam && <th className="name-col">Adam</th>}
                    {showCarl && <th className="name-col">Carl</th>}
                    <th className="short-col song-key">key</th>
                    {editMode && <th className="short-col"></th>}
                  </tr>
                </thead>
                <tbody>
                  {displayList()}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      }
    </div>
  )
}

Setlist.propTypes = {
  setlist: PropTypes.object,
  songsMap: PropTypes.object,
  handleRemoveSong: PropTypes.func,
  handleReorderSetlist: PropTypes.func,
  editMode: PropTypes.bool,
  showMike: PropTypes.bool,
  showAdam: PropTypes.bool,
  showCarl: PropTypes.bool,
  highlight: PropTypes.string
}


export default Setlist;
