import { MovieFinder } from './MovieFinder';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './App.css';

function App() {

  return <BrowserRouter>
    <Route path="/" component={MovieFinder} />
    <Redirect to="/" />
  </BrowserRouter>
}

export default App;
