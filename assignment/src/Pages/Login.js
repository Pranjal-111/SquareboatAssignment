import { Formik, Field, Form } from "formik";
// import { useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import React from 'react';
import "./login.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../component/HeaderC/Header";

function Login() {
  let history = useHistory();
  async function PostData(event) {
    console.log(event)
    // debugger;
    let result = await fetch(
      "https://jobs-api.squareboat.info/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": event["email"],
          "password": event["password"]
        }),
      }
    );
    result = await result.json();
    console.log(result.message);
    if (result.success == false) {
      toast.error("Wrong email or password", { className: 'toast-error' });
    }
    localStorage.setItem("token", result.data["token"]);
    // setToken(result.data["token"]);
    history.push("/postedjob");
  }
  function changeborder() {
    document.getElementById("t").style.borderColor = "#43AFFF";
  }
  return (
    <>
      <Header />
      <div>
        <div className="loginContainer">
        </div>
        <div style={{ height: "424px", backgroundColor: "#EDF6FF" }}>
        </div>
        <div className="card">
          <div className="heading">
            <h1 style={{ fontSize: "27px" }}>Login</h1>
          </div>

          <Formik
            initialValues={{ name: "", email: "" }}
            onSubmit={(values) => {
              PostData(values)
            }}
          >
            <Form>
              <div className="input">
                <label >Email address</label><br></br>
                <Field id="t" className="field" name="email" type="email" placeholder="Enter your email " onClick={changeborder} />
              </div>
              <div style={{ marginTop: "15px" }} className="input">
                <label>Password</label>
                <Field id="t" className="field" name="password" type="password" placeholder="Enter your password" onFocus={changeborder} />
              </div>
              <div >
                <button className="button" type="submit">Login</button>
              </div>
            </Form>
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Login;
