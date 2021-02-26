import React, {useContext, useState}from "react"
import { useQuery} from "@apollo/client"
import {Redirect} from "react-router-dom"

import Navbar from "../navigation/navbar"
import {AuthContext} from "../utils/context/auth"
import PostForm from "../posts/post-form"
import DeleteBtn from "../posts/delete-btn"
import Comments from "../posts/comments"
import { FETCH_POST_QUERY } from "../utils/graphql"
import commentIcon from "../images/icons/comment.svg"



import "../styles/home.css"

const Home = () => {
    const { user } = useContext(AuthContext)
    const [comment, setComment] = useState("")
    let { loading, error, data} = useQuery(FETCH_POST_QUERY);

    const handleComment = (id) => {
        if(comment === ""){
            setComment(id)
        } else {
            setComment("")
        }
    }

    return(
        <div>
            {user === null ?  <Redirect exact to="/" />: null}
            <Navbar />
            <div className="home-container"> 
            <PostForm />
         
            <div className="shuttle-wrapper">
                <a className="shuttle-link" target="_blank" href="https://www.nps.gov/zion/planyourvisit/zion-canyon-shuttle-system.htm">See Shuttle Schedule</a>
                <a className="shuttle-link" target="_blank" href="https://www.recreation.gov/ticket/facility/300016">Get Shuttle tickets</a>
            </div>
            {
                loading ? (<h1 className="loading-post">Loading posts...</h1>) :
                (
                    data.getPosts.map(post => {
                        return(
                            <div className="post-container" key={post.id}>
                                <div className="lot-name">{post.lotName}</div>
                                <div className="detail-grid">
                                    <div><span>Status: </span>{post.status}</div>
                                    <div>{post.username}</div>
                                    <img src={post.image}  style={{"width": "200px"}}/>
                                    <div>{post.body}</div>
                                </div>
                                <div className="bottom-container">
                                    {/* <Link to={`/posts/${post.id}`} onClick={handleComment}>{post.commentCount > 0 ? post.commentCount: null} comment</Link> */}
                                    <div onClick={() => handleComment(post.id)}>{post.commentCount > 0 ? <span className="comment-count">{post.commentCount}</span>: null}<img className="comment-icon" src={commentIcon} /></div>
                                    <div className="post-date">{post.createdAt}</div>
                                    {user.username === post.username? 
                                        <DeleteBtn postId={post.id} />
                                        : null}
                                </div>
                                {comment === post.id? 
                                <Comments 
                                comments={post.comments} 
                                postId={post.id}
                                user={user.username}
                                />
                                : null}
                            </div>
                            
                        )
                    }) 
                )
            }
            </div>
        </div>
    )
}

export default Home