import {gql, useQuery} from "@apollo/client"
import { useHistory } from "react-router-dom"

const SinglePost = (props) => {
    const postId = props.match.params.postId
    // console.log(postId)

    const {data} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    if(!data){
        postMarkup = <p>Loading post</p>
    } else {
        const 
    }

    return (
        <div>Made it to single post</div>
    )
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id 
            body 
            createdAt 
            username 
            lotName
            status 
            image 
            commentCount
            comments{
                id
                body
                createdAt
                username
            }
        }
    }`
export default SinglePost