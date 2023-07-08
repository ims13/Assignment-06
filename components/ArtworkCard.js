import React from 'react';
import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Error from 'next/error';
import Link from 'next/link';

export default function ArtworkCard ({ objectID }) {
  const router = useRouter();

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImageSmall,
    title,
    objectDate,
    classification,
    medium,
    objectID: artworkObjectID,
  } = data;

  const imageSrc = primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
  const artworkTitle = title || 'N/A';
  const artworkDate = objectDate || 'N/A';

  const artworkClassification = classification || 'N/A';
  const artworkMedium = medium || 'N/A';

  const handleViewArtwork = () => {
    router.push(`/artwork/${artworkObjectID}`);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageSrc} alt="Artwork" style={{height: '250px', objectFit: 'cover'}} />

      <Card.Body>
        <Card.Title>{artworkTitle}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {artworkDate}<br />
          <strong>Classification:</strong> {artworkClassification}<br />
          <strong>Medium:</strong> {artworkMedium}<br />
        </Card.Text>

        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">
            View Artwork ({objectID})
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};


