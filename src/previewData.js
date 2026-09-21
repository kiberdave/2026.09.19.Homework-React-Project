// ВРЕМЕННЫЙ ФАЙЛ — только чтобы увидеть вёрстку до того, как появится загрузка данных.
// Во вторник заменяем его на fetch("/data/bookmarks.json") внутри useEffect
// и УДАЛЯЕМ этот файл. В сданном проекте его быть не должно.

export const PREVIEW_BOOKMARKS = [
  {
    id: 1,
    title: 'React Documentation',
    url: 'https://react.dev',
    description:
      'Official React documentation with guides, API references, and examples for building user interfaces.',
    tags: ['React', 'Frontend', 'Documentation'],
    isPinned: true,
    isArchived: false,
  },
  {
    id: 2,
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description:
      'The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs.',
    tags: ['Reference', 'HTML', 'CSS'],
    isPinned: false,
    isArchived: false,
  },
  {
    id: 3,
    title: 'Frontend Mentor',
    url: 'https://frontendmentor.io',
    description:
      'Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges.',
    tags: ['Practice', 'Learning', 'Community'],
    isPinned: false,
    isArchived: false,
  },
]
