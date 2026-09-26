// EmptyState — a reusable placeholder.
// One component for three cases: empty list, empty search, empty archive.
// The only difference is the text passed in via props.
function EmptyState({ icon, title, message }) {
  return (
    <div className="empty">
      <div className="empty__icon">{icon}</div>
      <h3 className="empty__title">{title}</h3>
      <p className="empty__message">{message}</p>
    </div>
  )
}

export default EmptyState
