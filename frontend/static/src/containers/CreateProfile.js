import React, {Component} from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Geocode from "react-geocode";
import "../Css/CreateProfile.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("my-app-user") ? `Token ${JSON.parse(localStorage.getItem("my-app-user")).token} ` : null;

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_KEY);
Geocode.setLanguage("en");

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            image: null,
            preview: null,
            is_verified: false,
            description:"",
            denomination:"",
            website:"",
            worship_type:"",
            address: "",
            lat:0,
            lng:0,
            church_list:[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e){
        let key = e.target.name;
        const value = e.target.value;
        this.setState({[key]: value});


    }

    handleImageChange(e){
        let file = e.target.files[0]
        // the way not using []
        this.setState({image: file});

        // optional visual for users
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({preview: reader.result});
        };

        // asynconios
        reader.readAsDataURL(file);

    }

    // generateCoordinates() {
    //
    //     this.handleSubmit();
    // }

    handleSubmit(e){
        e.preventDefault();

        let createChurch = () => {

            let formData = new FormData();
            formData.append("name", this.state.name);
            formData.append("image", this.state.image);
            formData.append("is_verified", this.state.is_verified);
            formData.append("description", this.state.description);
            formData.append("denomination", this.state.denomination);
            formData.append("website", this.state.website);
            formData.append("worship_type", this.state.worship_type);
            formData.append("address", this.state.address);
            formData.append("lat", this.state.lat);
            formData.append("lng", this.state.lng);


            axios.post("/api/v1/churches/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`
                }
            })
            .then(res => {
                let church_list = [...this.state.church_list];
                church_list.push(res.data);

                this.setState({name:"",
                image: null,
                preview: null,
                is_verified: false,
                description:"",
                denomination:"",
                website:"",
                worship_type:"",
                address:"",
                lng:0,
                lat:0 });
            })
            .catch(error => {
                console.log(error)
            });
        }

        Geocode.fromAddress(this.state.address).then(
          response => {
            let { lat, lng } = response.results[0].geometry.location;
            this.setState({lat:lat, lng:lng}, createChurch);

          },
          error => {
            console.error(error);
          });


    }


    render(){
        return(
            <div className="d-flex create-profile-container">
                <Form className="profile-form d-flex" onSubmit={this.handleSubmit}>
                    <h2 className="form-title d-flex justify-content-center">Create a Church Profile</h2>
                    <Form.Group className="d-flex" >
                        <Form.Label className="Form-label">Church name:</Form.Label>
                        <Form.Control as="input" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex">
                        <Form.Label className="Form-label">Website Link:</Form.Label>
                        <Form.Control type="text" name="website" value={this.state.website} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex">
                        <Form.Label className="Form-label">Address:</Form.Label>
                        <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="Form-label">Denomination Type:</Form.Label>
                        <Form.Control as="select" name="denomination" defaultValue="" onChange={this.handleChange}>
                            <option value="" disabled>Select denomination</option>
                            <option value="NON DENOMINATIONAL">Non Denominational</option>
                            <option value="CATHOLIC">Catholic</option>
                            <option value="ADVENTIST">Adventist</option>
                            <option value="ANABAPTIST">Anabaptist</option>
                            <option value="ANGLICAN">Anglican</option>
                            <option value="BAPTIST">Baptist</option>
                            <option value="CALVINIST">Calvinist</option>
                            <option value="EVANGELICAL">Evangelical</option>
                            <option value="HOLINESS">Holiness</option>
                            <option value="LUTHERAN">Lutheran</option>
                            <option value="METHODIST">Methodist</option>
                            <option value="PENTECOSTAL">Pentecostal</option>
                            <option value="PRESBYTERIAN">Presbyterian</option>
                            <option value="ASSYRIAN">Assyrian</option>
                            <option value="EASTERN ORTHODOX">Eastern Orthodox</option>
                            <option value="JEHOVAH'S WITNESS">Jehovah's Witness</option>
                            <option value="LATTER DAY SAINT">Latter Day Saint</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="Form-label">Worship Type:</Form.Label>
                        <Form.Control as="select" name="worship_type" defaultValue="" onChange={this.handleChange}>
                            <option value="" disabled>Select style of worship</option>
                            <option value="LITURGICAL">Liturgical</option>
                            <option value="TRADITIONAL">Traditional</option>
                            <option value="BLENDED">Blended</option>
                            <option value="CONTEMPORARY">Contemporary</option>
                            <option value="MODERN">Modern</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="d-flex">
                        <Form.Label className="Form-label">Description:</Form.Label>
                        <Form.Control as="textarea" rows="4" type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex">
                        <Form.Label className="Form-label">Add Profile Picture</Form.Label>
                        <Form.Control type="file" name="image" onChange={this.handleImageChange}/>
                    </Form.Group>


                    {this.state.image ? (
                        <img className="preview-image" src={this.state.preview} alt="preview"/>
                    ) : (
                        null
                    )}

                    <button>Upload</button>
                </Form>
            </div>
        )
    }
}

export default CreateProfile;
