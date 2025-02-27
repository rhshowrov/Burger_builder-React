import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrder } from "../../store/orderSlice";
import Order from "./Order";

const MyOrder = () => {
  const { loading, status, orders } = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State to track selected order

  useEffect(() => {
    dispatch(getMyOrder());
  }, [dispatch]);

  // Function to handle order selection
  const handleSelectOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  return (
    <div className="d-flex p-3 w-50 flex-column mx-auto position-relative">
      {loading && <p>Fetching.....</p>}
      {orders?.length > 0 ? (
        orders.map((order) => (
          <Order
            key={order.id}
            order={order}
            isSelected={selectedOrderId === order.id} // Pass whether the order is selected
            onSelectOrder={handleSelectOrder} // Pass the selection handler
          />
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default MyOrder;
