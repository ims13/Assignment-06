
// import React from 'react';
/*********************************************************************************
*  WEB422 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: __Idriss Lufungula____ Student ID: __1518 38208___ Date: ___21 july 2023___
*  Netlify Link: on mail please ma'am
*
********************************************************************************/ 

import { Row, Col, Image } from 'react-bootstrap';

const Home = () => {
  return (
    <>
    <br />
    <br />
      <Row>
      <br />
      <br />
        <Col md={6}>
       
          <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt="" fluid rounded />

        </Col>
        <Col md={6}>
        <br />
        <br />
          <p>
            The Metropolitan Museum of Art, colloquially known as the Met, is located in New York City and is the largest art museum in the United States. It is one of the most-visited art museums in the world, with a collection spanning over 5,000 years of art from around the globe.
          </p>
          <p>
          <br />
          <br />
            For more information, visit the <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia entry</a>.
          </p>
        </Col>
      </Row>
    </>
  );
};

export default Home;
