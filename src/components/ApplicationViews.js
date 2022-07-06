import React from "react"
import { Route } from "react-router-dom"
import { Rare } from "./Rare"

export const ApplicationViews = () => {
  return (
    <>
    <Route exact path="/" element={<Rare />} />
    </>
  )
}
