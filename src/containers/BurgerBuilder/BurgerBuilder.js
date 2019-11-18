import React, { Component } from "react";
import Aux from "../../hoc/Aux_JS";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHander from '../../hoc/withErrorHandler/withErrorHandler';

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
    ordering: false,
    loading: false,
    error: false
  };

  componentDidMount(){
    axios.get('https://react-my-burger-327f9.firebaseio.com/ingredients.json')
      .then(response => {
          this.setState({ingredients: response.data});
      })
      .catch(error =>{
          this.setState({error: true});
      });
  }

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
    //alert("Enjoy that Burger");
    this.setState({loading: true});
    
    const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
          name: 'Chris diaz',
          address: {
              street: '1113 Holly Ct',
              zipCode: '60301',
              country: 'USA'
          },
          email: 'cdjunkman@gmail.com'
        },
        deliveryMethod: 'USPS'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasable: false});
      })
      .catch(error => {
        this.setState({loading: false, purchaseable: false});
      });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredents cannot be loaded</p> : <Spinner/>;

    if(this.state.ingredients){
        burger = (    <Aux>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                          ingredientAdded={this.addIngredientHandler}
                          ingredientRemove={this.removeIngredientHandler}
                          disabled={disableInfo}
                          purchasable={this.state.purchasable}
                          ordered={this.orderingHandler}
                          price={this.state.totalPrice}/>
                      </Aux>
                    );
        orderSummary = <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    orderCancelled={this.orderingCancelHandler}
                    orderContinue={this.orderingContinueHandler}/>;
    }

    if(this.state.loading){
      orderSummary = <Spinner/>
    }

    return (
      <Aux>
        <Modal show={this.state.ordering} modalClosed={this.orderingCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHander(BurgerBuilder, axios);
