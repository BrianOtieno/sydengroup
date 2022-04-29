import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import AuthContext from "../../contexts/AuthProvider";
import axios from "../../api/axios"; 
import { UserContext } from '../../contexts/UserContext';

const LOGIN_URL = '/authentication'

const Login =  (props) => {
  const history = useHistory();
  // const { setAuth } = useContext(AuthContext)
  const userRef = useRef();
  const errRef = useRef(); 
  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState('');
  // const [setFirstName] = useContext(AuthContext);
  // const [setLastName] = useContext(AuthContext); 
  // const [setEmail] = useContext(AuthContext);  
  const [, setToken] = useContext(UserContext);

  useEffect(()=>{
    userRef.current.focus();

  }, [])

  useEffect(() =>{
    setErrorMessage('');
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault();  
    console.log(username, password)
    const _requestData = new FormData();
    _requestData.append('username', username);
    _requestData.append('password', password);
    // const _requestData = {"username": username, "password": password}

    const _requestOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
      withCredentials: true,
      crossDomain: true
    } 

    try{
      const response = await axios.post(LOGIN_URL, _requestData, _requestOptions);
      console.log(JSON.stringify(response?.data));
      const _accessToken = response?.data?.access_token;
      const _firstName = response?.data?.first_name;
      const _lastName = response?.data?.last_name;
      const _userName = response?.data?.username; 
      const _email = response?.data?.password;

      // setShowProfile(true);

      setUsername('');
      setPassword('');
      setToken(_accessToken)
      // setEmail(_email);
      // setFirstName(_firstName);
      // setLastName(_lastName);
      // setAuth(_accessToken);
      // setUsername(_userName);
      history.push("/dashboard")

    } catch (err) {
      if (!err?.response){
        setErrorMessage('Server Not Responding');
      }else if(err.response?.status === 400){
        setErrorMessage('Missing Credentials');
      }else if(err.response?.status === 401){
        setErrorMessage('Unauthorized')
      }else{
        setErrorMessage('Login Failed!')
      }
      errRef.current.focus();
    }
    
    console.log(_requestData) 
  }
  
  if (showProfile) history.push("/dashboard");
 
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  {/* <img src={require("../../assets/images/logo.png")} alt="logo" /> */}
                  <h1>SydenGroup</h1>
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <p ref={errRef} className={errorMessage? "alert alert-warning errMsg": "offscreen"} aria-live="assertive">{errorMessage}</p>
                <Form className="pt-3" >
                  <Form.Group className="d-flex search-field">
                    <Form.Control id='username' type="email" ref={userRef} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" size="lg" className="h-auto" required/>
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control id='paddword' type="password" placeholder="Password" size="lg" className="h-auto" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Group>
                  <div className="mt-3">
                    <Link className="d-flex justify-content-center btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleSubmit} to="/dashboard">SIGN IN</Link>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Forgot password?</a>
                  </div> 
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/register" className="text-primary">Create</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  
}

export default Login
