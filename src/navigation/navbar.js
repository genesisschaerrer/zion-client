import {useContext} from "react"
import {AuthContext} from "../utils/context/auth"
import {Link} from "react-router-dom"

export default function Navbar(){
    const {user, logout} = useContext(AuthContext)

    return(
        <div>
            <div>{user.username}</div>
            <Link to="/" onClick={logout}>logout</Link>
        </div>
    )
}