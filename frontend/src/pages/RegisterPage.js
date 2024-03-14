import {useState} from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
// import "../Background.css"
export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }
  return (
    <div className="login-page">
      <div className="login-page-background"></div>
      <div className="form-container">
        <form className="register" onSubmit={register}>
          <h1>Register</h1>
          <input type="text"
                  placeholder="Username"
                  value={username}
                  onChange={ev => setUsername(ev.target.value)}/>
          <div className="password-input-container" style={{ position: "relative" }}>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Create password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <span 
                        className="toggle-password custom-span-style"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
          </div>
          {/* <div className="password-input-container" style={{ position: "relative" }}>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Confirm password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <span
                        className="toggle-password custom-span-style"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
          </div> */}
          <button className="custom-button">Register</button>
          <p>Already have an account? <Link to="/Login">Login</Link></p>
          <div className="alternative-login-options">
                    <p>Or</p>
                    <button className="facebook-custom"><FaFacebook /></button>
                    <button className="google-custom"><FaGoogle /></button>
          </div>
        </form>
      </div>
    </div>
    
  );
}
