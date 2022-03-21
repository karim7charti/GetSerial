

import {BrowserRouter as Router, Swicth, Route, Switch} from 'react-router-dom'
import axios from "axios";
import HomePage from './pages/user/HomePage';

import Cart from "./pages/user/Cart";

import WishListe from "./pages/user/WishListe";
import UserPrivateRoute from "./UserPrivateRoute";

import SearchAllProduct from "./pages/user/SearchAllProducts";
import OneProductBuyPage from "./pages/user/OneProductBuyPage";
import OrdersAll from "./pages/user/OrdersAll";
axios.defaults.baseURL=process.env.REACT_APP_BASE_URL;

axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials=true;

axios.interceptors.request.use(function (config){
    const token=localStorage.getItem('token');
    config.headers.authorization=token ? 'Bearer '+token:'';
    return config;
});
function App() {
  return (
      <Router>
        <Switch>


          <UserPrivateRoute path="/Cart" component={Cart}/>
               <UserPrivateRoute  path="/WishList" component={WishListe}/>
               <Route  path="/ProductsList" component={SearchAllProduct}/>
               <Route  path="/Orders" component={OrdersAll}/>
                <Route exact path="/" component={HomePage}/>
              <UserPrivateRoute  path="/Orders" component={OrdersAll}/>
            <UserPrivateRoute exact path="/buyProduct" component={OneProductBuyPage}/>




        </Switch>
      </Router>
  );
}

export default App;
