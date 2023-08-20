

import {getToken} from "../lib/authenticate";
 

// 	addToFavourites(id) -  PUT request to /favourites/id
export async function addToFavourites(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,{
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  const data = await res.json();

  // successful operation data, else []
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

// 	removeFromFavourites(id) – DELETE request to /favourites/id
export async function removeFromFavourites(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,{
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  const data = await res.json();
// successful operation data, else []
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

//	getFavourites() – GET request to /favourites
export async function getFavourites() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();
// successful operation data, else []
  if (res.status === 200) {
    console.log(data);
    return data;
  } else {
    return [];
  }
}

// addToHistory(id) – PUT request to /history/id
export async function addToHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();
// successful operation data, else []
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

//	removeFromHistory(id) – DELETE request to /history/id
export async function removeFromHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();
// successful operation data, else []
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

//	getHistory() – GET request to /history
export async function getHistory() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();
 // successful operation data, else []
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}