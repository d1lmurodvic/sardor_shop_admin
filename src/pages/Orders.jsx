import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://sardor-s-shop-beckent-5.onrender.com/api/orders";

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/update/${id}`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-info">Orders</h1>
        <span className="badge badge-info badge-outline">
          Total: {orders.length}
        </span>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead className="bg-info text-white">
            <tr>
              <th>#</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover">
                <td>{index + 1}</td>
                <td className="font-semibold">{order.buyerName}</td>
                <td>{order.product?.name || "N/A"}</td>
                <td>{order.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "completed"
                        ? "badge-success"
                        : order.status === "pending"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-sm select-info"
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-10 text-base-content/50">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
