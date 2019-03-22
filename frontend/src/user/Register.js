import React from 'react';
import './register.css';
import {Container} from "mdbreact";



class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    submituserRegistrationForm(e) {
        e.preventDefault();

        if (this.handleValidation()) {
            const options = {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify(this.state.fields),
                redirect: 'follow'
            };
            fetch('/user/create', options)
                .then(response => {
                    if (response.ok) {
                        alert("Form submitted");
                        window.location.href = `/user/login`;
                    }
                })

        }
        else {
            alert("Form has errors.")
        }
    }


    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["firstname"]){
            formIsValid = false;
            errors["firstname"] = "Cannot be empty";
        }

        if(typeof fields["firstname"] !== "undefined"){
            if(!fields["firstname"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["firstname"] = "Only letters";
            }
        }

        //Surname
        if(!fields["lastname"]){
            formIsValid = false;
            errors["lastname"] = "Cannot be empty";
        }

        if(typeof fields["lastname"] !== "undefined"){
            if(!fields["lastname"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["lastname"] = "Only letters";
            }
        }

        //Email
        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Street Name
        if(!fields["streetName"]){
            formIsValid = false;
            errors["streetName"] = "Cannot be empty";
        }

        if(typeof fields["streetName"] !== "undefined"){
            if(!fields["streetName"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["streetName"] = "Only letters";
            }
        }

        //Password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
                formIsValid = false;
                errors["password"] = "Password must be at least 8 characters long, contain upper and lowercase letters, one or more numbers and one or more special characters";
            }
        }



        //Street Number
        if (!fields["streetNumber"]) {
            formIsValid = false;
            errors["streetNumber"] = "Please enter your street number.";
        }

        if (typeof fields["streetNumber"] !== "undefined") {
            if (!fields["streetNumber"].match(/^([0-9]*)$/)) {
                formIsValid = false;
                errors["streetNumber"] = "Please enter a correct street number.";
            }
        }
        //Country
        if(!fields["country"]){
            formIsValid = false;
            errors["country"] = "Cannot be empty";
        }

        if(typeof fields["country"] !== "undefined"){
            if(!fields["country"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["country"] = "Only letters";
            }
        }

        //City
        if(!fields["city"]){
            formIsValid = false;
            errors["city"] = "Cannot be empty";
        }

        if(typeof fields["city"] !== "undefined"){
            if(!fields["city"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["city"] = "Only letters";
            }
        }

        //Zip Code
        if (!fields["zipCode"]) {
            formIsValid = false;
            errors["zipCode"] = "Cannot be empty.";
        }


        //Telephone
        if (!fields["telephone"]) {
            formIsValid = false;
            errors["telephone"] = "Please enter your phone number.";
        }

        if (typeof fields["telephone"] !== "undefined") {
            if (!fields["telephone"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["telephone"] = "Please enter valid phone number.";
            }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    render(){
        return (
            <Container>
                <div className="container">
                    <h4>Registration form</h4>
                <form name="form input" className="form input" onSubmit = {this.submituserRegistrationForm}>
                    <div className="col-md-12">
                        <fieldset>
                            <label>Name</label>
                            <input type="text" size="30" placeholder="Name" onChange={this.handleChange.bind(this, "firstname")} value={this.state.fields["firstname"]}/>
                            <span className="errorMsg">{this.state.errors["firstname"]}</span>
                            <br/>
                            <br/>
                            <label>Surname</label>
                            <input type="text" size="30" placeholder="Surname" onChange={this.handleChange.bind(this, "lastname")} value={this.state.fields["lastname"]}/>
                            <span className="errorMsg">{this.state.errors["lastname"]}</span>
                            <br/>
                            <br/>
                            <label>Password</label>
                            <input type="password" size="30" placeholder="Password" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>
                            <span className="errorMsg">{this.state.errors["password"]}</span>
                            <br/>
                            <br/>
                            <label>Email</label>
                            <input type="text" size="30" placeholder="Email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                            <span className="errorMsg">{this.state.errors["email"]}</span>
                            <br/>
                            <br/>
                            <label>Street name</label>
                            <input type="text" size="30" placeholder="St. Name" onChange={this.handleChange.bind(this, "streetName")} value={this.state.fields["streetName"]}/>
                            <span className="errorMsg">{this.state.errors["streetName"]}</span>
                            <br/>
                            <br/>
                            <label>Street number</label>
                            <input type="text" size="30" placeholder="St. Number" onChange={this.handleChange.bind(this, "streetNumber")} value={this.state.fields["streetNumber"]}/>
                            <span className="errorMsg">{this.state.errors["streetNumber"]}</span>
                            <br/>
                            <br/>
                            <label>Country</label>
                            <input type="text" size="30" placeholder="Country" onChange={this.handleChange.bind(this, "country")} value={this.state.fields["country"]}/>
                            <span className="errorMsg">{this.state.errors["country"]}</span>
                            <br/>
                            <br/>
                            <label>City</label>
                            <input type="text" size="30" placeholder="City" onChange={this.handleChange.bind(this, "city")} value={this.state.fields["city"]}/>
                            <span className="errorMsg">{this.state.errors["city"]}</span>
                            <br/>
                            <br/>
                            <label>zip code</label>
                            <input type="text" size="30" placeholder="zip code" onChange={this.handleChange.bind(this, "zipCode")} value={this.state.fields["zipCode"]}/>
                            <span className="errorMsg">{this.state.errors["zipCode"]}</span>
                            <br/>
                            <br/>
                            <label>Phone</label>
                            <input type="text" size="30" placeholder="Phone" onChange={this.handleChange.bind(this, "telephone")} value={this.state.fields["telephone"]}/>
                            <span className="errorMsg">{this.state.errors["telephone"]}</span>
                            <div className="custom-control custom-checkbox my-1 mr-sm-2">
                                <input type="checkbox" className="custom-control-input" id="customControlInline" required/>
                                    <label className="custom-control-label" htmlFor="customControlInline">Agree to terms and conditions</label>
                            </div>
                            <br/>
                            <br/>

                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <button className="button" id="submit" value="Submit">Submit</button>

                        </fieldset>
                    </div>
                    <br/>
                    <br/>

                    <br/>  <br/>
                    <br/>

                    <br/>
                </form>
                </div>

            </Container>
        )
    }
}

export default Test