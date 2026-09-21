// EmptyState — переиспользуемая заглушка.
// Один компонент на три случая: пустой список, пустой поиск, пустой архив.
// Разница только в тексте, который приходит через props.
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
