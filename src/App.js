import "./index.css";
import { useState } from "react";
import Header from "./MYComponents/Header";
import Statistics from "./MYComponents/Statistics";
import PackagesList from "./MYComponents/PackageList";
import Form from "./MYComponents/Form";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];
export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleUpdate(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function ClearList() {
    const confirmed = window.confirm("Are you sure want to clear the list?");
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Header />
      <Form handleAddItems={handleAddItems} />
      <PackagesList
        items={items}
        setItems={setItems}
        handleUpdate={handleUpdate}
        onClearList={ClearList}
      />
      <Statistics items={items} />
    </div>
  );
}
