import {Component} from "react"
import { RiCloseLargeFill } from "react-icons/ri"
import {Circles} from "react-loader-spinner"
import Form from "../Form"
import UserCard from "../UserCard"
import "./index.css"

class HomePage extends Component{
    state = {showForm: true, usersList: [], isLoading: true}

    componentDidMount(){
        this.getUsersDetails()
    }

    getUsersDetails = async () =>{
        const apiUrl = "https://jsonplaceholder.typicode.com/users"
        const options = {method: "GET"}
        const response = await fetch(apiUrl, options)
        const usersDetails = await response.json()
        
        if(response.ok){
            this.setState({usersList: usersDetails, isLoading: false})
        }
    }

    onShowFormBtnClicked = () =>{
        this.setState({showForm: true})
    }

    onClickCloseForm = () =>{
        this.setState({showForm: false})
    }

    deleteBtnClicked = async (id) =>{
        const apiUrl = `https://jsonplaceholder.typicode.com/users/${id}`
        const options = {
            method: "DELETE"
        }
        const response = await fetch(apiUrl, options)

        if(response.ok){
            this.setState((prevState) => ({
                usersList: prevState.usersList.filter((user) => user.id !== id),
            }));
        }
        const apiResponse = await response.json()
        console.log(apiResponse) //Here iam getting response as '{}' which is a successfull deletion response
    }

    renderLoader = () => (
        <div className="products-loader-container">
          <Circles type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )

    render(){
        const{showForm, usersList, isLoading} = this.state
        return(
            <div className = "home-page">
                <h1 className = "home-page-heading"> Welcome! </h1>
                {showForm ?
                (
                <div className = "form-container">
                    <button className = "close-btn" onClick = {this.onClickCloseForm}> <RiCloseLargeFill className = "close-icon"/> </button>
                    <Form />
                </div>)
                :
                (<button className = "show-form-btn" onClick = {this.onShowFormBtnClicked}> Click here to enter your details </button>)
                }

                <div className = "users-details-container">
                    <h1 className = "home-page-heading add-animation"> Our Users: </h1>
                    {isLoading?this.renderLoader:
                    <ul className = "users-list-container">
                        {usersList.map((eachUser)=>(
                            <UserCard userDetails = {eachUser} key = {eachUser.id} deleteBtnClicked = {this.deleteBtnClicked}/>
                        ))}
                    </ul>
                    }
                </div>
                
            </div>
        )
    }
}

export default HomePage