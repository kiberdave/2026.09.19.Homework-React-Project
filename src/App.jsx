import { useEffect, useState } from "react"
import Layout from './components/Layout'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import SortSelect from './components/SortSelect'
import BookmarkList from './components/BookmarkList'
import Modal from './components/Modal'
import BookmarkForm from './components/BookmarkForm'
import EmptyState from './components/EmptyState'
import Loader from './components/Loader'

import './App.css'

const EMPTY_FORM = { title: '', url: '', description: '', tags: '' }

function parseTags(text) {
  return text
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '')
}

function validateForm(values) {
  const errors = {}
  const url = values.url.trim()

  if (values.title.trim() === '') {
    errors.title = 'Title is required'
  }

  if (url === '') {
    errors.url = 'URL is required'
  } else if (!(url.startsWith('http://') || url.startsWith('https://')) || !url.includes('.')) {
    errors.url = 'Please enter a valid URL'
  }

  if (parseTags(values.tags).length === 0) {
    errors.tags = 'Add at least one tag'
  }

  return errors
}

function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks')

    if (saved) {
      setTimeout(() => {
        setBookmarks(JSON.parse(saved))
        setIsLoading(false)
      }, 1000)
    } else {
      fetch('/data/bookmarks.json')
        .then((response) => response.json())
        .then((data) => {
          setTimeout(() => {
            setBookmarks(data)
            setIsLoading(false)
          }, 1000)
        })
    }
  }, [])

  useEffect(() => {
    if (isLoading) return
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks, isLoading])

  const [view, setView] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState(null)
  const [formValues, setFormValues] = useState(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState({})

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])
  // --------------------------------------------------------------------------

  // Derived data. Computed right here during render, NOT stored in state —
  // otherwise we would have to keep it in sync with bookmarks by hand.
  const tagCounts = {}
  bookmarks.forEach((bookmark) => {
    bookmark.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  const tags = Object.keys(tagCounts)
    .sort()
    .map((name) => ({ name, count: tagCounts[name] }))

  const visibleBookmarks = bookmarks
    .filter((bookmark) => (view === 'archived' ? bookmark.isArchived : !bookmark.isArchived))
    .filter((bookmark) => selectedTag === 'all' || bookmark.tags.includes(selectedTag))
    .filter((bookmark) => {
      const query = searchTerm.trim().toLowerCase()
      return (
        bookmark.title.toLowerCase().includes(query) ||
        bookmark.description.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      if (a.isPinned !== b.isPinned) return b.isPinned - a.isPinned
      if (sortBy === 'oldest') return a.id - b.id
      if (sortBy === 'az') return a.title.localeCompare(b.title)
      if (sortBy === 'za') return b.title.localeCompare(a.title)
      return b.id - a.id
    })

  function handleViewChange(nextView) {
    setView(nextView)
  }

  function handleSearchChange(value) {
    setSearchTerm(value)
  }

  function handleSelectTag(tag) {
    setSelectedTag(tag)
  }

  function handleSortChange(value) {
    setSortBy(value)
  }

  function handleThemeToggle() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  function handleAddClick() {
    setEditingBookmark(null)
    setFormValues(EMPTY_FORM)
    setFormErrors({})
    setIsModalOpen(true)
  }

  function handleEdit(bookmark) {
    setEditingBookmark(bookmark)
    setFormValues({
      title: bookmark.title,
      url: bookmark.url,
      description: bookmark.description,
      tags: bookmark.tags.join(', '),
    })
    setFormErrors({})
    setIsModalOpen(true)
  }

  function handleDelete(id) {
    if (!window.confirm(`Delete bookmark?`)) return
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
  }

  function handleTogglePin(id) {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, isPinned: !bookmark.isPinned } : bookmark
      )
    )
  }

  function handleToggleArchive(id) {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, isArchived: !bookmark.isArchived } : bookmark
      )
    )
  }

  function handleFormChange(field, value) {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    const errors = validateForm(formValues)
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    const fields = {
      title: formValues.title.trim(),
      url: formValues.url.trim(),
      description: formValues.description.trim(),
      tags: parseTags(formValues.tags),
    }

    if (editingBookmark) {
      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.id === editingBookmark.id ? { ...bookmark, ...fields } : bookmark
        )
      )
    } else {
      const newBookmark = { id: Date.now(), ...fields, isPinned: false, isArchived: false }
      setBookmarks((prev) => [newBookmark, ...prev])
    }

    setIsModalOpen(false)
  }

  function handleModalClose() {
    setIsModalOpen(false)
  }

  // --------------------------------------------------------------------------

  let emptyTitle = 'Nothing here yet'
  let emptyMessage = 'Add your first bookmark and it will show up here.'

  if (searchTerm.trim() !== '' || selectedTag !== 'all') {
    emptyTitle = 'Nothing found'
    emptyMessage = 'Try changing your search.'
  } else if (view === 'archived') {
    emptyTitle = 'Archive is empty'
    emptyMessage = 'Bookmarks you archive will appear here.'
  }

  return (
    <div className="app" data-theme={theme}>
      <Layout>
        <Sidebar view={view} onViewChange={handleViewChange}>
          <FilterBar
            tags={tags}
            selectedTag={selectedTag}
            onSelectTag={handleSelectTag}
          />
        </Sidebar>

        <div className="main">
          <Header
            onAddClick={handleAddClick}
            theme={theme}
            onThemeToggle={handleThemeToggle}
          >
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
          </Header>

          <div className="main__toolbar">
            <h2 className="main__heading">
              {view === 'archived' ? 'Archived' : 'All bookmarks'}
            </h2>
            <SortSelect value={sortBy} onChange={handleSortChange} />
          </div>

          {/* Three screen states: loading -> empty -> list */}
          {isLoading ? (
            <Loader />
          ) : visibleBookmarks.length === 0 ? (
            <EmptyState
              icon="✧"
              title={emptyTitle}
              message={emptyMessage}
            />
          ) : (
            <BookmarkList
              bookmarks={visibleBookmarks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePin={handleTogglePin}
              onToggleArchive={handleToggleArchive}
            />
          )}
        </div>
      </Layout>

      {/* Modal is a reusable wrapper. The form goes inside via children. */}
      <Modal
        isOpen={isModalOpen}
        title={editingBookmark ? 'Edit bookmark' : 'Add a bookmark'}
        onClose={handleModalClose}
      >
        <BookmarkForm
          values={formValues}
          errors={formErrors}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
          submitLabel={editingBookmark ? 'Save changes' : 'Add bookmark'}
        />
      </Modal>
    </div>
  )
}

export default App
