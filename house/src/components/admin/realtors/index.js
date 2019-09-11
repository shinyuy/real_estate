import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../HOC/AdminLayout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../admin.css';

const style = {
    fontWeight: '300',
    fontSize: '1.5rem',
}

export default class AdminRealtors extends Component {

    state = {
        isLoading: true,
        players: []
    }

  /*  componentDidMount() {
        firebasePlayers.once('value').then((snapshot) => {
            const players = firebaseLooper(snapshot);

            this.setState({
                isLoading: false,
                players: reverseArray(players)
            })
        })
    } */

    render() {
        return (
            <AdminLayout>
                <div className='table'>
                <h3>Realtors</h3>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={style}>Name</TableCell>
                                    <TableCell style={style}>Company</TableCell>
                                    <TableCell style={style}>Location</TableCell>
                                    <TableCell style={style}>Successful Deals</TableCell>
                                    <TableCell style={style}>Contact</TableCell>
                                    <TableCell style={style}>Start Date</TableCell>
                                    <TableCell style={style}>End Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.players ?
                                        this.state.players.map((player, i) => (
                                            <TableRow key={i}>
                                                <TableCell style={style}>
                                                   <Link to={`/admin_players/add_players/${player.id}`}>
                                                     {player.name}
                                                   </Link>
                                                </TableCell>
                                                <TableCell style={style}>
                                                <Link to={`/admin_players/add_players/${player.id}`}>
                                                     {player.lastname}
                                                   </Link>
                                                </TableCell>
                                                <TableCell style={style}>
                                                     {player.number}
                                                </TableCell>
                                                <TableCell style={style}>
                                                      {player.position}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        : null
                                }
                            </TableBody>
                        </Table>
                    </Paper>

                    <div className='admin_progress'>
                        {this.state.isLoading ?
                            <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
                            :
                            ''
                        }
                    </div>
                </div>
            </AdminLayout>
        )
    }
}