// pages/artwork/index.js

import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';

import useSWR from 'swr';
import Error from 'next/error';

import ArtworkCard from '../../../components/ArtworkCard';


const PER_PAGE = 12;

const Artwork = () => {

  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
 



  //Declare two functions: previousPage() and nextPage() with logic either decrease or increase the page value
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  };

  // Make use of the "useEffect" hook such that data value (from SWR) 
  useEffect(() => {
    // declare a result array If data is not null / undefined, 
    const results = [];
    if (data && data.objectIDs) {
      for (let i = 0; i < data.objectIDs.length; i += PER_PAGE) {
        const chunk = data.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      
    }
    setArtworkList(results);
      //set the page value in the state to 1
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  // If the "artworkList' state value is null / undefined, 
  if (!artworkList) {
    return null;
  }

  return (
    <>
      {artworkList.length > 0 ? (
        <Row className="gy-4">
          {artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Artwork;





