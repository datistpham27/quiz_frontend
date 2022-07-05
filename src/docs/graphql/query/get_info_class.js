import { gql } from "@apollo/client"

const GET_INFO_CLASS= gql`
    query getinfoclass($id_class: String!) {
        getinfoclass(id_class: $id_class) {
            class_name,
            description,
            own_id,
            code_invite
        }
    }
`

export default GET_INFO_CLASS    