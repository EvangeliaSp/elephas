import React, {Component} from 'react';
import {Container, MDBRow} from "mdbreact";


class CustomProduct extends Component {
    state = {};


    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        return (
            <Container>
                <div className="container">
                    <MDBRow>
                        <h3 style={{color: '#3e3a3a'}}><b>Custom Product form</b></h3>
                    </MDBRow>
                    <br/>
                    <form name="form input" className="form input" onSubmit={this.submituserRegistrationForm}>
                        <div className="col-md-12">
                            <fieldset>
                                <label>Type</label>
                                <select name="Type">

                                    <option value="1">Bracelet</option>
                                    <option value="2">Ring</option>
                                    <option value="3">Earrings</option>
                                    <option value="4">Necklace</option>
                                </select> <br/>
                                <br/>
                                <label>Material</label>
                                <select name="Material">

                                    <option value="1">Silver</option>
                                    <option value="2">Gold</option>
                                    <option value="3">Steel</option>
                                    <option value="4">Wool</option>
                                </select> <br/>
                                <br/>
                                <label>Color</label>
                                <select name="Color">

                                    <option value="1">Black</option>
                                    <option value="2">White</option>
                                    <option value="3">Red</option>
                                    <option value="4">Brown</option>
                                </select> <br/>
                                <br/>
                                <label>Quantity</label>
                                <select name="Quantity">

                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>


                                </select> <br/>
                                <br/>
                                <label>Description</label>
                                <input type="text" size="3000"
                                       placeholder="Description of the product you want to order"

                                    // onChange={this.handleChange.bind(this, "streetName")}
                                    // value={this.state.fields["streetName"]}
                                />
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

                        <br/> <br/>
                        <br/>

                        <br/>
                    </form>
                </div>

            </Container>
        )
    }

}

export default CustomProduct