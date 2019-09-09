import React, { useState } from "react";
import { Button } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0 } from "../react-auth0-spa";
import logo from "../assets/logo.svg";

const Hero = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [greeting, setGreeting] = useState("Welcome");
  const { getTokenSilently, user, isAuthenticated } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getTokenSilently();
    

      const response = await fetch(`/api/greeting?name=${user.nickname}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
      setGreeting(responseData.greeting);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-center hero my-5">
        <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
        <h1 className="mb-4">{greeting}</h1>

        <p className="lead">
        {isAuthenticated && (
        <Button color="primary" className="mt-5" onClick={callApi}>
          Ping API
        </Button>
        )}
      </p>
      </div>
      <div className="result-block-container">
        <div className={`result-block ${showResult && "show"}`}>
          <h6 className="muted">Result</h6>
          <Highlight>{JSON.stringify(apiMessage, null, 2)}</Highlight>
        </div>
      </div>
    </>
  );
};

export default Hero;
