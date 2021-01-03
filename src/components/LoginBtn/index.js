import React from "react";
import "./index.scss";
import { useAuth0 } from "@auth0/auth0-react";

function LoginBtn() {
  const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()} type="button">
      התחבר עכשיו
    </button>
  );
}

export default LoginBtn;
