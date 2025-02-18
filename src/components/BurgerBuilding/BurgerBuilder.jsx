import Burger from "./Burger";
import { useDispatch, useSelector } from "react-redux";
import { burgerSliceAction } from "../../store/BurgerSlice";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BurgerBuilder = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const burger = useSelector((store) => store.burger);
  const ingredients = useSelector((store) => store.ingredients);
  const totalPrice =
    40 +
    burger.salad * ingredients[0].price +
    burger.cheese * ingredients[1].price +
    burger.meat * ingredients[2].price;
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();

  const handleIncrease = (name) => {
    dispatch(burgerSliceAction.addIngredients(name));
  };

  const handleDecrease = (name) => {
    dispatch(burgerSliceAction.removeIngredients(name));
  };

  return (
    <div className="d-flex flex-row justify-content-center mt-3">
      <Burger />
      <div className="d-flex flex-column text-start fw-semibold w-25 m-3 p-3">
        <h4 className="bg-warning p-2 text-center rounded-2">Add Ingredient</h4>

        <div className="d-flex justify-content-between align-items-center gap-3 p-2 bg-light rounded">
          <span className="fw-bold flex-grow-1 text-center">Salad</span>
          <Button
            className="btn btn-danger fw-bold"
            onClick={() => handleDecrease("salad")}
            disabled={burger.salad === 0}
          >
            Less
          </Button>
          <Button
            className="btn btn-success fw-bold"
            onClick={() => handleIncrease("salad")}
            disabled={burger.salad === 5}
          >
            More
          </Button>
        </div>

        <div className="d-flex justify-content-between align-items-center gap-3 p-2 bg-light rounded mt-2">
          <span className="fw-bold flex-grow-1 text-center">Cheese</span>
          <Button
            className="btn btn-danger fw-bold"
            onClick={() => handleDecrease("cheese")}
            disabled={burger.cheese === 0}
          >
            Less
          </Button>
          <Button
            className="btn btn-success fw-bold"
            onClick={() => handleIncrease("cheese")}
            disabled={burger.cheese === 5}
          >
            More
          </Button>
        </div>

        <div className="d-flex justify-content-between align-items-center gap-3 p-2 bg-light rounded mt-2">
          <span className="fw-bold flex-grow-1 text-center">Meat</span>
          <Button
            className="btn btn-danger fw-bold"
            onClick={() => handleDecrease("meat")}
            disabled={burger.meat === 0}
          >
            Less
          </Button>
          <Button
            className="btn btn-success fw-bold"
            onClick={() => handleIncrease("meat")}
            disabled={burger.meat === 5}
          >
            More
          </Button>
        </div>

        <p className="border border-danger text-black rounded-2 mt-3 p-2 text-center fw-bold">
          Price: {totalPrice} Tk
        </p>

        <Button
          color="danger"
          className="w-100 p-2 fw-bold"
          onClick={toggle}
          disabled={totalPrice === 40}
        >
          Order Now
        </Button>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Order Summary</ModalHeader>
          <ModalBody>
            <p className="fw-bold">Your delicious burger includes:</p>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                <span>Salad:</span>{" "}
                <span className="fw-bold">{burger.salad}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Cheese:</span>{" "}
                <span className="fw-bold">{burger.cheese}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Meat:</span>{" "}
                <span className="fw-bold">{burger.meat}</span>
              </li>
            </ul>
            <p className="fw-bold text-center text-danger mt-3">
              Total Price: {totalPrice} Tk
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                toggle(); // Close modal first
                navigate("/checkout", {
                  state: {
                    totalPrice:totalPrice,
                    ingredients:{
                      salad:burger.salad,
                      cheese:burger.cheese,
                      meat:burger.meat,
                    },
                  },
                });; // Then navigate
              }}
            >
              Checkout
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default BurgerBuilder;
