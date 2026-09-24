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

import { PREVIEW_BOOKMARKS } from './previewData'
import './App.css'

const EMPTY_FORM = { title: '', url: '', description: '', tags: '' }

function App() {
  // --- ВРЕМЕННЫЕ ЗАГЛУШКИ ---------------------------------------------------
  // TODO вт: bookmarks и isLoading -> useState + useEffect с fetch
  const [bookmarks, setBookmarks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/data/bookmarks.json`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setBookmarks(data)
          setIsLoading(false)
        }, 1000)
        })
  }, [])

  // TODO чт: view, searchTerm, selectedTag, sortBy -> useState
  const view = 'all'
  const searchTerm = ''
  const selectedTag = 'all'
  const sortBy = 'newest'

  // TODO ср: isModalOpen, editingBookmark, formValues, formErrors -> useState
  const isModalOpen = false
  const editingBookmark = null
  const formValues = EMPTY_FORM
  const formErrors = {}

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

  // TODO чт: здесь будет фильтрация по view + searchTerm + selectedTag,
  // затем сортировка по sortBy, затем pinned наверх.
  const visibleBookmarks = bookmarks

  // --- ОБРАБОТЧИКИ (пока пустые) -------------------------------------------
  function handleViewChange(nextView) {
    // TODO чт
    console.log('view ->', nextView)
  }

  function handleSearchChange(value) {
    // TODO чт
    console.log('search ->', value)
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
    // TODO ср: открыть модалку с пустой формой
    console.log('add')
  }

  function handleEdit(bookmark) {
    // TODO ср: открыть модалку, заполнить форму значениями bookmark
    console.log('edit', bookmark.id)
  }

  function handleDelete(id) {
    // TODO ср: удалить закладку иммутабельно (filter)
    console.log('delete', id)
  }

  function handleTogglePin(id) {
    // TODO чт: перевернуть isPinned иммутабельно (map)
    console.log('pin', id)
  }

  function handleToggleArchive(id) {
    // TODO чт: перевернуть isArchived иммутабельно (map)
    console.log('archive', id)
  }

  function handleFormChange(field, value) {
    // TODO ср: обновить одно поле формы
    console.log('form', field, value)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    // TODO ср: валидация, затем добавление или обновление
    console.log('submit')
  }

  function handleModalClose() {
    // TODO ср
    console.log('close')
  }
  // --------------------------------------------------------------------------

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
              title="Пока ничего нет"
              message="Добавь первую закладку — она появится здесь."
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
