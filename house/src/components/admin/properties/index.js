import React, { Component } from "react";
import AdminLayout from "../../../HOC/AdminLayout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../admin.css";
import axios from "axios";

const style = {
  fontWeight: "300",
  fontSize: "1.5rem"
};

export default class AdminProperties extends Component {
  state = {
    isLoading: true,
    data: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/getproperties")
      .then(res => {
          this.setState({ isLoading: false, data: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.data);
    const { data } = this.state;

    return (
      <AdminLayout>
        <div className="table">
          <h3>Properties</h3>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={style}>Start Date</TableCell>
                  <TableCell style={style}>End Date</TableCell>
                  <TableCell style={style}>Owner</TableCell>
                  <TableCell style={style}>Amount Paid</TableCell>
                  <TableCell style={style}>Location</TableCell>
                  <TableCell style={style}>Type</TableCell>
                  <TableCell style={style}>Property</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length <= 0
                  ? "Loading data ..."
                  : data.data.map(function(dat, i) {
                      return (
                        <TableRow key={i}>
                          <TableCell style={style}>{dat.start}</TableCell>
                          <TableCell style={style}> {dat.end}</TableCell>
                          <TableCell style={style}>{dat.owner}</TableCell>
                          <TableCell style={style}>{dat.amount}Fcfa</TableCell>
                          <TableCell style={style}>{dat.location}</TableCell>
                          <TableCell style={style}>{dat.propertyFor}</TableCell>
                          <TableCell style={style}>{dat.contact}</TableCell>
                          <button>Remove</button>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </Paper>

          <div className="admin_progress">
            {this.state.isLoading ? (
              <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
            ) : (
              ""
            )}
          </div>
        </div>
      </AdminLayout>
    );
  }
}
