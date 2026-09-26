// TagList — tag chips on a card. It does nothing but display them.
// key is the tag itself, because tags within one bookmark are unique.
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
