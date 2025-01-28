import "./index.css"

const UserCard = (props) =>{
    const {userDetails, deleteBtnClicked} = props
    const {id, name, username, company} = userDetails
    const {bs} = company

    const onClickUserDeleteBtn = () =>{
        deleteBtnClicked(id)
    }

    return(
        <li className = "user-card">
            <h1 className = "user-id"> User-id: {id} </h1>
            <p className = "name"> <span className = "span">Name: </span>{name} </p>
            <p className = "name"> <span className = "span">User name: </span>{username} </p>
            <p className = "name"> <span className = "span">Department: </span>{bs} </p>
            <button className = "delete-btn" onClick = {onClickUserDeleteBtn}> Delete </button>
        </li>
    )
}

export default UserCard