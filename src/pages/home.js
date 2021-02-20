import React, {useEffect}from "react"
// import { useQuery } from "@apollo/react-hooks"
import { useQuery, gql } from "@apollo/client"

import Navbar from "../navigation/navbar"
import "../styles/home.css"

const FETCH_POST_QUERY = gql`
    query {
        getPosts{
            id 
            body 
            createdAt 
            username 
            lotName
            status
            image
            commentCount 
            createdAt
            comments{
                id 
                username 
                createdAt 
                body  
                }
        }
    }`

const Home = () => {
    let { loading, error, data} = useQuery(FETCH_POST_QUERY);

    if(data){
        console.log(data)
    }

    const handleComment = () => {
        console.log("hit handle comment")
    }

    return(
        <div className="tittle">
            <Navbar />
            Made it to Home
            {/* <div className="posts-container"> 
                {data.getPosts.map(post => {
                    return(
                        <div key={post.id}>
                            <div>{post.lotName}</div>
                            <div className="detail-grid">
                                <div>{post.status}</div>
                                <div>{post.username}</div>
                                <div>{post.image}</div>
                                <div>{post.body}</div>
                            </div>
                            <div>{post.createdAt}</div>
                        </div>
                        
                    )
                })}
            </div> */}
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
                                    <div onClick={handleComment}>comment</div>
                                    <div>{post.createdAt}</div>
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