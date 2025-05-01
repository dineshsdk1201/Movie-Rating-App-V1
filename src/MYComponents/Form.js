import { useState } from "react";
export default function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return null;
    // console.log("handlesubmit called");
    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
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
            <option value={s} key={s}>
              {s}
            </option>
          ))}
        </select>
        <div>
          <input
            type="text"
            placeholder="Item...."
            value={description}
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
