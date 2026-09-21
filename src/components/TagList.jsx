// TagList — чипы тегов на карточке. Ничего не умеет, только показывает.
// key — сам тег, потому что теги внутри одной закладки уникальны.
function TagList({ tags }) {
  return (
    <ul className="taglist">
      {tags.map((tag) => (
        <li key={tag} className="taglist__chip">
          {tag}
        </li>
      ))}
    </ul>
  )
}

export default TagList
