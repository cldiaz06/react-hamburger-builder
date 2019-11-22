import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from '../CheckoutSummary/CheckoutSummary.module.css'

const CheckoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Hope it tastes good</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType='Danger'
                clicked={props.checkoutCancel}>
                Cancel
            </Button>
            <Button 
                btnType='Success'
                clicked={props.checkoutContinue}>
                    Continue
            </Button>
        </div>
    );
}

export default CheckoutSummary;