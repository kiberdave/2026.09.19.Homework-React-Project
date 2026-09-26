// BookmarkForm — controlled form.
// The form has NO state of its own: all values come in via props.values,
// and the form reports every change upward via onChange(field, value).
// The same component handles both adding and editing —
// the only difference is which values it receives.
function BookmarkForm({ values, errors, onChange, onSubmit, onCancel, submitLabel }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__field">
        <label className="form__label" htmlFor="title">
          Title <span className="form__req">*</span>
        </label>
        <input
          id="title"
          type="text"
          className={errors.title ? 'form__input form__input--error' : 'form__input'}
          value={values.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="React Documentation"
        />
        {errors.title && <p className="form__error">{errors.title}</p>}
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="url">
          URL <span className="form__req">*</span>
        </label>
        <input
          id="url"
          type="text"
          className={errors.url ? 'form__input form__input--error' : 'form__input'}
          value={values.url}
          onChange={(e) => onChange('url', e.target.value)}
          placeholder="https://react.dev"
        />
        {errors.url && <p className="form__error">{errors.url}</p>}
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows="3"
          className="form__input form__input--area"
          value={values.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Short description (optional)"
        />
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="tags">
          Tags <span className="form__req">*</span>
        </label>
        <input
          id="tags"
          type="text"
          className={errors.tags ? 'form__input form__input--error' : 'form__input'}
          value={values.tags}
          onChange={(e) => onChange('tags', e.target.value)}
          placeholder="React, Frontend, Documentation"
        />
        <p className="form__hint">Comma-separated. At least one tag.</p>
        {errors.tags && <p className="form__error">{errors.tags}</p>}
      </div>

      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default BookmarkForm
