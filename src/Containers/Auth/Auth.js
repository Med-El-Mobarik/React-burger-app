import React, {Component} from 'react';
import {connect} from 'react-redux';

import Spinner from '../../Components/UI/Spinner/Spinner';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../Store/actions/index';

class auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail adress'
                },
                value: '', 
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false, 
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '', 
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false, 
                touched: false
            }
        },
        isSignup: true
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup); 
    }

    switchAuthModeHandler = () => {
        this.setState(prevstate => {
            return {
                isSignup: !prevstate.isSignup
            }
        })
    }

    render() {
        const formelementsErray = [];
        for (let key in this.state.controls) {
            formelementsErray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formelementsErray.map(formElement => (
            <Input 
                key= {formElement.id}
                elementType={formElement.config.elementType} 
                value={formElement.config.value}
                elementConfig={formElement.config.elementConfig}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched} />
        ))

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType= "Success">Submit</Button>
                    <Button btnType= "Danger" clicked={this.switchAuthModeHandler}>
                        Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(auth);