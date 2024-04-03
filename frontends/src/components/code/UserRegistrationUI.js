import React, { useState } from 'react';
import "./userRegistrationStyle.css";
import axios from 'axios';
import Alert from "@mui/material/Alert";

export default function UserRegistration() {

  const [fullname, setfullname] = useState("");
  const [username, setusername] = useState("");
  const [phone, setPhone] = useState("");
  const [type, settype] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const handleChange = (event) => {
    settype(event.target.value);
    setUrl(`http://localhost:3000/${event.target.value}/register`);
  };

  const handleRegister = async(event) => {
    setIsError(false)
    setIsSuccess(false)
    event.preventDefault();
    console.log("inside register")
    let data = {
      fullname: fullname,
      phone: phone,
      type: type,
      email: email,
      password: password,
      username: username
    };
    if(url !== ""){

      await axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          setMsg(res.data.message)
          setIsSuccess(true);
          console.log("resetdata")
          document.getElementById("create-course-form").reset();        
          setusername("");
          setpassword("")
          setfullname("")
          setPhone("")
          settype("")
          setemail("")
          // event.target.reset();
        })
        .catch((err) => {
          setIsError(true);
          setMsg(err.response.data);
        });
    } else {
      setIsError(true);
      setMsg("Enter required details")
    }
  }
  return (
    <>
      <div class="mainForm">
        <div class="container">
          {isError && !isSuccess &&<Alert severity="error">{msg}</Alert> }
          {isSuccess && !isError &&<Alert severity="success">{msg}</Alert> }
          <div class="title">New User Registration</div>
          <div class="content">
            <form id='create-course-form'>
              <div class="user-details">
                <div class="input-box">
                  <span class="details">Full Name</span>
                  <input type="text" placeholder="Enter the name of new User" required onChange={(e) => setfullname(e.target.value)}/>
                </div>
                <div class="input-box">
                  <span class="details">Username</span>
                  <input type="text" placeholder="Enter username" required onChange={(e) => setusername(e.target.value)}/>
                </div>
                <div class="input-box">
                  <span class="details">Email</span>
                  <input type="email" placeholder="Enter email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" onChange={(e) => setemail(e.target.value)} required/>
                </div>
                <div class="input-box">
                  <span class="details">Temp Password</span>
                  <input type="password" placeholder="Enter temporary password" required onChange={(e) => setpassword(e.target.value)}/>
                </div>
                <div class="input-box">
                  <span class="details">Phone Number</span>
                  <input type="text" placeholder="Enter your number" required onChange={(e) => setPhone(e.target.value)}/>
                </div>
                
              </div>
              <div class="emp-details">
                {/* <span class="gender-title">Select the User type:</span> */}
                <div class="category">
                  <label for="cars">Select the User type:</label>
                  <select name="cars" id="cars" onChange={handleChange}>
                    <option value="" selected>--Select--</option>
                    <option value="careerService">Career Services</option>
                    <option value="faculty">Faculty</option>
                    <option value="student">Student</option>
                    
                  </select>
                </div>
              </div>
              <div class="button">
                <input type="button" value="Register User" onClick={handleRegister}/>
              </div>
            </form>
          </div>
        </div>
      </div>





    </>
  )
}


