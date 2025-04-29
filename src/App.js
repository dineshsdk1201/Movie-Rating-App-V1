import "./index.css";
import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];
export default function App() {
  return (
    <div className="app">
      <Header />
      <Form />
      <PackagesList />
      <Statistics />
    </div>
  );
}
function Header() {
  return (
    <>
      <div>
        <h1>🌴 Far Away 💼</h1>
      </div>
    </>
  );
}
function Form() {
  const [item, setItem] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return null;
    console.log("handlesubmit called");
    const newItem = { description, quantity, packed: false };

    setDescription("");
    setQuantity(1);
    console.log(newItem);
  }
  return (
    <>
      <div className="add-form">
        <p>What are the things you need?</p>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((s) => (
            <option>{s}</option>
          ))}
        </select>
        <div>
          <input
            type="text"
            placeholder="Item...."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </>
  );
}
function PackagesList() {
  return (
    <ul className="list">
      {initialItems.map((item) => (
        <Item
          description={item.description}
          quantity={item.quantity}
          packed={item.packed}
        />
      ))}
    </ul>
  );
}
function Item({ description, quantity, packed }) {
  return (
    <li className="li">
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity}
        {description}
      </span>

      <button>❌</button>
    </li>
  );
}
function Statistics() {
  return (
    <>
      <div className="stats">
        <p>You have X items in the cart and X(X%) already packed</p>
      </div>
    </>
  );
}
