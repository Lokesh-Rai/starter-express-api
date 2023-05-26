import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../App'

const Createpost = () => {
    const {state, dispatch} = useContext(UserContext)

    const history = useHistory()
    const [title, setTitle] = useState("")
    const[body, setBody] = useState("")
    const PostData = ()=>{
        fetch("ask",{
            method:"post",
            headers:{
              "Content-Type":"application/json",
              "Authorization": "Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            title,
            body
        })
        }).then(res=>res.json())
        .then(data=>{
        if (data.error){
            M.toast({html: data.error, classes:"#f44336 red"})
        }
        else{
            M.toast({html:"Question Posted!", classes:"#64dd17 light-green accent-4"})
            history.push('/home')
        }
        }).catch(err=>{
        console.log(err)
        })
    }

    return (
        <div className="hac" style={{textAlign:"center"}}>
            <input type="text"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <br/><br/><br/>
            <input type="text"
            placeholder="Description of the problem"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <br/><br/><br/><br/>
            <button onClick={()=>PostData()} className="btn waves-effect waves-light" style={{borderRadius:"15px", fontFamily:"'Lexend', sans-serif", fontSize:"20px", width:"20%", height:"20%", backgroundColor:"orange"}}>Ask</button>
        </div>
    )
}

export default Createpost