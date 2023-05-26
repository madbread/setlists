import {useState, useEffect} from 'react';
import api from '../../api';
import {onValue, off} from 'firebase/database';
import { useParams } from "react-router-dom";


import './print.css';

const print = () => window.print();

const PrintPage = () => {
  const [mike, setMike] = useState(false);
  const [carl, setCarl] = useState(false);
  const [bass, setBass] = useState(false);
  const [key, setKey] = useState(true);
  const [bold, setBold] = useState(false);

  const [title, setTitle] = useState('SETLIST');
  const [songsMap, setSongsMap] = useState({});
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [loadingSetlist, setLoadingSetlist] = useState(true);
  const [setlist, setSetlist] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const makeSongsArray = ({songs}) => Object.entries(songs).sort(([,a],[,b]) => a-b).map(e => e[0]);

    const songlistRef = api.getSonglistRef(id);
    onValue(songlistRef, snapshot => {
      const setlistDB = snapshot.val();
      if (setlistDB) {
        setSetlist(makeSongsArray(setlistDB));
        setTitle(snapshot.val().title);
      }
      setLoadingSetlist(false);
    });

    const songsRef = api.getSongsRef();
    onValue(songsRef, snapshot => {
      setSongsMap(snapshot.val());
      setLoadingSongs(false);
    });

    return () => {
      off(songlistRef);
    }
  }, [id]);

  if (loadingSetlist || loadingSongs) return <p>Loading...</p>

  const swapKeyValue = s => Object.entries(s).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [value]: key,
    }),
    {}
  );

  const SongRow = (s, idx) => {
    return (
      <tr key={idx}>
        <td className={bold ? 'bold': ''}>{s.title}</td>
        {carl && <td>{s.carl}</td>}
        {mike && <td>{s.mike}</td>}
        {bass && <td>{swapKeyValue(s).Bass || ''}</td>}
        {key && <td>{s.key}</td>}
      </tr>
    )
  };

  return  (
    <div className="print-records-page">
      <div className="noprint print_controls">
        <h5>Display Columns</h5>
        <div className="grid">
          <div className="grid-col-single">
            <label htmlFor="cb_Carl">Carl</label>
            <input id="cb_Carl" type="checkbox" onChange={() => setCarl(c => !c)} checked={carl}/><br />
          </div>
          <div className="grid-col-single">
            <label htmlFor="cb_Mike">Mike</label>
            <input id="cb_Mike" type="checkbox" onChange={() => setMike(c => !c)} checked={mike}/><br />
            <label htmlFor="cb_Bass">Bass</label>
            <input id="cb_Bass" type="checkbox" onChange={() => setBass(c => !c)} checked={bass}/><br />
            <label htmlFor="cb_Key">Key</label>
            <input id="cb_Key" type="checkbox" onChange={() => setKey(c => !c)} checked={key}/><br />
          </div>
          <div className="grid-col-single">
            <label htmlFor="cb_Bold">Bold Titles</label>  
            <input id="cb_Bold" type="checkbox" onChange={() => setBold(c => !c)} checked={bold} /><br />
          </div>
        </div>
      </div>
      <h1>
        <span>{title}</span>
        <span
          className="noprint float-right text-small hand"
          onClick={print}
        >print</span>
      </h1>
      <table>
        <thead>
          <tr>
            <th></th>
            {carl && <th>Carl</th>}
            {mike && <th>Mike</th>}
            {bass && <th>Bass</th>}
            {key && <th>Key</th>}
          </tr>
        </thead>
        <tbody className="zebra">
          {setlist.map((s, idx) => SongRow(songsMap[s], idx))}
        </tbody>
      </table>
    </div>
  )
}

export default PrintPage;
