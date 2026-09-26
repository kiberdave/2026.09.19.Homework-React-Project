// Modal — a reusable wrapper. It doesn't know what's inside:
// you can put a form, a delete confirmation, anything in it.
// This is composition via props.children.
function Modal({ isOpen, title, onClose, children }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal__overlay" onClick={onClose}>
      {/* stopPropagation so a click inside the window doesn't close it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h2 className="modal__title">{title}</h2>
          <button
            type="button"
            className="iconbtn"
            onClick={onClose}
            aria-label="Close"
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
