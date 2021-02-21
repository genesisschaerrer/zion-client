import { BrowserRouter as Router, Route} from "react-router-dom"

import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
// import SinglePost from "./pages/single-post"
import AuthRoute from "./utils/authroute"
import './App.css';

import {AuthProvider} from "./utils/context/auth"

function App() {
  return (
    <AuthProvider>
    <Router>
      <Route path="/home" component={Home} />
      <AuthRoute  exact path="/" component={Login} />
      <AuthRoute path="/register" component={Register} />
      {/* <Route exact path="/posts/:id" component={SinglePost} /> */}
    </Router>
    </AuthProvider>
  );
}

export default App;
