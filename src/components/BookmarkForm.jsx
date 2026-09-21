// BookmarkForm — controlled form.
// Своего state у формы НЕТ: все значения приходят через props.values,
// а о каждом изменении форма сообщает наверх через onChange(поле, значение).
// Один и тот же компонент обслуживает и добавление, и редактирование —
// разница только в том, какие values ему передали.
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
          placeholder="Короткое описание — необязательно"
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
        <p className="form__hint">Через запятую. Минимум один тег.</p>
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
