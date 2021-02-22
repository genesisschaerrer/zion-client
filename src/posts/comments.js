import {useState} from "react"
import {gql, useQuery, useMutation} from "@apollo/client"

import DeleteBtn from "./delete-btn"
import "../styles/comments.css"

const Comments = (props) => {
    const [comment, setcomment] = useState("")

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){
            setcomment("")
        },
        variables: {
            postId: props.postId,
            body: comment
        }

    })
    return (
        <div className="comments-container">
            <div className="input-comment-wrapper">
                <textarea
                className="add-comment-input"
                type="text"
                placeholder="Add a comment..."
                name="comment"
                value={comment}
                onChange={e => setcomment(e.target.value)}
                />
                {comment === "" ? null: <div className="post-comment-btn" onClick={submitComment}>Post</div>}
            </div>
            {props.comments.map(comment => {
                return (
                    <div className="comment-map" key={comment.id}>
                        <div>{comment.username}</div>
                        <div>{comment.body}</div>
                        <div className="cmt-date-delete">
                            <div className="comment-date">{comment.createdAt}</div>
                            {props.user === comment.username ? <DeleteBtn commentId={comment.id} postId={props.postId} />: null}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default Comments