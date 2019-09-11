import React, { Component } from "react";
import AdminLayout from "../../../HOC/AdminLayout";
import "../admin.css";
import File from "../properties/File";
import axios from "axios";

export default class Addeditplayers extends Component {

  state = {
    name: "",
    region: "",
    agency: "",
    contact: "",
    location: "",
    images: [],
    formError: false,
    formSuccess: false
  }

  putDataToDB = (
    name,
    region,
    agency,
    contact,
    location,
    images,
   // geometry
  ) => {
    axios
      .post("http://localhost:8000/api/addagent", {
        name: this.state.name,
        region: this.state.region,
        agency: this.state.agency,
        location: this.state.location,
        contact: this.state.contact,
        images: this.state.images
      })
      .then(res => console.log(res.data))
      .then(res => {
        this.setState({
          name: "",
          region: "",
          agency: "",
          location: "",
          contact: "",
          images: [],
          formSuccess: true
        });
      })
      .catch(e => {
        this.setState({
          formError: true
        });
      });
  };


  successForm = message => {
    this.setState({
      formSuccess: message
    });
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    this.putDataToDB(this.state);
  };

  imagesHandler = images => {
    this.setState({
      images: images
    });
    console.log(this.state);
  };
  
  render() {
      const { name, region, agency, contact, location } = this.state;
    return (
      <AdminLayout>
         <div className="add_container">
          <div className="addform">
            <h3>Add Agent</h3>
            <File
              imagesHandler={images => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />
            <form onSubmit={this.handleSubmit}>
              <label className="label_inputs" htmlFor="name">
                Agents Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Enter agents name"
                onChange={this.handleChange}
                required
              />
              <label className="label_inputs" htmlFor="region">
                Region
              </label>
              <select
                name="region"
                id="region"
                value={region.option}
                placeholder="Enter region"
                onChange={this.handleChange}
                required
              >
                <option value="no option">Choose Region</option>
                <option value="farnorth">Far North</option>
                <option value="north">North</option>
                <option value="adamawa">Adamawa</option>
                <option value="center">Center</option>
                <option value="northwest">North West</option>
                <option value="west">West</option>
                <option value="southwest">South West</option>
                <option value="littoral">Littoral</option>
                <option value="east">East</option>
                <option value="south">South</option>
              </select>
              <label className="label_inputs" htmlFor="agency">
                Name of Agency
              </label>
              <input
                type="text"
                name="agency"
                id="agency"
                value={agency}
                placeholder="Enter name of agency"
                onChange={this.handleChange}
                required
              />
              <label className="label_inputs" htmlFor="contact">
                Agent's Contact
              </label>
              <input
                type="text"
                name="contact"
                id="contact"
                value={contact}
                placeholder="Agent's contact"
                onChange={this.handleChange}
                required
              />
              <label className="label_inputs" htmlFor="location">
                Agency Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                placeholder="Agency location"
                onChange={this.handleChange}
                required
              />
              <div style={{ color: "green" }}>
                {this.state.success === true
                  ? "Property added successfully"
                  : ""}
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}
