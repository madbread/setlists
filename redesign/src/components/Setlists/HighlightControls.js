import React from 'react';
import PropTypes from 'prop-types';

const HighlightControls = ({inLegend, highlight, showMike, showCarl, setShowMike, setShowCarl, setHighlight}) => (
  <>
    <div className="highlight-controls">
      <select id="highlight" value={highlight} onChange={e => setHighlight(e.target.value)}>
        <option value="">None</option>
        <option value="mike">Mike</option>
        <option value="carl">Carl</option>
        <option value="singer">Singer</option>
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
          {inLegend.has('Mike') && <span className="color_Mike">Mike</span>}
          {inLegend.has('Carl') && <span className="color_Carl">Carl</span>}
        </div>
      }
      <div className="input-group">
        <label htmlFor="cb_mike">Mike</label>
        <div className="cb_input">
          <input id="cb_mike" type="checkbox" checked={showMike} onChange={e => setShowMike(e.target.checked)}/>
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="cb_carl">Carl</label>
        <div className="cb_input">
          <input id="cb_carl" type="checkbox" checked={showCarl} onChange={e => setShowCarl(e.target.checked)}/>
        </div>
      </div>  
    </div>
  </>
);

HighlightControls.propTypes = {
  inLegend: PropTypes.object,
  highlight: PropTypes.string,
  showMike: PropTypes.bool,
  showCarl: PropTypes.bool,
  setShowMike: PropTypes.func,
  setShowCarl: PropTypes.func,
  setHighlight: PropTypes.func,
};

export default HighlightControls;
