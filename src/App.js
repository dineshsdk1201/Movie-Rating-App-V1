import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];
const Key = "674126bf";
export default function App() {
  return (
    <div className="tabbed">
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);
  console.log(activeTab);
  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>
      {activeTab <= 2 ? (
        <TabbedContent
          item={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentComponent />
      )}
    </div>
  );
}
function Tab({ num, onClick, activeTab }) {
  return (
    <div>
      <button
        className={activeTab === num ? "tab active" : "tab"}
        onClick={() => onClick(num)}
      >{`Tab ${num + 1}`}</button>
    </div>
  );
}
function TabbedContent({ item }) {
  console.log("Render");
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);
  function handleInc() {
    setLikes((likes) => likes + 1);
  }
  function handleTripleInc() {
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
  }
  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
  }
  return (
    <div className="all">
      {showDetails && (
        <div className="content">
          <h4>{item.summary}</h4>
          <p>{item.details}</p>
        </div>
      )}
      <div className="all-actions">
        <div className="tab-actions">
          <button onClick={() => setShowDetails((s) => !s)}>
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          <button onClick={handleUndo}>undo</button>
        </div>
        {showDetails && (
          <div className="likes">
            <span style={{ fontSize: "20px" }}>💗{likes}</span>
            <button onClick={handleInc}>+</button>
            <button onClick={handleTripleInc}>+++</button>
          </div>
        )}
      </div>
    </div>
  );
}

function DifferentComponent() {
  return (
    <>
      <h4>I am a different component</h4>
    </>
  );
}
