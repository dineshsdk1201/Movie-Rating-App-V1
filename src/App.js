import { useState } from "react";
import "./index.css";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  console.log(step);
  const msg = messages;
  return (
    <div>
      <Container
        msg={msg}
        step={step}
        setStep={setStep}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

function Container({ step, msg, setStep, isOpen, setIsOpen }) {
  console.log(step);
  return (
    <div>
      <button className="close" onClick={() => setIsOpen((s) => !s)}>
        ❌
      </button>
      {isOpen && (
        <Steps
          step={step}
          msg={msg}
          setStep={setStep}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}

function Steps({ step, msg, setStep, isOpen, setIsOpen }) {
  console.log(step);
  return (
    <div className="container">
      <div className="steps">
        <h1 className={`${step >= 1 ? "active" : ""}`}>1</h1>
        <h1 className={`${step >= 2 ? "active" : ""}`}>2</h1>
        <h1 className={`${step >= 3 ? "active" : ""}`}>3</h1>
      </div>
      <Text msg={msg} step={step} />
      <Button step={step} setStep={setStep} />
    </div>
  );
}

function Text({ msg, step }) {
  console.log(step);
  return (
    <div className="text">
      <h3>{msg[step - 1]}</h3>
    </div>
  );
}

function Button({ step, setStep }) {
  console.log(step);
  function handlePrev() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }
  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  }
  return (
    <div className="btns">
      <button className="btn" onClick={handlePrev}>
        Previous
      </button>
      <button className="btn" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
