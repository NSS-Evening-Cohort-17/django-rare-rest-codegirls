import React from "react"
import { Route } from "react-router-dom"

import { Rare } from "./Rare"
import { CategoryForm } from "./category/CategoryForm"
import { CategoryList } from "./category/CategoryList"
import { PostList } from "./post/PostList"
import { PostForm } from "./post/PostForm"
import { UserList } from "./user/UserList"

export const ApplicationViews = () => {
  return (
    <>
    <Route exact path="/" element={<Rare />} />
    <h1 >Welcome to Rare Publishing</h1>
      <Route exact path="/categories"><CategoryList /></Route>
      <Route exact path="/categorynew"><CategoryForm /></Route>
      <Route exact path="/categoryedit/:id"><CategoryForm/></Route>

      <Route exact path="/posts"><PostList /></Route>
      <Route exact path="/posts/new"><PostForm /></Route>
      <Route exact path="/postedit/:id"><PostForm/></Route>

      <Route exact path="/users"><UserList/></Route>
    </>
  )
}
