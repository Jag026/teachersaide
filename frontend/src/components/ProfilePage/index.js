import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfilePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

    const user = sessionUser;
    if (!user) {
      return <Redirect to="/login" />
    }

  return (
    <div>
        {sessionUser && <p>{sessionUser["username"]}</p>}
        <p>Cool</p>
    </div>
  );
}

export default ProfilePage;
