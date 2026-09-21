// FilterBar — список тегов с количеством закладок у каждого.
// tags: массив объектов вида { name: 'React', count: 4 }
// selectedTag: 'all' или имя тега
function FilterBar({ tags, selectedTag, onSelectTag }) {
  return (
    <div className="filterbar">
      <h3 className="filterbar__title">Tags</h3>

      <ul className="filterbar__list">
        <li>
          <button
            type="button"
            className={selectedTag === 'all' ? 'tagitem tagitem--active' : 'tagitem'}
            onClick={() => onSelectTag('all')}
          >
            <span className="tagitem__name">All</span>
          </button>
        </li>

        {tags.map((tag) => (
          <li key={tag.name}>
            <button
              type="button"
              className={selectedTag === tag.name ? 'tagitem tagitem--active' : 'tagitem'}
              onClick={() => onSelectTag(tag.name)}
            >
              <span className="tagitem__name">{tag.name}</span>
              <span className="tagitem__count">{tag.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterBar
