import React, {useState, useContext, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const Navbar = () => {
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)
    const user = (localStorage.getItem('name'))
    
    const renderList = ()=>{
        if (!state){
            return[
            <Link to="/" className="brand-logo left" style={{fontFamily: "Train One"}}>SLIGHT</Link>,
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li key="1"><Link to="/signup">Signup</Link></li>
                        <li key="2"><Link to="/">Signin</Link></li>
            </ul>   
            ]     
            
        
        }else{
            return[
            <Link to="/home" className="brand-logo left" style={{fontFamily: "Train One"}}>SLIGHT</Link>,
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li key="3"><Link to="/ask">Ask</Link></li>
                        <li key="4"><Link to="#">{user}</Link></li>
                        <li key="5"><Link to="#"><i className="fa fa-sign-out" onClick={()=>{
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            M.toast({html:"Logged out!", classes:"#64dd17 light-green accent-4"})
                            history.push('/')
                            }}></i></Link>
                            </li>
            </ul>
            ]
        }
    }
    return (
            <nav className="home">
                <div className="home-aligner">
                    <div className="nav-wrapper white" >
                        {renderList()}
                    </div>
                </div>
            </nav>
    )
}

export default Navbar