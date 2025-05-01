import { useState } from "react";
import Item from "./Item";
export default function PackagesList({
  items,
  setItems,
  handleUpdate,
  onClearList,
}) {
  const [sb, setSb] = useState("input");
  let sorted = [];
  if (sb === "input") {
    sorted = items;
  }
  if (sb === "description") {
    sorted = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  // if (sb === "packed") {
  //   sorted = items.slice().sort((a, b) => b.packed - a.packed);
  // }
  if (sb === "quantity") {
    sorted = items
      .slice()
      .sort((a, b) => Number(b.quantity) - Number(a.quantity));
  }

  return (
    <div style={{ backgroundColor: "#5a3e2b" }}>
      <ul className="list">
        {sorted.map((item) => (
          <Item
            description={item.description}
            quantity={item.quantity}
            packed={item.packed}
            key={item.description}
            id={item.id}
            setItems={setItems}
            handleUpdate={handleUpdate}
          />
        ))}
      </ul>
      <div className="sort list">
        <select value={sb} onChange={(e) => setSb(e.target.value)}>
          <option value="input">Sort By Input</option>
          <option value="description">Sort By description</option>
          <option value="packed">Sort By Packed</option>
          <option value="quantity">Sort By Quantity</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
