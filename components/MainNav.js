import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

import { addToHistory } from "../lib/userData";
import { removeToken, readToken } from "../lib/authenticate";



const MainNav = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);   // isExpanded state to control the expanded/collapsed state of the Navbar 
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);  // get a reference to the "searchHistory" from the "searchHistoryAtom"

  const handleSearchSubmit =  async (e) => {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
    setIsExpanded(false); // When the user searches for art (ie: when the form is submitted), 
                           // set the "isExpanded" value in the state to false

    const queryString = `title=true&q=${searchField}`;
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
  };


  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleNavbarToogle = (e) => {
    setIsExpanded(!isExpanded)
  }

  //	Ensure that every <Nav.Link> element will set the "isExpanded" value to false
  // when clicked will also handles the navigation to the specified 'href'.
  const handleNavLinkClick = (e) => {
    // e.preventDefault();
    // router.push(e.target.getAttribute('href'));
    setIsExpanded(false)
  }

  // Store the current value of the token
  let token = readToken();
  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  // Implement a "logout" function that removes the token and redirects the user back to "/":
  function logout() {
    setIsExpanded(false);     // "expanded" state value to false (in order to collapse the menu)
    removeToken();            // "removeToken()" function from the "authenticate" lib 
    router.push("/login");   // hook (router.push()) to redirect the user to the "/login" page
  }

  const submitForm = async (e) => {
    e.preventDefault();
    setIsExpanded(false);
    router.push(`/artwork?title=true&q=${searchField}`);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
  };
 
  return (
    <>
      <Navbar 
      className="fixed-top navbar-dark bg-primary" 
      expand="lg"
      expanded={isExpanded}      // Add an "expanded" property to the <Navbar> component with the value "isExpanded", 
      onToggle={handleNavbarToogle}
      >
        <Container>
          <Navbar.Brand>Idriss Lufungula</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <Nav.Link onClick={ handleNavLinkClick } href='/' active={router.pathname === "/"}>Home</Nav.Link>
              {/* <Nav.Link onClick={ handleNavLinkClick } href='/search' active={router.pathname === "/search"}>Advanced Search</Nav.Link> */}
              {token && <Link href="/search" passHref legacyBehavior>
                <Nav.Link           
                  onClick={(e) =>
                    isExpanded ? setIsExpanded((value) => !value) : null
                  }

                  active={router.pathname === "/search"}
                >
                  Advanced Search
                </Nav.Link>
              </Link>}

            </Nav>
            &nbsp;
            {token && <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)} />
              <Button variant="success" type="submit">
                Search
              </Button>
            </Form>}
            &nbsp;
            {token ? 
            <Nav>
              {/* •	Update the text "User Name" to show the userName value from the token */}
             <NavDropdown title={token.userName} id="basic-nav-dropdown">   
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={(e) => isExpanded ? setIsExpanded((value) => !value) : null} > 
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={(e) =>
                      isExpanded ? setIsExpanded((value) => !value) : null
                    } > Search History
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Item
                  onClick={logout}> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            :
            <Nav className="ms-auto">
              <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={(e) => isExpanded ? setIsExpanded((value) => !value) : null }
                    active={router.pathname === "/register"}
                  > Register
                  </Nav.Link>
              </Link>

              <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={(e) => isExpanded ? setIsExpanded((value) => !value) : null }
                    active={router.pathname === "/login"}
                  > Login </Nav.Link>
              </Link>

            </Nav>
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
};
export default dynamic(() => Promise.resolve(MainNav), { ssr: false });
