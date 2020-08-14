import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then (res => {
                console.log(res.data);
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                };
                console.log(fetchOrders);
                this.setState({loading: false, orders: fetchOrders});
            })
            .catch (error => {
                this.setState({loading: false});
            })
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id} 
                    ingredients={order.ingredients}
                    price={+order.price}/>
                ))}
            </div>
        );
    }
}

export default WithErrorHandler(Orders, axios);