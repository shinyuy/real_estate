import React, { Component } from "react";
import "./homedetails.css";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


export default class HomeDetails extends Component {
  state = {
    property: null
  };

  componentDidMount() {
    let id = this.props.match.params._id;
    axios.get("http://localhost:8000/api/getproperty/" + id).then(res => {
      this.setState({
        property: res.data
      });
      console.log(this.state.property);
    });
  }

  render() {
    const property = this.state.property ? (
      <>
      <div className="story__pictures">
        <Carousel width="100%">
                <div className>
                    <img src={this.state.property.data.images[0].url} alt="Property" className="story__img--1"/>
                </div>
                <div className>
                    <img src={this.state.property.data.images[1].url} alt="Property" className="story__img--1"/>
                </div>
                <div className>
                    <img src={this.state.property.data.images[2].url} alt="Property" className="story__img--1"/>
                </div>
                <div>
                    <img src={this.state.property.data.images[3].url} alt="Property" className="story__img--1"/>
                </div>
                <div className>
                    <img src={this.state.property.data.images[4].url} alt="Property" className="story__img--1"/>
                </div>
            </Carousel>
        </div>
        <div className="story__content">
          <h2 className="heading-2 mb-sm">{this.state.property.data.title}</h2>
          <h3 className="heading-3 heading-2--dark mb-md">
            {this.state.property.data.location},
            {this.state.property.data.region}
          </h3>
          <p className="story__text">{this.state.property.data.description}</p>
          <p className="story__text">Bedrooms: {this.state.property.data.bedrooms}</p>
          <p className="story__text">For {this.state.property.data.propertyFor}</p>
          <p className="story__text">
            Owner's Contact: {this.state.property.data.contact}
          </p>
        </div>
      </>
    ) : (
      <div>Loading Property Information ...</div>
    );
    return (<>{property}</>);
  }
}
