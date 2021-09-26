import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import { store } from './store'
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import singleCar from './pages/singleCar'

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <nav className="navbar nav bg-dark text-white">
      <div className="p-2">
        <h3>
          Car <span className="text-success">Rentals</span>
        </h3>
      </div>
    </nav>
    <Router>
      <Switch>
        <Route path="/" match exact component={App} />
        <Route path="/car/:id" match exact component={singleCar} />
        <App />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
