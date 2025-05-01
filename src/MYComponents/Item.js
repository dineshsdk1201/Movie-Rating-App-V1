export default function Item({
  description,
  quantity,
  packed,
  setItems,
  id,
  handleUpdate,
}) {
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <li className="li">
      <input type="checkbox" value={packed} onChange={() => handleUpdate(id)} />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity}
        {description}
      </span>

      <button onClick={() => handleDelete(id)}>❌</button>
    </li>
  );
}
