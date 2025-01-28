import {Component} from "react"
import "./index.css"

class Form extends Component{
    state = {userDetails: {firstName: "", lastName: "", email: "", department: ""}, formSubmitted: false }

    onChangeFirstName = (event) =>{
        this.setState(prevState=>({
            userDetails: {...prevState.userDetails, firstName:event.target.value}, formSubmitted: false
        }))
    }

    onChangeLastName = (event) =>{
        this.setState(prevState=>({
            userDetails: {...prevState.userDetails, lastName: event.target.value}, formSubmitted: false
        }))
    }

    onChangeEmail = (event) =>{
        this.setState(prevState=>({
            userDetails:{...prevState.userDetails, email: event.target.value}, formSubmitted: false
        }))
    }

    onChangeDepartment = (event) =>{
        this.setState(prevState=>({
            userDetails: {...prevState.userDetails, department: event.target.value}, formSubmitted: false
        }))
    }

    onSubmitForm = async (event) =>{
        event.preventDefault()
        const {userDetails} = this.state
        const apiUrl = "https://jsonplaceholder.typicode.com/users"
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userDetails)}

        const response = await fetch(apiUrl, options)
        if(response.ok){
            this.setState({formSubmitted: true})
            // const body = await(response.json())
            // console.log(body)
            // console.log("user added successfully")
        }else{
            console.log("user not added successfully")
        }
    }
    render(){
        const {userDetails, formSubmitted} = this.state
        return(
            <div className = "form-page">
            <form className = "form" onSubmit = {this.onSubmitForm}>
                <h1 className = "form-heading"> User Details </h1> 

                <label className = "label" htmlFor = "FirstName"> First Name: </label>
                <br />
                <input required type = "text" className = "input-container" id = "FirstName" placeholder = "first name" onChange = {this.onChangeFirstName}/>
                <br />

                <label className = "label" htmlFor = "LastName"> Last Name: </label>
                <br />
                <input required type = "text" className = "input-container" id = "LastName" placeholder = "last name" onChange = {this.onChangeLastName}/>
                <br />

                <label className = "label" htmlFor = "Email"> Email: </label>
                <br />
                <input required type = "text" className = "input-container" id = "Email" placeholder = "email" onChange = {this.onChangeEmail}/>
                <br />

                <label className = "label" htmlFor = "Department"> Department: </label>
                <br />
                <input required type = "text" className = "input-container" id = "Department" placeholder = "department" onChange = {this.onChangeDepartment}/>
                <br />

                <button className = "submit-btn" type = "submit"> Submit </button>
            </form>

            {formSubmitted &&
                <h1 className = "submitted-successfully-text"> Hi {userDetails.firstName}, Your Details have been Submitted Successfully </h1>
            }
            </div>
        )
    }
}

export default Form