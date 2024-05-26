import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import "../styles/addItem.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      .post(
        "https://dashboard.render.com/web/srv-cp26m121hbls739b7adg/upload",
        formData
      )
      .then((res) => {
        setImageUrl(res.data[0].imageUrl);
        toast.success("Item uploaded successfully", {
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to upload item", {
          position: "top-right",
        });
      });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // delete item
  const handleRemoveItem = (id: string) => {
    axios
      .delete(
        `https://dashboard.render.com/web/srv-cp26m121hbls739b7adg/deleteMenuItem/${id}`
      )
      .then((res) => {
        console.log(res.data);
        setMenuItems(menuItems.filter((item) => item._id !== id));
        toast.success("Item removed successfully", {
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to remove item", {
          position: "top-right",
        });
      });
  };
  // fetch image
  useEffect(() => {
    axios
      .get("http://localhost:/getImage")
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // fetch other data like name, description, price
  useEffect(() => {
    axios
      .get("https://dashboard.render.com/web/srv-cp26m121hbls739b7adg/menu")
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

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
      <ToastContainer />
    </div>
  );
}
