import React from 'react';

import { useAtom } from "jotai";
import { searchHistoryAtom } from "../../store";

import { useRouter } from "next/router";
import styles from '../styles/History.module.css';
import { ListGroup, Card, Button } from "react-bootstrap";


const History = () =>{
    const router = useRouter();

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
});

const historyClicked = (e, index) =>{
    router.push(`/artwork?${searchHistory[index]}`)

}

const removeHistoryClicked = (e, index) =>{

    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(current => {
        let x = [...current];
        x.splice(index, 1)
        return x;
});
}

return (

     <>
      {parsedHistory.length > 0 ? (
        <ListGroup variant="flush">
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item 
              key={index} 
              className={styles.historyListItem} 
              onClick={e => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map(key => (
                <React.Fragment key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </React.Fragment>
              ))}
              <Button 
                className="float-end" 
                variant="danger" 
                size="sm" 
                onClick={e => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body>
            Nothing Here. Try searching for some artwork.
          </Card.Body>
        </Card>
      )}
    </>
);

}

export default History;

