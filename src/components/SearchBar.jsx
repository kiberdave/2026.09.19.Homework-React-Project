// SearchBar — a controlled input. It has no state of its own:
// the value comes from above via value, and it reports changes via onChange.
function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar">
      <span className="searchbar__icon">⌕</span>
      <input
        type="text"
        className="searchbar__input"
        placeholder="Search by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
