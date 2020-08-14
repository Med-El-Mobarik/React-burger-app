import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';

class App extends Component {
  render(){
    return (
      <div>
        <Layout>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
        </Layout>
      </div>
  );
  }
}
  

export default App;
