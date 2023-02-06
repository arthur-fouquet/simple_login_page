import "./Login.css"
import { useContext, useState } from "react";
import AuthContext from "./../context/AuthContext";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Mutations } from "../mutations";

function Login() {
    const { setAuthTokens } = useContext(AuthContext);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [login] = useMutation(Mutations.LOGIN, {
        variables: {
            input: {
                username: username,
                password: password,
            }
        },
        onCompleted: ({ login }) => {
            setAuthTokens(login.authToken);
            localStorage.setItem("authToken", login.authToken);
            console.log('logged in successfully ');
            navigate(from, { replace: true });
        },
        onError: (err) => {
            console.log("err: ", err.graphQLErrors[0].extensions)
            alert("Failed to login: " + err.message);
        }
    });

    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (username.length > 0) {
            login({variables: {
                input: {
                    username,
                    password
                }
            }});
        }
    };

    return (
        <div className="login-box">
            <h2> Login </h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <div style={{ height: "10px" }} />
                    <input type="text" id="username" onChange={e => setUsername(e.target.value)} required={true}></input>
                    <label>username</label>
                </div>
                <div className="user-box">
                    <div style={{ height: "10px" }} />
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} required={true}></input>
                    <label>Password</label>
                </div>
                    <div id="register">
                        Don't have account ?
                        <a href="/register"> Register</a>
                    </div>
                <div className="button-form">
                    <button id="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Login;