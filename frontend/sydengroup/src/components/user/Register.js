import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../api/axios';

const REGISTER_URL = '/users/register';

const Register = () => { 
  const history = useHistory();
  const errRef = useRef();
  const userRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    userRef.current.focus();
  }, [])

  useEffect(()=>{
    setErrorMessage(''); 
  }, [firstName, lastName, username, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const _requestData = new FormData();

    // _requestData.append("first_name", firstName);
    // _requestData.append("last_name", lastName);
    // _requestData.append("username", username);
    // _requestData.append("email", username);
    // _requestData.append('password', password);
    // _requestData.append('diabled', false);
   const  _requestData = {
     first_name: firstName, last_name: lastName, username: username, 
     email: username, password: password, disabled: false 
    }
    

    const _requestOptions = {
      headers : {
        'Content-Type' : 'application/json',
        'accept' : 'application/json'
      },
      withCredentials : true,
      cossDomain: true
    }

    try{
      const response = await axios.post(REGISTER_URL, JSON.stringify(_requestData), _requestOptions);
      const _firstName = response?.data?.first_name;
      const _lastName = response?.data?.last_name; 
      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
      history.push("/login");
    }catch(err){
      if (!err?.response){
        setErrorMessage('Server Not Responding');
      }else if (err.response?.status === 422){
        setErrorMessage("Validation failed");
      }else if (err.response?.status === 400){
        setErrorMessage("All fields are required!")
      }else{
        setErrorMessage("An error occured while creating account")
      }
      errRef.current.focus();
    }
    console.log(_requestData);
    console.log(firstName, lastName, username, password)
  }

  // render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  {/* <img src={require("../../assets/images/logo.svg")} alt="logo" /> */}
                  <h1>SydenGroup</h1>
                </div>
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a minute!</h6>
                <form className="pt-3">
                <p ref={errRef} className={errorMessage? "alert alert-warning errMsg": "offscreen"} aria-live="assertive">{errorMessage}</p>
                  <div className="form-group">
                    <input type="text" ref={firstNameRef} value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control form-control-lg" id="first_name" placeholder="First Name" />
                  </div>
                  <div className="form-group">
                    <input type="text" ref={lastNameRef} value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control form-control-lg" id="last_name" placeholder="Last Name" />
                  </div>
                  <div className="form-group">
                    <input type="text" ref={userRef} value={username} onChange={(e) => setUsername(e.target.value)} className="form-control form-control-lg" id="email" placeholder="Email" />
                  </div> 
                  {/* <div className="form-group">
                    <select className="form-control form-control-lg" id="exampleFormControlSelect2">
                      <option>Country</option>
                      <option>United States of America</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Germany</option>
                      <option>Argentina</option>
                      <option>Kenya</option>
                      <option>Nigeria</option>
                      <option>South Africa</option>
                    </select>
                  </div> */}
                  <div className="form-group">
                    <input type="password" ref={passwordRef} value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" id="password" placeholder="Password" />
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                  <Link className="d-flex btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn justify-content-center" onClick={handleSubmit} to="/dashboard">SIGN UP</Link>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  // }
}

export default Register
