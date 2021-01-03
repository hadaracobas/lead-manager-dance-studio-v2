import React from "react";
import "./index.scss";
import { useAuth0 } from "@auth0/auth0-react";

function LogoutBtn() {
  const { logout } = useAuth0();
  return (
    <button onClick={() => logout()} type="button">
      התנתק
    </button>
  );
}

export default LogoutBtn;
