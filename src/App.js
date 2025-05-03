import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [myTip, setMytip] = useState(10);
  const [ftip, setFtip] = useState(10);
  function handleReset() {
    setBill("");
    setMytip(10);
    setFtip(10);
  }
  return (
    <>
      <Bill bill={bill} setBill={setBill} />
      <MyTip myTip={myTip} setMytip={setMytip} />
      <FriendTip ftip={ftip} setFtip={setFtip} />
      <TotalBill ftip={ftip} bill={bill} myTip={myTip} />
      <Reset handleReset={handleReset} />
    </>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <h3 style={{ display: "inline" }}>How Much the bill is?</h3>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />
    </div>
  );
}
function MyTip({ myTip, setMytip }) {
  return (
    <div>
      <h3 style={{ display: "inline" }}>How You are satisfied</h3>
      <select value={myTip} onChange={(e) => setMytip(e.target.value)}>
        <option value={10}>10%</option>
        <option value={20}>20%</option>
        <option value={30}>30%</option>
      </select>
    </div>
  );
}

function FriendTip({ ftip, setFtip }) {
  return (
    <div>
      <h3 style={{ display: "inline" }}>How Your Friend satisfied</h3>
      <select value={ftip} onChange={(e) => setFtip(e.target.value)}>
        <option value={10}>10%</option>
        <option value={20}>20%</option>
        <option value={30}>30%</option>
      </select>
    </div>
  );
}

function TotalBill({ ftip, myTip, bill }) {
  // console.log(myTip, ftip);
  console.log(typeof myTip, typeof ftip, typeof bill);
  const totalTipPercentage = (ftip + myTip) / 2;
  // console.log(totalTipPercentage);
  const totalTip = (totalTipPercentage / 100) * Number(bill);
  // console.log(totalTip);
  const totalBill = totalTip + Number(bill);

  return (
    <>
      {bill && (
        <div>
          <h3>The total tip is {totalTip}</h3>
          <h3>Your Total Bill is {totalBill}</h3>
        </div>
      )}
    </>
  );
}
function Reset({ handleReset }) {
  return (
    <>
      <button onClick={handleReset}>reset</button>
    </>
  );
}
