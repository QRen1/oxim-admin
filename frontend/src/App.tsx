import { useState } from "react";
import OrderTab from "../src/tabs/orderTab";
import MenuTab from "./tabs/menuTab";
import "./styles/app.css";

function App() {
  const [orderTab, setOrderTab] = useState(false);
  const [menuTab, setMenuTab] = useState(false);

  const handleOrders = () => {
    setOrderTab(true);
    setMenuTab(false);
  };
  const handleMenu = () => {
    setMenuTab(true);
    setOrderTab(false);
  };
  return (
    <div className="container">
      <div className="tabContainer">
        <button
          className={"tabButton" + (orderTab ? " active" : "")}
          onClick={handleOrders}
        >
          Menu
        </button>
        <button
          className={"tabButton" + (menuTab ? " active" : "")}
          onClick={handleMenu}
        >
          Order
        </button>
      </div>
      {orderTab ? <OrderTab /> : <MenuTab />}
    </div>
  );
}

export default App;
