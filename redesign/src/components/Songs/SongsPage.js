import {useState, useEffect} from 'react';
import api from '../../api';
import {onValue} from 'firebase/database';

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  // const [songsMap, setSongsMap] = useState({});
  const [loadingSongs, setLoadingSongs] = useState(true);

  const makeArrayFromDB = snapshot => {
    return Object.entries(snapshot.val()).map(([id, item]) => {
      item.id = id;
      return item;
    });
  }

  useEffect(() => {
    onValue(api.getSongsRef(), snapshot => {
      // setSongsMap(snapshot.val());
      const songsArr = makeArrayFromDB(snapshot);
      setSongs(songsArr);
      setLoadingSongs(false);
    });
  }, [])

  if (loadingSongs) return <p>Loading...</p>

  return  (
    <div className="page-songs">
      <div className="songlist-container">
        <ol className="songlist">
          {songs.map(s => <li key={s.id} >{s.title}</li>)}
        </ol>
      </div>
    </div>
  )
}

export default SongsPage;
