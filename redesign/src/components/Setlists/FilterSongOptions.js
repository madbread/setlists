import PropTypes from 'prop-types';

const FilterSongOptions = ({filter, setFilter}) => (
  <div className="filter-container">
    <input id="filter_songs" placeholder="filter songs by title" type="text" value={filter} onChange={setFilter} />
  </div>
);

FilterSongOptions.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func
}

export default FilterSongOptions;