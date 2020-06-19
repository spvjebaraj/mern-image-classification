import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import Particles from "react-particles-js";

import Navigation from "../components/Navigation/Navigation";
import InputForm from "../components/InputForm/InputForm";
import Signin from "../components/Signin/Signin";
import Signup from "../components/Signup/Signup";

import "../App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const Routes = () => {
  const [route, setRoute] = useState("");
  const {
    state: { isAuthenticated, userToken },
    restoreToken,
    signOut,
  } = useContext(AuthContext);

  const onRouteChange = (route) => {
    if (route === "home") {
      setRoute(route);
    } else if (route === "signin") {
      setRoute(route);
    } else if (route === "signup") {
      setRoute(route);
    } else if (route === "signout") {
      signOut();
    }
  };

  // const initFetch = useCallback(() => {
  //   let userToken;

  //   try {
  //     userToken = window.sessionStorage.getItem("userToken");
  //     restoreToken(userToken);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  useEffect(() => {
    const bootstrapAsync = () => {
      try {
        const userToken = window.sessionStorage.getItem("userToken");
        restoreToken(userToken);
      } catch (e) {
        console.log(e);
      }
    };

    bootstrapAsync();
    //initFetch();
  }, []);

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation
        userToken={userToken}
        isAuthenticated={isAuthenticated}
        onRouteChange={onRouteChange}
      />
      {userToken !== null ? (
        <InputForm />
      ) : route === "signin" ? (
        <Signin />
      ) : (
        <Signup />
      )}
    </div>
  );
};

export default Routes;
