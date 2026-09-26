import TagList from './TagList'

// Extract the domain from the URL: https://react.dev/learn -> react.dev
// Wrapped in try/catch because new URL() throws on an invalid string.
function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

// BookmarkCard — a single bookmark.
// bookmark comes in whole, and the card reports actions upward
// via callback props. It doesn't change anything itself.
function BookmarkCard({ bookmark, onEdit, onDelete, onTogglePin, onToggleArchive }) {
  const { title, url, description, tags, isPinned, isArchived } = bookmark

  return (
    <article className={isPinned ? 'card card--pinned' : 'card'}>
      <div className="card__head">
        <span className="card__avatar">{title.charAt(0).toUpperCase()}</span>

        <div className="card__titles">
          <h3 className="card__title">{title}</h3>
          <a
            className="card__domain"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            {getDomain(url)}
          </a>
        </div>

        {isPinned && (
          <span className="card__pinmark" title="Pinned">
            ★
          </span>
        )}
      </div>

      <p className="card__desc">{description}</p>

      <TagList tags={tags} />

      <div className="card__actions">
        <button
          type="button"
          className="iconbtn"
          onClick={() => onTogglePin(bookmark.id)}
          title={isPinned ? 'Unpin' : 'Pin'}
        >
          {isPinned ? '★' : '☆'}
        </button>

        <button
          type="button"
          className="iconbtn"
          onClick={() => onEdit(bookmark)}
          title="Edit"
        >
          ✎
        </button>

        <button
          type="button"
          className="iconbtn"
          onClick={() => onToggleArchive(bookmark.id)}
          title={isArchived ? 'Restore' : 'Archive'}
        >
          {isArchived ? '↩' : '▤'}
        </button>

        <button
          type="button"
          className="iconbtn iconbtn--danger"
          onClick={() => onDelete(bookmark.id)}
          title="Delete"
        >
          ✕
        </button>
      </div>
    </article>
  )
}

export default BookmarkCard
