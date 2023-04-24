import React, {useState} from "react"
import "./login.css"
import axios from "axios"
// import { useHistory } from "react-router-dom"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

// import Homepage from "../homepage/homepage"
// import homepage from "../homepage/homepage"
// import homepage from "./components /homepage"

const Login = ({ setLoginUser}) => {
    const navigate=useNavigate();
    // const history = useHistory()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/login", user)
        .then(res => {
            // alert(res.data.message)
            
            setLoginUser(res.data.user)
            if(res.data.message===true){
                navigate("/")
            }
            // history.push("/")
        })
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            {/* <div className="button" onClick={login}>Login</div> */}
            {/* <div className="button" onClick={homepage}>Homepage</div> */}
            <div className="button" onClick={login}>Login</div>
            {/* <Link className="btn btn-success" to= "/Login">  Login   </Link> */}
            <div>or</div>
            {/* <div className="button" onClick={() => history.push("/register")}>Register</div> */}
            <Link className="btn btn-success" to= "/register"> Register </Link>

        </div>
    )
}

export default Login