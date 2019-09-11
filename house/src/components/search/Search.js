import React, { Component } from "react";
import Background from "../../img/gal-2.jpeg";
import "./search.css";
import axios from "axios";

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: "url(" + Background + ")"
};

export default class Search extends Component {

  state={
      region: "",
      propertyFor: "",
      maxPrice: null,
      bedrooms: null
  }

  search = () => {
    const {region, propertyFor, bedrooms, maxPrice } = this.state;
    axios
      .get(`http://localhost:8000/api/searchproperties?region=${region}&propertyFor=${propertyFor}&bedrooms=${bedrooms}&maxPrice=${maxPrice}`)
      .then(res => {
        console.log(res.data);
      })
      .then(res => {
        this.setState({
          region: "",
          propertyFor: "",
          maxPrice: null,
          bedrooms: null
        })
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    this.search(this.state);
  };

  render() {
    const {region, propertyFor, bedrooms } = this.state;
    return (
      <section style={sectionStyle} className="search">
        <div className="search-box">
          <h3>Search By Region</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="">
              <select name="region" id="region" placeholder="Search by region" onChange={this.handleChange} value={region.option}>
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
            </div>
            <div className="customize">
    
            <div>
                  <p>Sales/Rents</p>
                <select
                  name="propertyFor"
                  id="propertyFor"
                  placeholder="Search by region"
                  onChange={this.handleChange}
                  value={propertyFor.option}
                >
                  <option value="rent">Rentals</option>
                  <option value="sale">Sales</option>
                </select>
              </div>

              <div>
                  <p>Bed Rooms</p>
                <input
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  onChange={this.handleChange}
                  value={bedrooms}
                  placeholder="Number of Bedrooms"
                />
              </div>
            </div>
            <div>
                <button type="submit">Seach</button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
