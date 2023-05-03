import React, {  useState } from "react";
import useStyles from "./styles";
import { Avatar, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import {LockOutlined} from '@material-ui/icons'
import InputFields from "./InputFields";
import { GoogleLogin } from 'react-google-login';
import {useDispatch} from 'react-redux'
import {loadGapiInsideDOM} from 'gapi-script'
import { useNavigate } from "react-router";
import {signup,signin} from '../../actions/auth'
import Icon from "./Icon";


const Auth = () => {

  const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}
  
  const classes = useStyles();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const state = null;
 const dispatch = useDispatch()
 const gapi = loadGapiInsideDOM()

  const handleShowPassword =()=>(setShowPassword((prevShowPassword) => !prevShowPassword))

  const handleSubmit =(e)=>{
    e.preventDefault()
    if(isSignUp){
      dispatch(signup(formData,navigate))
    }else{
      dispatch(signin(formData,navigate))
    }
  }

  const handleChange =(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }


  const switchMode =()=>{
     setIsSignUp((prevIsSignUp)=>!prevIsSignUp);
     setShowPassword(false)
  }


  
  const googleSuccess = (res)=>{
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({type:'AUTH',data:{result,token}})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error)=>{

    if (error.error === 'popup_closed_by_user') {
      // Handle user closing the pop-up window prematurely
      console.log('User closed the pop-up window before completing sign-in.');
    } else {
      // Handle other sign-in failures
      console.log('Failed to sign in with Google:', error);
    }
  }



  return (
    <div style={{ color: "white" }}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined/>
          </Avatar>
          <Typography variant="h5">{isSignUp ? 'Sign-Up' : 'Sign-In'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>                            
                                <InputFields name="firstName" label='First Name' autoFocus handleChange={handleChange} half />
                                <InputFields name="lastName" label='Last Name' handleChange={handleChange} half />
                            </>
                        )
                    }
                    <InputFields name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <InputFields name='password' label='Password Address' handleChange={handleChange} type={showPassword ? 'text':'password'} handleShowPassword={handleShowPassword} />
                    {
                        isSignUp && <InputFields name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />
                    }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                
                <GoogleLogin
                    clientId="68889344249-qbkjav3tvj9ubotoe9cgg5fvpcf13ba9.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.       disabled} startIcon={<Icon />} variant="contained">
                        Google Sign In
                      </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={'single_host_origin'}
                />

                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp? "Already have an account ? Sign In":'Do not have an account? Sign Up'}
                        </Button>
                    </Grid>
                </Grid>

          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Auth;
