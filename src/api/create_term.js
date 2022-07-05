import axios from "axios"

export default async function createTerm (args, question, id_term, own_id) {
    const res= await axios({
        url: "http://localhost:4000/api/v1/create/term",
        method: "post",
        responseType: "json",
        timeoutErrorMessage: "Time out message",
        timeout: 10000,
        data: {
            ...args, question, id_term, own_id
        }
    })

    const result = await res.data
    window.location.href= `http://localhost:3000/term/${result[0]}/${result[1].toString().toLowerCase().replaceAll(" ", "-")}`
}