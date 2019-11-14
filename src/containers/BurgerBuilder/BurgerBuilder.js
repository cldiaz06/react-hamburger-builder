import React, { Component } from "react";
import Aux from "../../hoc/Aux_JS";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,

  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    ordering: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };

    updateIngredients[type] = updateCount;
    const priceAdd = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdd;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };

    updateIngredients[type] = updateCount;
    const priceRemove = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemove;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
    this.updatePurchaseState(updateIngredients);
  };

  orderingHandler = () => {
    this.setState({ ordering: true });
  };

  orderingCancelHandler = () => {
    this.setState({ ordering: false });
  };

  orderingContinueHandler = () => {
    alert("Enjoy that Burger");
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.ordering}
          modalClosed={this.orderingCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            orderCancelled={this.orderingCancelHandler}
            orderContinue={this.orderingContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disableInfo}
          purchasable={this.state.purchasable}
          ordered={this.orderingHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
