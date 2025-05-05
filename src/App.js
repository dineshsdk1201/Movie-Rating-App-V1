import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [isAdd, setIsAdd] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState(initialFriends);

  function handleAdd() {
    setIsAdd(!isAdd);
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setIsAdd(false);
  }

  function handleSelect(id, friend) {
    setSelectedFriend((s) => (s?.id === id ? null : friend));
    setIsAdd(false);
  }
  function handleSplitBill(value) {
    console.log(value);

    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? {
              ...friend,
              balance: friend.balance + value,
            }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          handleSelect={handleSelect}
          friends={friends}
          selectedFriend={selectedFriend}
        />

        {isAdd && <FormAddFriend handleAddFriend={handleAddFriend} />}

        <Button onClick={handleAdd}>{isAdd ? "Close" : "Add Friend"}</Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
          friends={friends}
          setFriends={setFriends}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ handleSelect, friends, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          handleSelect={handleSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => handleSelect(friend.id, friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !imageUrl) return;
    const id = crypto.randomUUID();
    const image = `${imageUrl}?id=${id}`;
    const newFriend = {
      id,
      name,
      image,
      balance: 0,
    };
    setName("");
    setImageUrl("https://i.pravatar.cc/48");
    handleAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({
  selectedFriend,
  setSelectedFriend,
  friends,
  setFriends,
  onSplitBill,
}) {
  const [bill, setBill] = useState("");
  const [myBill, setMyBill] = useState("");
  const paidByFriend = bill && myBill ? bill - myBill : 0;
  const [paysBy, setPaysBy] = useState("user");

  function handleSplitBill(e) {
    e.preventDefault();
    onSplitBill(paysBy === "user" ? paidByFriend : -myBill);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={myBill}
        onChange={(e) => setMyBill(Number(e.target.value))}
      />

      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select value={paysBy} onChange={(e) => setPaysBy(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
