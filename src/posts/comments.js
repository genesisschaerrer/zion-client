import {useState} from "react"
import {gql, useQuery, useMutation} from "@apollo/client"

import DeleteBtn from "./delete-btn"

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
        <div>
            <div>
                <input
                type="text"
                placeholder="Add a comment..."
                name="comment"
                value={comment}
                onChange={e => setcomment(e.target.value)}
                />
                {comment === "" ? null: <div onClick={submitComment}>post</div>}
            </div>
            {props.comments.map(comment => {
                return (
                    <div key={comment.id}>
                        <div>{comment.username}</div>
                        <div>{comment.body}</div>
                        <div>{comment.createdAt}</div>
                        {props.user === comment.username ? <DeleteBtn commentId={comment.id} postId={props.postId} />: null}
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