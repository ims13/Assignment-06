import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

const MainNav = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <>
      <Navbar 
      className="fixed-top navbar-dark bg-primary" expand="lg"
      >
        <Container>
          <Navbar.Brand>Idriss Lufungula</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => router.push('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => router.push('/search')}>Advanced Search</Nav.Link>
            </Nav>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
};
export default dynamic(() => Promise.resolve(MainNav), { ssr: false });
