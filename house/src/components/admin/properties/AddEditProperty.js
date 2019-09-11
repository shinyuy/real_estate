import React, { Component } from "react";
import AdminLayout from "../../../HOC/AdminLayout";
import axios from "axios";
import "../admin.css";
import File from "./File";

export default class AddEditProperty extends Component {
  state = {
    property: [],
    title: "",
    description: "",
    price: "",
    location: "",
    amount: "",
    propertyFor: "",
    owner: "",
    area: "",
    contact: "",
    region: "",
    bedrooms: "",
    images: [],
   // geometry: [],
    formError: false,
    formSuccess: false
  };

  putDataToDB = (
    title,
    description,
    location,
    price,
    amount,
    owner,
    bedrooms,
    area,
    contact,
    propertyFor,
    region,
    images,
   // geometry
  ) => {
    console.log(this.state);
    axios
      .post("http://localhost:8000/api/addproperty", {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        location: this.state.location,
        propertyFor: this.state.propertyFor,
        owner: this.state.owner,
        area: this.state.area,
        contact: this.state.contact,
        region: this.state.region,
        bedrooms: this.state.bedrooms,
        images: this.state.images,
      //  geometry: this.state.geometry
      })
      .then(res => console.log(res.data))
      .then(res => {
        this.setState({
          title: "",
          description: "",
          price: "",
          location: "",
          propertyFor: "",
          owner: "",
          area: "",
          contact: "",
          region: "",
          bedrooms: "",
          images: [],
        //  geometry: [],
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
  };

  render() {
    const {
      title,
      description,
      price,
      location,
      propertyFor,
      owner,
      area,
      contact,
      region,
      bedrooms
    } = this.state;
    return (
      <AdminLayout>
        <div className="add_container">
          <div className="addform">
            <h3>Add Property</h3>
            <File
              imagesHandler={images => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />
            <form onSubmit={this.handleSubmit}>
              <label className="label_inputs" htmlFor="title">
                Property Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Enter Property Title"
                onChange={this.handleChange}
                required
              />
              <label className="label_inputs" htmlFor="propertyFor">
                Property Type
              </label>
              <select
                name="propertyFor"
                id="propertyFor"
                value={propertyFor.option}
                placeholder="Property Type"
                onChange={this.handleChange}
                required
              >
                <option value="no option">Choose Rent/Sale</option>
                <option value="rent">rent</option>
                <option value="sale">sale</option>
              </select>
              <label className="label_inputs" htmlFor="region">
                Region
              </label>
              <select
                name="region"
                id="region"
                value={region.option}
                placeholder="Search by region"
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
              <label className="label_inputs" htmlFor="location">
                Property Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                placeholder="Enter Property Location"
                onChange={this.handleChange}
                required
              />
              <label className="label_inputs" htmlFor="price">
                price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                placeholder="Set Property Price"
                onChange={this.handleChange}
                required
              />
              <label className="label_inputs" htmlFor="owner">
                Property Owner
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                value={owner}
                placeholder="Property Owner"
                onChange={this.handleChange}
                required
              />
              <label className="label_inputs" htmlFor="contact">
                Owner's Contact
              </label>
              <input
                type="number"
                name="contact"
                id="contact"
                value={contact}
                placeholder="Owners Contact"
                onChange={this.handleChange}
                required
              />
              <label className="label_inputs" htmlFor="contact">
                Area
              </label>
              <input
                type="number"
                name="area"
                id="area"
                value={area}
                placeholder="Area"
                onChange={this.handleChange}
              />
              <label className="label_inputs" htmlFor="contact">
                Number of Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                value={bedrooms}
                placeholder="Number of Bedrooms"
                onChange={this.handleChange}
              />
              <label className="label_inputs" htmlFor="description">
                Property Description
              </label>
              <textarea
                name="description"
                id="description"
                value={description}
                placeholder="Property Description"
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
