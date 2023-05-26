import React, {useState,useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'
const Signin = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
  
  
  const PostData = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Invalid email",classes:"#f44336 red"})
      return
    }
    fetch("https://odd-pink-kitten-robe.cyclic.app/",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
        
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if (data.error){
        M.toast({html: data.error, classes:"#f44336 red"})
      }
      else{
        localStorage.setItem("name", data.nam)
        localStorage.setItem("jwt", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        dispatch({type:"USER", payload:data.user})
        M.toast({html:"signin success!", classes:"#64dd17 light-green accent-4"})
        history.push('/home')
      }
    }).catch(err=>{
      console.log(err)
    })
  }
    return (
        <div className="home-aligner">
            <div className="card authcard">
                <h2>Signin</h2>
                <input type="text" placeholder="Email ID"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password"
                value={password}
                onChange={(e)=>setPasword(e.target.value)}
                />
                <br></br><br></br>
                <button style={{borderRadius:"4px", fontFamily:"'Lexend', sans-serif", width:"30%", backgroundColor:"greenyellow", color:"#484848", fontWeight:""}} className="btn waves-effect waves-light" onClick={()=>PostData()}>Signin</button>
                <br></br><br></br>
                <Link to="/signup">Signup instead?</Link>
            </div>
        </div>
    )
}

export default Signin