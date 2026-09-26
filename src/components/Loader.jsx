// Loader — shown while the initial data load is in progress.
function Loader({ label = 'Loading bookmarks...' }) {
  return (
    <div className="loader">
      <div className="loader__spinner" />
      <p className="loader__label">{label}</p>
    </div>
  )
}

export default Loader
