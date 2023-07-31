import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus } from "../services/authService";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

// CUSTOM HOOK
// This function is for redirecting every loggedOut user to specific page
// Forexample if you wanna access to dashboard and u are logged out , u will be redirect to login page
// If you are on dashboard and your session expires, u will be redirected to login page also

const useRedirectLoggedOutUser = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus(); // get status from backend
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("Session expired, please login to continue.");
        navigate(path); // passed root to this custom hook whereever you call it
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
