import BookmarkCard from './BookmarkCard'

// BookmarkList — сетка карточек.
// key = bookmark.id, а не индекс массива: id у закладки уникальный и стабильный.
function BookmarkList({ bookmarks, onEdit, onDelete, onTogglePin, onToggleArchive }) {
  return (
    <div className="cardgrid">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </div>
  )
}

export default BookmarkList
