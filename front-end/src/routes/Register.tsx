import "./Register.css"
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mutations } from "../mutations";
import { useMutation } from "@apollo/client";

function Register() {
    const { setAuthTokens } = useContext(AuthContext);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [register] = useMutation(Mutations.REGISTER, {
        variables: {
            input: {
                username: username,
                password: password,
                confirmPassword: confirmPassword
            }
        },
        onCompleted: async ({ register }) => {
            localStorage.setItem("authToken", register.authToken);
            setAuthTokens(register.authToken);
            console.log('registered successfully');
            navigate(from, { replace: true });
        },
        onError: (err) => {
            console.log("err: " + err.graphQLErrors[0].extensions)
            alert("Failed to register " + err.message);
        }
    });

    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (username.length > 0) {
            register({variables: {
                input: {
                    username,
                    password,
                    confirmPassword
                }
            }});
        }
    };

    return (
        <div className="register-box">
            <h2> Register </h2>
            <form onSubmit={handleSubmit}>

                <div className="user-box">
                    <div style={{ height: "10px" }} />
                    <input type="text" id="username" onChange={e => setUsername(e.target.value)} required={true}></input>
                    <label>Username</label>
                </div>

                <div className="user-box">
                    <div style={{ height: "10px" }} />
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} required={true}></input>
                    <label>Password</label>
                </div>
                <div className="user-box">
                    <div style={{ height: "10px" }} />
                    <input type="password" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} required={true}></input>
                    <label>Confirm Password</label>
                </div>
                    <div id="login">
                        Already have account ?
                        <a href="/login"> Login</a>
                    </div>
                <div className="button-form">
                    <button id="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Register;