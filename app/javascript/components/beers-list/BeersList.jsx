import React, { useState } from "react";
import { useRestBeers, createBeer, deleteBeer } from "../../api/helper"

const BeersList = () => {
  const [latestUpdate, setLatestUpdate] = useState(new Date())
  const { status, data: beers } = useRestBeers(latestUpdate)
  if (status === 'loading') {
    return <p>Loading</p>
  }
  if (status === 'error') {
    return <p>Error</p>
  }

  const addNewBeer = async () => {
    const beer = {
      brand: "Heiniken", style: "hops", country: "Deutschland", quantity: 80
    }
    await createBeer(beer)
    setLatestUpdate(new Date())
  }

  const removeBeer = (id) => async () => {
    console.log("Remove")
    await deleteBeer(id)
    setLatestUpdate(new Date())
  }

  return <div>{beers.map(beer => (
    <div key={beer.id}>
      <p>{JSON.stringify(beer)}</p>
      <button onClick={removeBeer(beer.id)}>Delete</button>
    </div>
  ))}
  <br></br>
  <button onClick={addNewBeer}>Create Beer</button></div>
}

export default BeersList