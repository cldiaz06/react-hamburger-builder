import React from "react";
import Aux from "../../../hoc/Aux_JS";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Delicious burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout</p>
      <Button btnType="Danger" clicked={props.orderCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.orderContinue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
