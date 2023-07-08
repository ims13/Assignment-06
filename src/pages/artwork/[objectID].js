// pages/artwork/[objectID].js

import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import { Card } from 'react-bootstrap';

function ArtworkDetail() {
  const router = useRouter();
  const { objectID } = router.query;

  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  if (error) return <Error statusCode={500} />;
  if (!data) return <div>Loading...</div>;

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium
  } = data;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={primaryImage} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate}<br />
          <strong>Classification:</strong> {classification}<br />
          <strong>Medium:</strong> {medium}<br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ArtworkDetail;
