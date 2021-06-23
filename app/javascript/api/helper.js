import { useState, useEffect } from "react"

export const useRestBeers = (latestUpdateDate) => {
  const [status, setStatus] = useState('loading');
  const [queryData, setQueryData] = useState([]);
  console.log(`Querying for latest data again at ${latestUpdateDate}...`)
  const getBeers = async () => {
    const url = "api/v1/beers/index"
    const data = await fetch(url)
    console.log(data)
    const x = await data.json()
    console.log(x)
    const results = x.map(beer => {
      return {
        key: beer.id,
        id: beer.id,
        brand: beer.brand,
        style: beer.style,
        country: beer.country,
        quantity: beer.quantity
      }
    })
    setQueryData(results)
    setStatus('fetched')
  }
  
  useEffect(() => {
    getBeers()
  }, [latestUpdateDate])
  return { status, data: queryData }
}

export const createBeer = async ({
  brand, style, country, quantity
}) => {
  const url = "api/v1/beers/create"
  const beer = {
    brand, style, country, quantity
  }
  const status = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(beer)
  })
  console.log(status)
  return status
}

export const deleteBeer = async (id) => {
  const url = `api/v1/beers/${id}`
  try {
    console.log('Attempting delete...')
    const status = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(status)
    return status
  } catch (e) {
    throw e
  }
}