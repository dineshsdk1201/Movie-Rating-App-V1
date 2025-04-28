import "./App.css";
import { useState } from "react";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];
function App() {
  const Alldata = pizzaData;
  console.log(Alldata);
  return (
    <div className="container">
      <Head className="header" />
      <Menu Alldata={Alldata} />
      <Footer />
    </div>
  );
}

function Head() {
  return (
    <div className="header">
      <h1>Fast Pizza Co.</h1>
    </div>
  );
}
function Menu({ Alldata }) {
  return (
    Alldata.length > 4 && (
      <ul className="menu pizzas">
        {Alldata.map((pizza) => (
          <Pizza
            name={pizza.name}
            ing={pizza.ingredients}
            price={pizza.price}
            key={pizza.id}
            img={pizza.photoName}
          />
        ))}
      </ul>
    )
  );
}
function Pizza({ name, ing, price, img }) {
  return (
    <li className="pizza">
      <img src={img} alt={name} />
      {name && (
        <div>
          <h3>{name}</h3>
          <p>{ing}</p>
          <p>
            <span>{price}</span>
          </p>
        </div>
      )}
    </li>
  );
}

function Footer() {
  const time = new Date().getHours();
  console.log(time);
  const openHr = 12;
  const closehr = 22;
  const isOpen = time >= 12 && time <= 22;
  console.log(isOpen);
  return (
    <div className="footer">
      {isOpen && "We are open now"}
      <div className="order">
        <button className="btn" style={{ border: "3px solid yellow" }}>
          Order
        </button>
      </div>
    </div>
  );
}
export default App;
