import React,{useEffect,createContext, useReducer, useContext} from 'react'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import "./App.css"
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Signin from './components/Signin'
import Home from './components/Home'
import Createpost from './components/Createpost'
import {reducer, initialState} from './reducers/userReducer'
export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = (localStorage.getItem("user"))
    if(user==null){
      history.push('/')
    }
    else{
      dispatch({type:"USER", payload:user})
      history.push('/home')
    }
    },[])
  return (
    
    <Switch>
      
        <Route exact path="/">
          <Signin/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/ask">
          <Createpost/>
        </Route>
      
    </Switch>
    
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    
    <div className="back"></div>
      <Navbar/>
      <Routing/>
      
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App