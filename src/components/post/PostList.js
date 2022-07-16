import React, { useEffect, useState} from "react";
import { deletePost, getPosts } from "./PostManager.js";
import { useHistory, Link } from "react-router-dom";
import { VscTrash, VscEdit } from "react-icons/vsc";
import "../styles/post.css"

export const PostList = () => {
    const [ posts, setPosts ] = useState([])
    const history = useHistory();

    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])
    const handleMethod= (method,id) => {
        if (method === 'delete') {
          console.log("delete")
          deletePost(id)
          .then(() => getPosts().then(setPosts));
        }
      };

    return (
        <article className="posts">
            <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/posts/new"})
                        }}
                        >Create New Post</button>
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="card">
                        <div className="post_title">{post.title}</div>
                        <div className="post_date">{post.publication_date}</div>
                        <img className="post_image" src={post.image_url}></img>
                        <div className="post_content">{post.content}</div>
                        <div className="post_category">{post.category.label}</div>
                        <div className="post_user">{post.user.user.first_name} {post.user.user.last_name}</div>
                        <VscTrash onClick={() => handleMethod('delete',post.id)}/>
                        <Link to={`/postedit/${post.id}`} ><VscEdit/ > </Link>

                    </section>
                })
            }
        </article>
    )


}