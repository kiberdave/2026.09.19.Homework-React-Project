// Layout — page layout only: sidebar on the left, everything else on the right.
// It knows nothing about bookmarks or search. That's why it takes children.
function Layout({ children }) {
  return <div className="layout">{children}</div>
}

export default Layout
