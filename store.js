import {atom} from 'jotai';                   // Using Jotai to create a "favouritesAtom" 

// remove default value (empty array) for the favouritesAtom and for the searchHistoryAtom 
export const favouritesAtom = atom([]);
export const searchHistoryAtom = atom([]);
