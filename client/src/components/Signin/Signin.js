import React, { useState, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import "./Signin.css";

const Signin = () => {
  const {
    signIn,
    state: { errorMessage },
  } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container center">
      <main className="main-padding">
        <fieldset>
          <legend className="container-legend">Sign In</legend>
          <div className="field-mt">
            <label className="field-lbl" htmlFor="email-address">
              Email
            </label>
            <input
              className="field-input"
              type="email"
              name="email-address"
              id="email-address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field-mb">
            <label className="field-lbl" htmlFor="password">
              Password
            </label>
            <input
              className="field-input"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </fieldset>
        <div>
          <input
            onClick={() => signIn({ email, password })}
            className="auth-button"
            type="submit"
            value="Sign in"
          />
        </div>
        {errorMessage ? (
          <div style={{ marginTop: "5px", fontSize: "20px" }}>
            {errorMessage}
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Signin;
