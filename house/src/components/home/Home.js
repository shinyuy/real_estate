import React, { Component } from "react";
import "./home.css";
import Location from "../../img/basic_geolocalize-05.png";
import HouseIcon from "../../img/basic_home.png";
import Price from "../../img/ecommerce_franc.png";
import Area from "../../img/software_scale_expand.png";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends Component {

  state = {
      property: [],
      title: null,
      description: null,
      price: null,
      location: null,
      amount: null,
      propertyFor: null,
      owner: null,
      area: null,
      contact: null,
      region: null,
      bedrooms: null,
      images: [],
     // geometry: [],
     intervalIsSet: false,
     idToDelete: null,
     idToUpdate: null,
     objectToUpdate: null
  }

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 600000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

   // our first get method that uses our backend api to 
  // fetch data from our data base
  getDataFromDb = () => {
    axios.get("http://localhost:8000/api/getproperties")
      .then(res => this.setState({ property: res.data }))
      .catch(function (error) { console.log(error) })
  };

  render() {
    const { property } = this.state;
    return (
      <section className="homes">
        {property.length <= 0 ? `Loading Properties`
        : property.data.map(function (dat, i) {
          return (
            <div className="home" key={i}>
          <img src={dat.images[0].url} alt="House 2" className="home__img" />
          <h5 className="home__name">{dat.title}</h5>
          <div className="home__location">
            <img src={Location} alt="location" />
            <p>{dat.location}</p>
          </div>
          <div className="home__rooms">
            <img src={HouseIcon} alt="house icon" />
            <p>{dat.bedrooms} rooms</p>
          </div>
          <div className="home__area">
            <img src={Area} alt="area" />
            <p>
              {dat.area} m<sup>2</sup>
            </p>
          </div>
          <div className="home__price">
            <img src={Price} alt="price" />
            <p>{dat.price}Fcfa</p>
          </div>
          <button className="btn home__btn"><Link to={'/home/' + dat._id}>Property Details</Link></button>
        </div>
          )
        }) }
        
      </section>
    );
  }
}
