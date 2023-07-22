import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

const MainNav = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);   // isExpanded state to control the expanded/collapsed state of the Navbar 
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);  // get a reference to the "searchHistory" from the "searchHistoryAtom"

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
    setIsExpanded(false); // When the user searches for art (ie: when the form is submitted), 
                           // set the "isExpanded" value in the state to false

    const queryString = `title=true&q=${searchField}`;
    setSearchHistory(current => [...current, queryString]);                       
   
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
              <Nav.Link onClick={ handleNavLinkClick } href='/search' active={router.pathname === "/search"}>Advanced Search</Nav.Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2"
                value={searchField}
                onChange={handleSearchChange}
              />
              <Button type="submit" variant="outline-light">
                Search
              </Button>
            </Form>
            &nbsp;
            <Nav>
              <NavDropdown title="User Name" id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick={handleNavLinkClick} active={router.pathname === "/favourites"}>
                    <Link href="/favourites">
                      Favourites
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={handleNavLinkClick} active={router.pathname === "/history"}>
                    <Link href="/history">
                      Search History
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
};
export default dynamic(() => Promise.resolve(MainNav), { ssr: false });
