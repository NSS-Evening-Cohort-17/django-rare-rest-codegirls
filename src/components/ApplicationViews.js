import React from "react"
import { Route } from "react-router-dom"
import { CategoryForm } from "./category/CategoryForm"
import { CategoryList } from "./category/CategoryList"

export const ApplicationViews = () => {
  return (
    <>
    <h1 >Welcome to Rare Publishing</h1>
      <Route exact path="/categories"><CategoryList /></Route>
      <Route exact path="/categorynew"><CategoryForm /></Route>
      <Route exact path="/categoryedit/:id"><CategoryForm/></Route>
    </>
  )
}
