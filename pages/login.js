import { Card, Form, Alert, Button } from "react-bootstrap";

import { useState } from 'react';

import { getFavourites, getHistory } from "../../lib/userData";
import {authenticateUser} from "../../lib/authenticate";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { searchHistoryAtom } from "../../store";
import { favouritesAtom } from "../../store";




export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");    // Adding a "warning" string in the "state" 
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // Updating "handleSubmit" to use "authenticateUser" and update "warning" if it fails 
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();
      router.push("/favourites");    // redirect to "/favourites" 
    } catch (err) {
      setWarning(err.message);
    }
  }

  // asynchronous (async) function 
  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }


  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
          {/* // form fields to synchronize with the "state" values */}
      <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* "Alert" Component and conditionally showing the warning message */}
        {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
        <br />
        <Button variant="dark" className="pull-right" type="submit">
            Login
        </Button>
      </Form>
    </>
  );
}