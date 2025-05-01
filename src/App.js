import "./index.css";
import { useState } from "react";
const faqs = [
  {
    id: 1,
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    id: 2,
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    id: 3,
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];
export default function App() {
  return (
    <>
      <Accordian />
    </>
  );
}

function Accordian({ faq }) {
  return (
    <div className="accordion">
      {faqs.map((item, num) => (
        <AccordianItem
          title={item.title}
          text={item.text}
          num={num}
          key={num}
        />
      ))}
    </div>
  );
}

function AccordianItem({ text, title, num }) {
  const [open, setOpen] = useState(false);
  function handleClick() {
    setOpen((cur) => !cur);
  }
  return (
    <>
      <div className={`item ${open ? "open" : ""}`} onClick={handleClick}>
        <h2 className="number">{num < 9 ? `0${num + 1}` : num + 1}</h2>
        <div className="content-box">
          <h3 className="title">{title}</h3>
          {open && <p>{text}</p>}
        </div>
        <button className="icon">{open ? "-" : "+"}</button>
      </div>
    </>
  );
}
