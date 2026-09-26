// Header — the top bar: a slot for search, the add button, the theme toggle.
// children — App puts <SearchBar /> here. Header doesn't know what search is,
// it just reserves a place for it.
function Header({ children, onAddClick, theme, onThemeToggle }) {
  return (
    <header className="header">
      <div className="header__search">{children}</div>

      <div className="header__actions">
        <button
          type="button"
          className="btn btn--ghost btn--icon"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>

        <button type="button" className="btn btn--primary" onClick={onAddClick}>
          <span className="btn__plus">+</span>
          Add Bookmark
        </button>
      </div>
    </header>
  )
}

export default Header
