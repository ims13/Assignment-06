import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

import useSWR  from 'swr';
import Error from 'next/error';

import {useAtom} from 'jotai'
import {favouritesAtom} from '../store'
import { addToFavourites, removeFromFavourites } from "../lib/userData";

const ArtworkCardDetail = ({ objectID }) => {
  const { data, error } = useSWR( objectID ?
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );
  // Conditional Fetching:	const { data, error } = useSWR(objectID ? `someUrl/${objectID}` : null);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectID)); 
  }, [favouritesList]);


  async function handleFavouritesClick() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(props.objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(props.objectID));
      setShowAdded(true);
    }
  }
  

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    creditLine,
    dimensions,
    artistWikidata_URL,
  } = data;

  const imageSrc = primaryImage;
  const artworkTitle = title || 'N/A';
  const artworkDate = objectDate || 'N/A';
  const artworkClassification = classification || 'N/A';
  const artworkMedium = medium || 'N/A';
  const artistName = artistDisplayName || 'N/A';
  const artworkCreditLine = creditLine || 'N/A';
  const artworkDimensions = dimensions || 'N/A';

  return (
    <Card style={{ width: '18rem' }}>
      {imageSrc && <Card.Img variant="top" src={imageSrc} />}
      <Card.Body>
        <Card.Title>{artworkTitle}</Card.Title>

        <Card.Text>
          <strong>Date:</strong> {artworkDate}<br />
          <strong>Classification:</strong> {artworkClassification}<br />
          <strong>Medium:</strong> {artworkMedium}<br />
           <br />
                {artistDisplayName && artistWikidata_URL && (
                  <>
                    <strong>Artist:</strong> {artistName}<br />
                    <strong>Wikidata:</strong>{' '}
                    <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                      wiki
                    </a>
                    <br />
                  </>
            )}
          <strong>Credit Line:</strong> {artworkCreditLine}<br />
          <strong>Dimensions:</strong> {artworkDimensions}<br />
          <Button
            variant = {showAdded ? 'primary' : 'outline-primary'}
            onClick={handleFavouritesClick}   
            >
              {showAdded ? '+ Favourite (added)' : '+ Favourite' }
            </Button>
            
        </Card.Text>

      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;