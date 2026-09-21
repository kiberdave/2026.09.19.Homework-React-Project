// SearchBar — controlled input. Своего state у него нет:
// значение приходит сверху через value, а об изменении он сообщает через onChange.
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
