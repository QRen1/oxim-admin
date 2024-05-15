import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/purchase.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CartItem {
  itemId: string;
  quantity: number;
  imageUrl: string;
  name: string;
}

interface Purchase {
  _id: string;
  userId: string;
  cartItems: CartItem[];
  totalAmount: number;
  purchaseDate: Date;
  status: string;
  email: string;
  addressLine1: string;
}

function MenuTab() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get<Purchase[]>(
          "http://localhost:7000/purchases"
        );
        setPurchases(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const handleStatusChange = async (purchaseId: string, newStatus: string) => {
    try {
      await axios.put(`http://localhost:7000/purchases/${purchaseId}`, {
        status: newStatus,
      });
      setPurchases((prevPurchases) =>
        prevPurchases.map((purchase) =>
          purchase._id === purchaseId
            ? { ...purchase, status: newStatus }
            : purchase
        )
      );

      // Show success toast notification
      toast.success("Status updated successfully", {
        position: "top-right",
      });
    } catch (err) {
      console.error("Failed to update status", err);
      // Show error toast notification
      toast.error("Failed to update status", {
        position: "top-right",
      });
    }
  };

  const [selectedStatuses, setSelectedStatuses] = useState<{
    [key: string]: string;
  }>({});

  const handleSelectChange = (purchaseId: string, newStatus: string) => {
    setSelectedStatuses((prevSelectedStatuses) => ({
      ...prevSelectedStatuses,
      [purchaseId]: newStatus,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  function getStatusBackgroundColor(status: string): string {
    switch (status) {
      case "pending":
        return "gray";
      case "preparing":
        return "#7F7F00"; // yellow
      case "to be picked up":
        return "#000066y";
      case "completed":
        return "#14701E"; // green
      case "canceled":
        return "red";
      default:
        return "white";
    }
  }
  return (
    <div className="purchaseContainer">
      <div className="purchaseItem">
        {purchases.map((purchase) => (
          <div key={purchase._id} className="container">
            {purchase.cartItems.map((item) => (
              <div className="purchaseImageContainer" key={item.itemId}>
                <div className="purchaseImageContainer">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="itemInfo">
                    <div className="info">
                      <div className="category">Item Name: </div>
                      <div className="value">{item.name}</div>
                    </div>
                    <div className="info">
                      <div className="category">Quantity: </div>
                      <div className="value">{item.quantity}</div>
                    </div>
                    <div className="info">
                      <div className="category">Total Amount: </div>
                      <div className="value">₱{purchase.totalAmount}</div>
                    </div>
                    <div className="info">
                      <div className="category">Purchase Date: </div>
                      <div className="value">
                        {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="info">
                      <div className="category">Email: </div>
                      <div className="value">{purchase.email}</div>
                    </div>
                    <div className="info">
                      <div className="category">Address: </div>
                      <div className="value">{purchase.addressLine1}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <section className="purchaseStatus">
              <select
                style={{
                  backgroundColor: getStatusBackgroundColor(purchase.status),
                  color: "white",
                  padding: "5px",
                  borderRadius: "0px",
                  border: "none",
                  outline: "none",
                }}
                value={selectedStatuses[purchase._id] || purchase.status}
                onChange={(e) =>
                  handleSelectChange(purchase._id, e.target.value)
                }
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="to be picked up">To be Picked Up</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
              </select>
              <button
                className="purchaseUpdate"
                onClick={() =>
                  handleStatusChange(
                    purchase._id,
                    selectedStatuses[purchase._id] || purchase.status
                  )
                }
              >
                Update
              </button>
            </section>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MenuTab;
