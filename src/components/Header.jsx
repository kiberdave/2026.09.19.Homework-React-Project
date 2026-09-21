// Header — верхняя панель: место под поиск, кнопка добавления, переключатель темы.
// children — сюда App кладёт <SearchBar />. Header не знает, что такое поиск,
// он просто выделяет для него место.
function Header({ children, onAddClick, theme, onThemeToggle }) {
  return (
    <header className="header">
      <div className="header__search">{children}</div>

      <div className="header__actions">
        <button
          type="button"
          className="btn btn--ghost btn--icon"
          onClick={onThemeToggle}
          aria-label="Переключить тему"
          title="Переключить тему"
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
