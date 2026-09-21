// Modal — переиспользуемая обёртка. Не знает, что внутри:
// в неё можно положить форму, подтверждение удаления, что угодно.
// Это и есть composition через props.children.
function Modal({ isOpen, title, onClose, children }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal__overlay" onClick={onClose}>
      {/* stopPropagation, чтобы клик внутри окна не закрывал его */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h2 className="modal__title">{title}</h2>
          <button
            type="button"
            className="iconbtn"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
