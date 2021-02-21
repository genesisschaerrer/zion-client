import { gql } from "@apollo/client"

export const FETCH_POST_QUERY = gql`
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