import { useState } from "react"
import { checkLogin } from "../api"
import { useHistory } from "react-router-dom"
// import { useSelector } from 'react-redux'
// import { updateUserName } from '../app/userSlice'
// import { store } from "../app/store"
export default function Login () {
   const history = useHistory()
  //  const userName = useSelector(selectUserName)
  //  const dispatch = useDispatch()

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [isError, setIsError] = useState(false)

    async function checkLoginDone(email, password) {
      try {
        const res = await checkLogin(email, password);
        if (res.status === 200) {
          history.push("/");
          // store.dispatch(updateUserName(email))
        } else {
          setIsError(true);
        }
      } catch (err) {
        alert("co loi");
      }
    }
    return (
    <div className="login-container">
          <div className="login-title">Login</div>
          {isError && (<div className="login-title-error">Incorrect Password or Email</div>)}
          <div className="login-input-group">
            <label htmlFor="login-name">Email</label>
            <input onChange={(event) => setLoginEmail(event.target.value)} id="login-name"></input>
            <label htmlFor="login-password">Password</label>
            <input onChange={(event) => setLoginPassword(event.target.value)} id="login-password"></input>
          </div>
          <button className="login-btn" onClick={() => checkLoginDone(loginEmail, loginPassword)}>Login</button>
        </div>
    )
}