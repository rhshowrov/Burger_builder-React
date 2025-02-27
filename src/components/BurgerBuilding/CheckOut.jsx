import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, orderSliceAction } from "../../store/orderSlice";
import { burgerSliceAction } from "../../store/BurgerSlice";

const CheckOut = () => {
  const { state } = useLocation();
  const { totalPrice, ingredients } = state || {};

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false); // ✅ Control redirection

  const { loading, status, redirect } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    let orderObj = {
      salad_count: ingredients.salad,
      cheese_count: ingredients.cheese,
      meat_count: ingredients.meat,
      total_price: totalPrice,
      delivery_address: address,
      pay_method: paymentMethod,
      mobile_no: mobile,
    };

    dispatch(createOrder(orderObj));
  };

  // ✅ Show status message first, then redirect
  useEffect(() => {
    if (redirect) {
      setModalOpen(true); // Show success message first

      const timer = setTimeout(() => {
        setModalOpen(false);
        dispatch(burgerSliceAction.resetBurger())
        dispatch(orderSliceAction.resetOrder());
        setShouldRedirect(true); // Now allow redirection
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [redirect, dispatch]);

  return (
    <div className="d-flex flex-column align-items-center mt-2">
      {/* Checkout Title */}
      <div className="w-25 bg-warning rounded-3 shadow">
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

            {/* Button inside Delivery Details - Disabled if inputs are empty or loading */}
            <div className="d-flex justify-content-end">
              <Button
                color="danger"
                className="mt-3 fw-bold p-2"
                onClick={handleConfirm}
                disabled={!address || !mobile || loading} // ✅ Disable when loading
              >
                {loading ? "Processing..." : "Confirm Order"}
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={modalOpen} centered>
        <ModalHeader>Order Confirmation</ModalHeader>
        <ModalBody className="text-center">
          ✅ <strong>{status}</strong>
        </ModalBody>
      </Modal>

      {/* ✅ Redirecting user after status message is shown */}
      {shouldRedirect && <Navigate to="/" replace />}
    </div>
  );
};

export default CheckOut;

