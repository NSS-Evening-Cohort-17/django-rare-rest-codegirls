import React, { useEffect, useState} from "react";
import { getPosts } from "./PostManager.js";
import { useHistory } from "react-router-dom";

export const PostList = () => {
    const [ posts, setPosts ] = useState([])
    const history = useHistory();

    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])

    return (
        <article className="posts">
            <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/posts/new"})
                        }}
                        >Create New Post</button>
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="post">
                        <div className="post_title">{post.title}</div>
                        <div className="post_date">{post.publication_date}</div>
                        <img className="post_image" src={post.image_url}></img>
                        <div className="post_content">{post.content}</div>
                        <div className="post_category">{post.category}</div>
                        <div className="post_user">{post.user}</div>
                    </section>
                })
            }
        </article>
    )


}