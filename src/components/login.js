export default function Login ({ setLoginPage }) {
    return (
    <div className="login-container">
          <div className="login-title">Login</div>
          <div className="login-input-group">
            <label htmlFor="login-name">Name</label>
            <input id="login-name"></input>
            <label htmlfor="login-password">Password</label>
            <input id="login-password"></input>
          </div>
          <button className="login-btn" onClick={() => setLoginPage(false)}>Login</button>
        </div>
    )
}