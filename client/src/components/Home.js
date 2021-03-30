import React, {useState, useContext, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const Home = () => {
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)
    const [data, setData] = useState([])
    useEffect(()=>{
            fetch('https://slight-app.herokuapp.com/home',{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
                
                setData(result.posts)
            })
    },[])

    const makeComment = (text, postId)=>{
        fetch('https://slight-app.herokuapp.com/comment',{
            method:"put",
            headers:{
                
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else{
                    return item
                }
                
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    if (!data.length){
        return(
            <h2 style={{textAlign:"center", paddingTop:"15%", color:"white", fontWeight:"bold"}}>No Questions asked yet!</h2>
        )
        
    }else{
        return (
            <div className="home-aligner">
                {console.log(data)}
                {
                    
                    data.map(item=>{
                        
                        
                        return(
                            
                            <div className="home-card" style={{textAlign:"center"}}>
                                <u style={{color:"red"}}><h4>#{item.title}</h4></u>
                                <br/>
                                <h6 style={{ textAlign:"right"}}>Asked By: {item.postedBy.name}</h6>
                                <br/><br/>
                                <p>
                                {item.body}
                                </p>
                                <br/><br/><hr/><br/>
                                <h4 style={{textAlign:'right'}}>Comments</h4><br/>
                                {
                                        item.comments.map(record=>{
                                            return(
                                            <p style={{textAlign:"left"}} key={record._id}><u style={{fontWeight:"bold"}}>{record.postedBy.name}:</u> {record.text}</p>
                                            )
                                        })
                                    }
                                <form onSubmit={(e)=>{
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                    <br/>

                                    <input type="text" placeholder="Add a comment"/>
                                </form>
                            </div>
                            
                            
                        )
                    })
                
                
                }
            </div>
        )
    }
}

export default Home