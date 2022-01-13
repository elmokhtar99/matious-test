import Products from "./components/Products";
import {Route,Switch,BrowserRouter as Router  } from 'react-router-dom';
import ProductDetail from "./components/ProductDetail";
function App() {
  return (
    <Router>   
      <div className='container m-4'>
        <Switch>
          <Route exact path="/" component={Products} ></Route>
          <Route exact path="/products" component={Products} ></Route>
          <Route exact path="/products/:id" component={ProductDetail} ></Route>
        </Switch>
      </div>
    </Router>
   
  );
}

export default App;
