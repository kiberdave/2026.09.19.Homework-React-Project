// Loader — показывается, пока идёт первая загрузка данных.
function Loader({ label = 'Loading bookmarks...' }) {
  return (
    <div className="loader">
      <div className="loader__spinner" />
      <p className="loader__label">{label}</p>
    </div>
  )
}

export default Loader
