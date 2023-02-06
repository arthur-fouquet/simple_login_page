import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Navbar() {
    let { authTokens, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="container">
                <h3 className="logo">Logo</h3>

                <ul className="nav-links">
                    <Link to={"/"}><li>Home</li></Link>
                    <div>
                        {!authTokens ?
                        <div className="align">

                        <Link to={"/login"}><li>Login</li></Link>
                        <Link to={"/register"}><li>Resgister</li></Link>
                        </div> :
                        <div className="btn">
                            <a href="/" onClick={() => logout()}> Logout </a>
                        </div>
                    }
                    </div>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar