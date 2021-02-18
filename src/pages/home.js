import { useQuery } from "@apollo/react-hooks"
import { gql } from "@apollo/client"

const FETCH_POST_QUERY = gql`
    {
        getPosts{
            id 
            body 
            createdAt 
            username 
            commentCount 
            comments{
                id 
                username 
                createdAt 
                body  
                }
        }
    }`

const Home = () => {
    const {loading, data} =  useQuery(FETCH_POST_QUERY)

    if(data){
        console.log(data)
    }

    return(
        <div>
            Made it to Home
        </div>
    )
}

export default Home