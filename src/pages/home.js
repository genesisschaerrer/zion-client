import React, {useEffect, useContext}from "react"
import { useQuery } from "@apollo/client"
import {Link, Redirect} from "react-router-dom"

import Navbar from "../navigation/navbar"
import {AuthContext} from "../utils/context/auth"
import PostForm from "../posts/post-form"
import { FETCH_POST_QUERY } from "../utils/graphql"


import "../styles/home.css"

const Home = () => {
    const { user } = useContext(AuthContext)
    let { loading, error, data} = useQuery(FETCH_POST_QUERY);

    if(data){
        console.log(data)
    }

    const handleComment = () => {
        console.log("hit handle comment")
    }

    const handleDelete = (id) => {

    }

    return(
        <div className="tittle">
            { user === null ?  <Redirect exact to="/" />: null}
            <Navbar />
            <PostForm />
         
            {
               loading ? (<h1 className="loading-post">Loading posts...</h1>) :
                (
                    data.getPosts.map(post => {
                        return(
                            <div className="post-container" key={post.id}>
                                <div className="lot-name">{post.lotName}</div>
                                <div className="detail-grid">
                                    <div><span>status: </span>{post.status}</div>
                                    <div>{post.username}</div>
                                    <div>{post.image}</div>
                                    <div>{post.body}</div>
                                </div>
                                <div className="bottom-container">
                                    <Link to={`/posts/${post.id}`} onClick={handleComment}>{post.commentCount > 0 ? post.commentCount: null} comment</Link>
                                    <div>{post.createdAt}</div>
                                    {user.username === post.username? 
                                        <div onClick={() => handleDelete(post.id)}>Delete Post</div>
                                        : <Redirect exact to="/" />}
                                </div>
                            </div>
                            
                        )
                    }) 
                )
            }
        </div>
    )
}

export default Home