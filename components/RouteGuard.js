import { isAuthenticated } from '../lib/authenticate';
import { useRouter } from 'next/router';

import {useState, useEffect} from 'react';
import { useAtom } from "jotai";

import { searchHistoryAtom, favouritesAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";




const PUBLIC_PATHS = ['/login','/register', '/', '/_error'];

export default function RouteGuard(props) {
  const [authorized, setAuthorized] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favourites, setFavourites] = useAtom(favouritesAtom);

 // the  "asynchronous" (async) function "updateAtoms()" 
 async function updateAtoms() {
    try {
      setFavourites(await getFavourites());
      setSearchHistory(await getHistory());
    } catch (error) {
      // Handle the error here (e.g., show an error message or redirect)
      console.error('Error updating atoms:', error);
    }

}

  const router = useRouter();

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push('/login');

    } 
    else {
      setAuthorized(true);
    }
  }

  useEffect(()=>{
    updateAtoms();

    authCheck(router.pathname);

    router.events.on('routeChangeComplete', authCheck);
    
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);  

  return <>{authorized && props.children}</>
}