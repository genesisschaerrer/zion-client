import { useMutation, gql } from "@apollo/client"

import {useForm} from "../utils/custom-hooks"
import { FETCH_POST_QUERY } from "../utils/graphql"

const PostForm = () => {
    const {values, onChange, handleSubmit} = useForm(createPostCallback, {
        body: "",
        lotName: "",
        status: "",
        image: ""
    })

    const[createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POST_QUERY
            })
            // data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({query: FETCH_POST_QUERY, 
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts],
            }, })
            values.body = ""
            values.lotName = ""
            values.status = ""
            values.image = ""
        },
        onError(error){
            return error
        }
    }) 

    function createPostCallback() {
        createPost()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Parking Lot Name: </div>
                    <select
                    name="lotName"
                    onChange={onChange}
                    value={values.lotName}
                    >
                        <option value="Lot 1">Lot 1</option>
                        <option value="Lot 2">Lot 2</option>
                        <option value="Lot 3">Lot 3</option>
                    </select>
                </div>
                 <div>
                    <div>Status:</div>
                    <input
                    type="radio"
                    name="status"
                    onChange={onChange}
                    value="open"
                    />
                    <label>Open</label>

                    <input
                    type="radio"
                    name="status"
                    onChange={onChange}
                    value="full"
                    />
                    <label>Full</label>

                    <input
                    type="radio"
                    name="status"
                    onChange={onChange}
                    value="closed"
                    />
                    <label>Closed</label>
                </div> 

                <textarea
                placeholder="messege"
                name="body"
                onChange={onChange}
                value={values.body}
                />

                <input
                type="text"
                placeholder="img url"
                name="image"
                onChange={onChange}
                value={values.image} 
                />

                <button>POST</button>

                {error ? 
                    <div>
                        <ul>
                            <li>{error.graphQLErrors[0].message}</li>
                        </ul>
                    </div>
                    : null}
                
            </form>
        </div>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $body: String!
        $lotName: String!
        $status: String!
        $image: String!
    ){
        createPost(body: $body, lotName: $lotName, status: $status, image: $image ){
            id
            body
            createdAt
            username
            lotName
            status
            image
            commentCount
            comments{
                body
                createdAt
                username
            }
        }
    }`

export default PostForm