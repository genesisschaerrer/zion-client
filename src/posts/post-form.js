import { useMutation, gql } from "@apollo/client"
import {useState, useRef} from "react"
import DropzoneComponent from "react-dropzone-component"
import axios from "axios"

import "../../node_modules/react-dropzone-component/styles/filepicker.css"
import "../../node_modules/dropzone/dist/min/dropzone.min.css"

import {useForm} from "../utils/custom-hooks"
import { FETCH_POST_QUERY } from "../utils/graphql"
import "../styles/post-form.css"

const PostForm = () => {
    const[url, setUrl] = useState("")
    const imageRef = useRef(null)

    const {values, onChange, handleSubmit} = useForm(createPostCallback, {
        body: "",
        lotName: "",
        status: "",
        image: "",
    })

    const[createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: {
            lotName: values.lotName,
            status: values.status,
            body: values.body,
            image: url
        },
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POST_QUERY
            })
            proxy.writeQuery({query: FETCH_POST_QUERY, 
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts],
            }, })
            values.body = ""
            values.lotName = ""
            values.status = ""
            values.image = ""
            imageRef.current.dropzone.removeAllFiles()
        },
        onError(error){
            return error
        }
    }) 

    function createPostCallback() {
        createPost()
    }

    const componentConfig = () => {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    const djsConfig = () => {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    const handleDrop = () => {
        return {
            addedfile: file => {
                const formData = new FormData()

                formData.append("upload_preset", "canyonspot")
                formData.append("file", file)

                axios.post("https://api.cloudinary.com/v1_1/genesisschaerrer/image/upload", formData)
                    .then(res => setUrl(res.data.secure_url)) 
                    .catch(err => console.log(err))
            }
        } 
    }

    return (
        <div className="form-wrapper">
            <form className="post-form" onSubmit={handleSubmit}>
                <div className="lot-details">
                    <div>Parking Lot Name: </div>
                    <select
                    className="select-lot"
                    name="lotName"
                    onChange={onChange}
                    value={values.lotName}
                    >
                        <option value="Choose Option">Choose Option</option>
                        <option value="Visitor Center">Visitor Center</option>
                        <option value="Museum">Museum</option>
                        <option value="Zion Lodge">Zion Lodge</option>
                        <option value="The Grotto">The Grotto</option>
                        <option value="Zion Lodge">Zion Lodge</option>
                        <option value="Big Bend">Big Bend</option>
                        <option value="Temple of Sinawava">Temple of Sinawava</option>
                        <option value="Canyon Junction">Canyon Junction</option>
                        <option value="Zion Mt Carmel Tunnel">Zion Mt Carmel Tunnel</option>
                        <option value="Springdale Street Parking">Springdale Street Parking</option>
                    </select>
                </div>
                 <div className="status-details">
                    <div>Status:</div>

                    <div>
                    <input
                    type="radio"
                    name="status"
                    onChange={onChange}
                    value="open"
                    />
                    <label>Open</label>
                    </div>

                    <div>
                    <input
                    type="radio"
                    name="status"
                    onChange={onChange}
                    value="full"
                    />
                    <label>Full</label>
                    </div>

                    <div>
                    <input
                    type="radio"
                    name="status"
                    onChange={onChange}
                    value="closed"
                    />
                    <label>Closed</label>
                    </div>
                </div> 

                <textarea
                className="textarea"
                placeholder="messege"
                name="body"
                onChange={onChange}
                value={values.body}
                />

                <DropzoneComponent
                className="img"
                ref={imageRef}
                config={componentConfig()} 
                djsConfig={djsConfig()}
                eventHandlers={handleDrop()}
                />
                <div className="picture-warning">wait for picture to load before posting</div>
                <button className="post-btn">POST</button>

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