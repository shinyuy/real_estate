import React, { Component } from "react";
import "./contact.css";

export default class Contact extends Component {
  state = {
    name: "",
    email: "",
    phoneNumber: null,
    message: ""
  };

  render() {
    const { name, email, phoneNumber, message } = this.state;
    return (
      <div className="contact">
          <h3>Send us your message</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Full Names</label>
          <input
            className="form-control"
            type="text"
            value={name}
            id="name"
            name="name"
            onChange={this.handleChange}
            required
            placeholder="Enter full names"
          />
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            id="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Enter email"
          />

          <label htmlFor="number">Phone</label>
          <input
            className="form-control"
            type="number"
            value={phoneNumber}
            id="phoneNumber"
            name="phoneNumber"
            onChange={this.handleChange}
            required
            placeholder="Enter phone number"
          />
          <label htmlFor="message">Message</label>
          <textarea
            className="form-control"
            rows="8"
            value={message}
            id="message"
            name="message"
            onChange={this.handleChange}
            required
            placeholder="Enter message here"
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}
