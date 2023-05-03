import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import memories from "../../images/memories.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode'

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  //getting user form localstorage

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  // console.log(user)

  // logout Functionality

  const logout =()=>{
      dispatch({type:'LOGOUT'})
      setUser(null)

      // navigate('/auth')
      navigate('/')

      // console.log('logout')
  }

  useEffect(()=>{
    const token = user?.token;

    // Cheking token for logged in user is expired

    if(token){
      const decodeToken = decode(token)
      
      if(decodeToken.exp * 1000 < new Date().getTime())

      logout()
    }


    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
      <Link to='/'>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </Link>
      </div>
      <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.substring(0, 1).toUpperCase()}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ):(

                        <Button variant="contained" component={Link} to='/auth' color="primary">Sign In</Button>

                    )
                }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
