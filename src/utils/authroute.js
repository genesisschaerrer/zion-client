import {useContext} from "react"
import {Route, Redirect} from "react-router-dom"

import {AuthContext} from "../utils/context/auth"

const AuthRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(AuthContext)
    return (
        <Route
            {...rest}
            render={props => user ? <Redirect exact to="/home" /> : <Component {...props} />}
        />
    )
}

export default AuthRoute