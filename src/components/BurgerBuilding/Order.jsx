import styles from "./Order.module.css";

const Order = ({ order, isSelected, onSelectOrder }) => {
  const handleMouseEnter = () => {
    onSelectOrder(order.id); // Notify parent component when the order is hovered
  };

  return (
    <div
      className="p-3 rounded-3 border mb-3 border-warning position-relative"
      onMouseEnter={handleMouseEnter} // Trigger on mouse enter
    >
      <div className={`border rounded-2 p-3 ${styles.heading}`}>
        <strong className="text-success">Order Id: {order.id}</strong>
        <strong className="text-danger">&#2547;{order.total_price}</strong>
        <strong className="p-1 text-danger">{order.order_status}</strong>
      </div>
      <div className="d-flex border rounded-2 flex-row mt-3 gap-4 p-2 flex-wrap">
        <span className="badge text-bg-success fs-6">Salad: {order.salad_count}</span>
        <span className="badge text-bg-warning fs-6">Cheese: {order.cheese_count}</span>
        <span className="badge text-bg-dark fs-6">Meat: {order.meat_count}</span>
      </div>

      {/* Pop-up for additional details */}
      {isSelected && (
        <div className={`position-absolute top-0 start-100 ms-3 ${styles.popup}`}>
          <div className="bg-white border rounded-3 p-3 shadow">
            <p><strong>Payment Method:</strong> {order.pay_method}</p>
            <p><strong>Delivery Address:</strong> {order.delivery_address}</p>
            <p><strong>Mobile Number:</strong> {order.mobile_no }</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
