import React, { useState } from "react";
import { Button } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0 } from "../react-auth0-spa";
import logo from "../assets/logo.svg";

const Hero = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [greeting, setGreeting] = useState("Welcome");
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("0");
  const { getTokenSilently, user, isAuthenticated } = useAuth0();

  const getBalance = async () => {
    try {
      const token = await getTokenSilently();
    

      const response = await fetch(`/api/balance`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
      setBalance(responseData.balance);
    } catch (error) {
      console.error(error);
    }
  };

  function getRandomAmount() {
    return (Math.random() * 10).toFixed(2);
  };

  const callCredit = async () => {
    try {
      const token = await getTokenSilently();
    

      const response = await fetch(`/api/credit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          'Amount': getRandomAmount()
        })
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
      setAmount(responseData.amount);
    } catch (error) {
      console.error(error);
    }
  };

  const callDebit = async () => {
    try {
      const token = await getTokenSilently();
    

      const response = await fetch(`/api/debit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          'Amount': getRandomAmount()
        })
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
      setAmount(responseData.amount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-center hero my-5">
        <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
        <h1 className="mb-4">{greeting}</h1>
        <h2 className="mb-4">Balance: {balance}</h2>
        <h2 className="mb-4">Credit/debit: {amount}</h2>

        <p className="lead">
        {isAuthenticated && (
        <>
        <Button color="primary" className="mt-5" onClick={getBalance}>
          Get balance
        </Button>
        <Button className="mt-5" onClick={callCredit}>
          Credit
        </Button>
        <Button className="mt-5" onClick={callDebit}>
          Debit
        </Button>
        </>
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
