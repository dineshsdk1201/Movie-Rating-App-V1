import { useState } from "react";
import "./index.css";

export default function App() {
  const [myTip, setMyTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);
  const [bill, setBill] = useState(0);

  return (
    <>
      <Bill bill={bill} setBill={setBill} />
      <MyTip myTip={myTip} setMyTip={setMyTip} />
      <FriendTip friendTip={friendTip} setFriendTip={setFriendTip} />
      <TotalBill bill={bill} myTip={myTip} friendTip={friendTip} />
    </>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <p style={{ display: "inline" }}>How Much The Bill</p>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />
    </div>
  );
}
function MyTip({ myTip, setMyTip }) {
  return (
    <div>
      <p style={{ display: "inline" }}>How You Likely to give he tip</p>
      <select value={myTip} onCanPlay={(e) => setMyTip(e.target.value)}>
        <option value={10}>10%</option>
        <option value={20}>20%</option>
        <option value={30}>30%</option>
      </select>
    </div>
  );
}

function FriendTip({ friendTip, setFriendTip }) {
  return (
    <div>
      <p style={{ display: "inline" }}>How Your friend Like to share tip</p>
      <select value={friendTip} onCanPlay={(e) => setFriendTip(e.target.value)}>
        <option value={10}>10%</option>
        <option value={20}>20%</option>
        <option value={30}>30%</option>
      </select>
    </div>
  );
}

function TotalBill({ friendTip, myTip, bill }) {
  const totalTip = ((myTip + friendTip) / bill) * 100;
  console.log(totalTip);
  return (
    <>
      <p>The actual Bill is {bill} </p>
      <p>The total Bill is {totalTip + bill} </p>
    </>
  );
}
