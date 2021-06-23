import { useState, useEffect } from "react";

const getCsrfTokenFromMetaTag = () => {
  return document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
};

const standardHeaders = {
  "Content-Type": "application/json",
  "X-CSRF-TOKEN": getCsrfTokenFromMetaTag(),
};

export const useRestBeers = (latestUpdateDate) => {
  const [status, setStatus] = useState("loading");
  const [queryData, setQueryData] = useState([]);
  const getBeers = async () => {
    console.log(`Querying for latest data again at ${latestUpdateDate}...`);
    const url = "api/v1/beers/index";
    const data = await fetch(url);
    console.log(data);
    const x = await data.json();
    console.log(x);
    const results = x.map((beer) => {
      return {
        key: beer.id,
        id: beer.id,
        brand: beer.brand,
        style: beer.style,
        country: beer.country,
        quantity: beer.quantity,
      };
    });
    setQueryData(results);
    setStatus("fetched");
  };

  useEffect(() => {
    getBeers();
  }, [latestUpdateDate]);
  return { status, data: queryData };
};

export const createBeer = async ({ brand, style, country, quantity }) => {
  const url = "api/v1/beers/create";
  const beer = {
    brand,
    style,
    country,
    quantity,
  };
  try {
    const status = await fetch(url, {
      method: "POST",
      headers: standardHeaders,
      body: JSON.stringify(beer),
    });
    const x = await status.json();
    console.log(x);
    return x;
  } catch (e) {
    throw e;
  }
};

export const deleteBeer = async (id) => {
  const url = `api/v1/beers/${id}`;
  try {
    console.log("Attempting delete...");
    const status = await fetch(url, {
      method: "DELETE",
      headers: standardHeaders,
    });
    console.log(status);
    return status;
  } catch (e) {
    throw e;
  }
};
