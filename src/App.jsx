// ============================================================================
// App.jsx — КАРКАС. Здесь пока нет ни одного useState и ни одного useEffect.
//
// Вся логика — твоя работа. Сейчас вместо state стоят обычные const,
// чтобы можно было посмотреть вёрстку. Каждый такой const помечен TODO
// и по ходу недели превращается в настоящий state.
//
// Роль App: держать state, держать обработчики и собирать компоненты.
// Разметка живёт в компонентах, сюда её не тащим.
// ============================================================================

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
  // --- ВРЕМЕННЫЕ ЗАГЛУШКИ ---------------------------------------------------
  // TODO вт: bookmarks и isLoading -> useState + useEffect с fetch
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

  // TODO чт: view, searchTerm, selectedTag, sortBy -> useState
  const [view, setView] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const selectedTag = 'all'
  const sortBy = 'newest'

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState(null)
  const [formValues, setFormValues] = useState(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState({})

  // TODO пт: theme -> useState + useEffect с localStorage
  const theme = 'light'
  // --------------------------------------------------------------------------

  // Производные данные. Считаем прямо здесь, при рендере, в state НЕ храним —
  // иначе пришлось бы руками держать их в синхроне с bookmarks.
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
    .filter((bookmark) => {
    const query = searchTerm.trim().toLowerCase()
    return (
      bookmark.title.toLowerCase().includes(query) ||
      bookmark.description.toLowerCase().includes(query)
    )
    })
    .sort((a, b) => b.isPinned - a.isPinned)

  // --- ОБРАБОТЧИКИ (пока пустые) -------------------------------------------
  function handleViewChange(nextView) {
  setView(nextView)
}

  function handleSearchChange(value) {
  setSearchTerm(value)
}

  function handleSelectTag(tag) {
    // TODO чт
    console.log('tag ->', tag)
  }

  function handleSortChange(value) {
    // TODO чт
    console.log('sort ->', value)
  }

  function handleThemeToggle() {
    // TODO пт
    console.log('theme toggle')
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
    if (!window.confirm(`Delete bookmark?`))return
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
    setFormValues((prev) => ({...prev, [field]: value}))
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

  let emptyTitle = 'Пока ничего нет'
  let emptyMessage = 'Добавь первую закладку — она появится здесь.'

  if (searchTerm.trim() !== '') {
    emptyTitle = 'Ничего не найдено'
    emptyMessage = 'Попробуй изменить запрос.'
  } else if (view === 'archived') {
    emptyTitle = 'Архив пуст'
    emptyMessage = 'Сюда попадут закладки, которые ты отправишь в архив.'
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

          {/* Три состояния экрана: загрузка -> пусто -> список */}
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

      {/* Modal — reusable обёртка. Внутрь через children кладём форму. */}
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
