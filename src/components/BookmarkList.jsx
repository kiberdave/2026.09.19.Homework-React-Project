import BookmarkCard from './BookmarkCard'

// BookmarkList — a grid of cards.
// key = bookmark.id, not the array index: a bookmark's id is unique and stable.
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
