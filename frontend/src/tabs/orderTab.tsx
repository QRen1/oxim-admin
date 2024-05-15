import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import "../styles/addItem.css";

export default function OrderTab() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [menuItems, setMenuItems] = useState<any[]>([]); // Modify the type as per your MenuItem model

  const handleUpload = () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("imageUrl", imageUrl);
    formData.append("category", category);
    formData.append("price", String(price));
    formData.append("description", description);
    formData.append("name", name);

    axios
      .post("http://localhost:7000/upload", formData)
      .then((res) => setImageUrl(res.data[0].imageUrl))
      .catch((err) => console.error(err));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // delete item
  const handleRemoveItem = (id: string) => {
    axios
      .delete(`http://localhost:7000/deleteMenuItem/${id}`)
      .then((res) => {
        console.log(res.data);
        // Filter out the removed item from menuItems state
        setMenuItems(menuItems.filter((item) => item._id !== id));
      })
      .catch((err) => console.error(err));
  };

  // fetch image
  useEffect(() => {
    axios
      .get("http://localhost:7000/getImage")
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // fetch other data like name, description, price
  useEffect(() => {
    axios
      .get("http://localhost:7000/menu")
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (menuItemId: string) => {
    axios
      .post("http://localhost:7000/cart/addToCart", { menuItemId })
      .then((res) => {
        console.log("Item added to cart:", res.data);
        // Optionally, you can update the UI to reflect the added item in the cart
      })
      .catch((err) => console.error("Failed to add item to cart:", err));
  };
  // const [description, setDescription] = useState(false);

  return (
    <div className="all-container">
      <div className="addItem">
        <div className="addMenu">
          <div className="inputContainer">
            <input
              className="addInput"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
            <input
              className="addInput"
              type="text"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Price"
            />
            <input
              className="addInput"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              className="addInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <input
              type="file"
              className="addInput"
              onChange={handleFileChange}
            />
            <br />

            <Button className="addButton" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </div>
        {/* Display the fetched menu items */}
        {menuItems.map((menuItem, index) => (
          <div key={index} className="menuItem">
            <div
              style={{ backgroundImage: `url(${menuItem.imageUrl})` }}
              className="menuImage"
            ></div>
            <div className="menuInfo">
              <p className="font-bold">{menuItem.name}</p>
              {/* <p>{menuItem.description}</p> */}
              <p>P{menuItem.price}</p>
            </div>
            <button onClick={() => handleRemoveItem(menuItem._id)}>
              REMOVE ITEM
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
