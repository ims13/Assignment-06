import React from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../../store';
import ArtworkCard from '../../components/ArtworkCard';

const Favorites = ()=>{
  const [favouritesList] = useAtom(favouritesAtom);

return (
    <Container>
     <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
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
          )
         }

        </Row>

    </Container>

);

// Important Note: Pagination is not required for this component
}

export default Favorites;



