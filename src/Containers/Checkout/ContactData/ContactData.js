import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '', 
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },
            streer: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false, 
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);  

        this.setState({loading: true});

        const formData = {};
        for (let formelementIdentifier in this.state.orderForm) {
            formData[formelementIdentifier] = this.state.orderForm[formelementIdentifier].value;
        }

        // alert('You Continue!');
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                console.log(response);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error);
            });
    }

    checkValidity(value, rules) {
        let isvalid = true;

        if (rules.required) {
            isvalid = value.trim() !== '' && isvalid;
        }

        if (rules.minLength) {
            isvalid = value.length >= rules.minLength && isvalid;
        }

        if (rules.maxLength) {
            isvalid = value.length <= rules.maxLength && isvalid;
        }

        return isvalid;
    }

    inputChangedHandler = (event, inputindentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputindentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputindentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIndentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render () {
        const formelementsErray = [];
        for (let key in this.state.orderForm) {
            formelementsErray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                <Input elementType="..." elementConfig="..." value="..." />
                {formelementsErray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    value={formElement.config.value}
                    elementConfig={formElement.config.elementConfig}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);