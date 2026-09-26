// Sidebar — the logo and navigation between views (All / Archived).
// children — App puts <FilterBar /> with the tag list here.
// Sidebar itself knows nothing about tags.
function Sidebar({ view, onViewChange, children }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">B</span>
        <span className="sidebar__title">Bookmark Manager</span>
      </div>

      <nav className="sidebar__nav">
        <button
          type="button"
          className={view === 'all' ? 'navitem navitem--active' : 'navitem'}
          onClick={() => onViewChange('all')}
        >
          <span className="navitem__icon">⌂</span>
          Home
        </button>

        <button
          type="button"
          className={view === 'archived' ? 'navitem navitem--active' : 'navitem'}
          onClick={() => onViewChange('archived')}
        >
          <span className="navitem__icon">▤</span>
          Archived
        </button>
      </nav>

      {children}
    </aside>
  )
}

export default Sidebar
