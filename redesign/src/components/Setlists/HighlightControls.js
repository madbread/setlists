import React from 'react';
import PropTypes from 'prop-types';

const HighlightControls = ({inLegend, highlight, showNate, showMike, showAdam, showCarl, setShowNate, setShowMike, setShowAdam, setShowCarl, setHighlight}) => (
  <>
    <div className="highlight-controls">
      <label className="row" htmlFor="highlight">Show</label>
      <label htmlFor="cb_nate">Nate</label>
      <input id="cb_nate" type="checkbox" checked={showNate} onChange={e => setShowNate(e.target.checked)}/>
      <label htmlFor="cb_mike">Mike</label>
      <input id="cb_mike" type="checkbox" checked={showMike} onChange={e => setShowMike(e.target.checked)}/>
      <label htmlFor="cb_adam">Adam</label>
      <input id="cb_adam" type="checkbox" checked={showAdam} onChange={e => setShowAdam(e.target.checked)}/>
      <label htmlFor="cb_carl">Carl</label>
      <input id="cb_carl" type="checkbox" checked={showCarl} onChange={e => setShowCarl(e.target.checked)}/>
    </div>
    <div className="highlight-controls">
      <label className="row" htmlFor="highlight">Highlight</label>
      <select id="highlight" value={highlight} onChange={e => setHighlight(e.target.value)}>
        <option value="">None</option>
        <option value="nate">Nate</option>
        <option value="mike">Mike</option>
        <option value="adam">Adam</option>
        <option value="carl">Carl</option>
      </select>
      {highlight !== '' &&
        <div className="highlight-legend">
          {inLegend.has('Mandolin') && <span className="color_Mandolin">Mandolin</span>}
          {inLegend.has('Bass') && <span className="color_Bass">Bass</span>}
          {inLegend.has('Fiddle') && <span className="color_Fiddle">Fiddle</span>}
          {inLegend.has('Guitar') && <span className="color_Guitar">Guitar</span>}
          {inLegend.has('Electric') && <span className="color_Electric">Electric</span>}
          {inLegend.has('Banjo') && <span className="color_Banjo">Banjo</span>}
          {inLegend.has('Harmonica') && <span className="color_Harmonica">Harmonica</span>}
        </div>
      }
    </div>
  </>
);

HighlightControls.propTypes = {
  inLegend: PropTypes.object,
  highlight: PropTypes.string,
  showNate: PropTypes.bool,
  showMike: PropTypes.bool,
  showAdam: PropTypes.bool,
  showCarl: PropTypes.bool,
  setShowNate: PropTypes.func,
  setShowMike: PropTypes.func,
  setShowAdam: PropTypes.func,
  setShowCarl: PropTypes.func,
  setHighlight: PropTypes.func,
};

export default HighlightControls;
