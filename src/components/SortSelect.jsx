// SortSelect — a plain controlled <select>.
function SortSelect({ value, onChange }) {
  return (
    <label className="sortselect">
      <span className="sortselect__label">Sort by</span>
      <select
        className="sortselect__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="az">A–Z</option>
        <option value="za">Z–A</option>
      </select>
    </label>
  )
}

export default SortSelect
