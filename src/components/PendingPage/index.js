import React from "react";
import "./index.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

function PendingPage() {
  // get logout from auth0
  const { logout } = useAuth0();
  return (
    <div className="pending-page">
      <h2 className="pending-page__title">לא נמצא בסיס נתונים פנוי</h2>
      <p>אנא צור איתנו קשר ונעלה עבורך בסיס נתונים במספר דקות.</p>
      <p className="pending-page__emailP">acobas.hadar@gmail.com</p>

      <Button onClick={() => logout()} variant="contained" color="secondary">
        התנתק לבנתיים
      </Button>
    </div>
  );
}

export default PendingPage;
