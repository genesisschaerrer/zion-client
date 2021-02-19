import { useState} from "react"

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = (e) => {
        console.log("hit on change")
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        callback()
    }

    return {
        onChange,
        handleSubmit,
        values
    }
}