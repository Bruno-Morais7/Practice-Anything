import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/style.css";
import { useHistory } from "react-router-dom";
import validator from "validator";
import { BASE_URL } from "../store/flux";

export const LoginPage = ({ setToken, setIs_teacher, setEmaillogged }) => {
  const history = useHistory();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [id, setId] = useState();

  const validateEmail = (e) => {
    var email = e.target.value;
  };

  const onTypeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onTypePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitClicked = (e) => {
    e.preventDefault();

    if (!email.trim() || !validator.isEmail(email)) {
      alert("Enter valid Email");
      return;
      // setEmailError("Enter valid Email!");
    }

    if (
      !password.trim() ||
      !validator.isStrongPassword(password, {
        minLength: 8,
        maxLength: 16,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      alert("Enter valid password");
      return;
      // setEmailError("Enter valid Email!");
    }

    if (email && password) {
      // fetch
      onFetchLogIn(email, password);
    } else {
      //all
      alert("incorrect details ");
    }
  };

  const onFetchLogIn = (email, password) => {
    // fetch
    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
          "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      crossDomain: true,
      redirect: "follow",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const BASE_URL = process.env.BACKEND_URL;
    fetch(BASE_URL + "/api/login", post)
      .then((resp) => resp.json())
      .then((dataUsers) => {
        if (dataUsers?.access_token) {
          localStorage.setItem("token", dataUsers.access_token);
          localStorage.setItem("is_teacher", dataUsers.is_teacher);
          localStorage.setItem("email", dataUsers.email)
          localStorage.setItem("id", dataUsers.id)
          setToken(dataUsers.access_token);
          setIs_teacher(dataUsers.is_teacher);
          setEmaillogged(dataUsers.email);
          setId(dataUsers.id);
          // history.push("/landingpage");
          history.push("/profile");
        }
        else {
          window.alert("Wrong email or password");
          window.location.reload();
        };
        //   setStore({
        //     users: [...getStore().users, dataUsers],
        //   });
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-md-5 mx-auto ">
            <div id="first">
              <div className="myform bg-dark text-white my-5 p-5">
                <div className="logo">
                  <div className="col-md-12 text-center">
                    <h3>
                      <i className="fa fa-user fa-4x text-warning"></i>
                    </h3>
                    <h1>Login</h1>
                  </div>
                </div>
                <form>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="Email"
                      name="Email"
                      className="form-control"
                      id="Email"
                      aria-describedby="Email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={onTypeEmail}
                      required
                    />
                  </div>
                  <div className="form-group mt-1">
                    <label>Password</label>
                    <input
                      type={checked ? "Text" : "Password"}
                      name="Password"
                      id="Password"
                      className="form-control"
                      aria-describedby="Password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={onTypePassword}
                    />
                  </div>
                  <div className="form-group mt-1">
                    <input
                      type="checkbox"
                      onClick={() => setChecked(!checked)}
                    />
                    Show Password
                  </div>
                  <div className="col-md-12 text-center mt-3">
                    <button
                      type="submit"
                      className=" btn btn-block mybtn btn-warning tx-tfm"
                      onClick={onSubmitClicked}
                    >
                      Continue
                    </button>
                  </div>
                  <div className="col-md-12 ">
                    <div className="login-or">
                      <hr className="hr-or" />
                      <span className="span-or bg-dark">or</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <p className="text-center">
                      Don't have account?{" "}
                      <Link to="/SignupPage" className="text-warning">Sign up here</Link>
                    </p>
                  </div>
                  <div className="form-group">
                    <p className="text-center ">
                      <Link to="/ForgetPassword" className="text-warning">Forgot Password?</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
