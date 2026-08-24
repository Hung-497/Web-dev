function Sidebar(props) {
  return (
    <aside className="sidebar">
      <h2>React Topics</h2>

      <ul>
        {props.topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;