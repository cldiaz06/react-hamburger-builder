import React from "react";
import classes from "./Burger.module.css";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let tranIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  console.log(tranIngredients);

  if (tranIngredients.length === 0) {
    tranIngredients = <p>Please Start adding ingredients, please.</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {tranIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
