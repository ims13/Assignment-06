import { isAuthenticated } from '../lib/authenticate';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import { useAtom } from "jotai";
import { searchHistoryAtom, favouritesAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";

const PUBLIC_PATHS = ['/login','/register', '/', '/_error'];

export default function RouteGuard(props) {
  const [authorized, setAuthorized] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const router = useRouter();

  const updateAtoms = useCallback(async () => {
    try {
        setFavourites(await getFavourites());
        setSearchHistory(await getHistory());
    } catch (error) {
        console.error('Error updating atoms:', error);
    }
  }, [setFavourites, setSearchHistory]);

  const authCheck = useCallback((url) => {
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push('/login');
    } else {
        setAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    updateAtoms();
    authCheck(router.pathname);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
        router.events.off('routeChangeComplete', authCheck);
    };
  }, [router, authCheck, updateAtoms]);

  return <>{authorized && props.children}</>;
}
