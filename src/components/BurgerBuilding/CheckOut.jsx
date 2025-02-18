import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

const CheckOut = () => {
  const { state } = useLocation();
  const { totalPrice, ingredients } = state || {};
  const navigate = useNavigate();
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirm = () => {
    setOrderPlaced(true);
    setModalOpen(true); // Open the modal
    setTimeout(() => {
      setModalOpen(false);
      navigate("/building-burger"); // Redirect after 2 seconds
    }, 2000);
  };

  return (
    <div className="d-flex flex-column align-items-center mt-2">
      {/* Checkout Title */}
      <div className="w-25 bg-warning rounded-3  shadow">
        <p className="text-center fw-bold mt-2 fs-5">Checkout</p>
      </div>

      <hr className="w-75 mt-3" />

      {/* Order Summary & Delivery Details Side by Side */}
      <div className="d-flex justify-content-between w-75">
        {/* Order Summary */}
        <div className="w-50 bg-light p-4 rounded shadow-sm me-3">
          <h5 className="fw-bold">Order Summary</h5>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between">
              <span>Salad:</span> <span>{ingredients?.salad || 0}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Cheese:</span> <span>{ingredients?.cheese || 0}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Meat:</span> <span>{ingredients?.meat || 0}</span>
            </li>
          </ul>
          <p className="fw-bold text-end text-danger mt-3">
            Total Price: {totalPrice} Tk
          </p>
        </div>

        {/* Delivery Details */}
        <div className="w-50 bg-white p-4 rounded shadow-sm border">
          <h5 className="fw-bold">Delivery Details</h5>
          <Form>
            <FormGroup>
              <Label className="fw-semibold">Address</Label>
              <Input
                type="text"
                placeholder="Enter your delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label className="fw-semibold">Mobile Phone</Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label className="fw-semibold">Payment Method</Label>
              <Input
                type="select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Cash on Delivery</option>
                <option>Bkash</option>
                <option>Nagad</option>
                <option>Credit Card</option>
              </Input>
            </FormGroup>

            {/* Button inside Delivery Details - Disabled if inputs are empty */}
            <div className="d-flex justify-content-end">
              <Button
                color="danger"
                className="mt-3 fw-bold p-2"
                onClick={handleConfirm}
                disabled={!address || !mobile} // Disable if inputs are empty
              >
                Confirm Order
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={modalOpen} centered>
        <ModalHeader>Order Confirmation</ModalHeader>
        <ModalBody className="text-center">
          ✅ <strong>Order placed successfully!</strong>
          <p>Redirecting to burger builder...</p>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CheckOut;
