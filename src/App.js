import { BrowserRouter as Router, Route} from "react-router-dom"

import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/home" component={Home} />
      <Route  exact path="/" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  );
}

export default App;
