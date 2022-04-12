import {useState, useEffect} from 'react';
import api from '../../api';
import {onValue, off} from 'firebase/database';
import { useParams } from "react-router-dom";


import './print.css';

const print = () => window.print();

const PrintPage = () => {
  const [nate, setNate] = useState(false);
  const [mike, setMike] = useState(false);
  const [adam, setAdam] = useState(false);
  const [carl, setCarl] = useState(false);
  const [bass, setBass] = useState(false);
  const [key, setKey] = useState(true);
  const [bpm, setBpm] = useState(false);
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
        {nate && <td>{s.nate}</td>}
        {adam && <td>{s.adam}</td>}
        {carl && <td>{s.carl}</td>}
        {mike && <td>{s.mike}</td>}
        {bass && <td>{swapKeyValue(s).Bass || ''}</td>}
        {key && <td>{s.key}</td>}
        {bpm && <td>{s.bpm}</td>}
      </tr>
    )
  };

  return  (
    <div className="print-records-page">
      <div className="noprint print_controls">
        <h5>Display Columns</h5>
        <div className="grid">
          <div className="grid-col-single">
            <label htmlFor="cb_Nate">Nate</label>
            <input id="cb_Nate" type="checkbox" onChange={() => setNate(c => !c)} checked={nate}/><br />
            <label htmlFor="cb_Adam">Adam</label>
            <input id="cb_Adam" type="checkbox" onChange={() => setAdam(c => !c)} checked={adam}/><br />
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
            <label htmlFor="cb_Bpm">BPM</label>
            <input id="cb_Bpm" type="checkbox" onChange={() => setBpm(c => !c)} checked={bpm}/><br />
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
            {nate && <th>Nate</th>}
            {adam && <th>Adam</th>}
            {carl && <th>Carl</th>}
            {mike && <th>Mike</th>}
            {bass && <th>Bass</th>}
            {key && <th>Key</th>}
            {bpm && <th>BPM</th>}
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
