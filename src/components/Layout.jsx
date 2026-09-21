// Layout — только раскладка страницы: слева сайдбар, справа всё остальное.
// Ничего не знает ни про закладки, ни про поиск. Поэтому принимает children.
function Layout({ children }) {
  return <div className="layout">{children}</div>
}

export default Layout
