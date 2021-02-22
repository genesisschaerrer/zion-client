import {useState} from "react"
import {gql, useMutation} from "@apollo/client"

import {FETCH_POST_QUERY} from "../utils/graphql"
import deleteIcon from "../images/icons/delete.svg"

function DeleteBtn(props){
   const mutation = props.commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy){
            if(!props.commentId){
                const data = proxy.readQuery({
                    query: FETCH_POST_QUERY
                })
                proxy.writeQuery({query: FETCH_POST_QUERY,
                    data: {
                        getPosts: data.getPosts.filter(p => p.id !== props.postId)
                    },})
            }
        },
        variables: {
            postId: props.postId,
            commentId: props.commentId
        }
    })

    function callDeletePost() {
        deletePostOrMutation()
    }

    return(
        <img onClick={callDeletePost} src={deleteIcon} style={{"width": "30px"}}/>
    )

}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`

export default DeleteBtn