import { BrowserRouter as Router, Route} from "react-router-dom"

import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import './App.css';

import {AuthProvider} from "./utils/context/auth"

function App() {
  return (
    <AuthProvider>
    <Router>
      <Route path="/home" component={Home} />
      <Route  exact path="/" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
    </AuthProvider>
  );
}

export default App;
