import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MarkButton from './mark-button';
import { Button } from 'bootstrap';

let getPriorities = (lvl) => {
    switch(lvl) {
        case 'Low': 
            return <td className="low-priority">{lvl}</td>;
        case 'Medium':
            return <td className="med-priority">{lvl}</td>;
        case 'High': 
            return <td className="high-priority">{lvl}</td>;
        default:
            return <td>{lvl}</td>;
    }
}

export default class Ticket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: ''
        }
    }

    componentDidMount() {
        // default state of ticket
        axios.get(window.API_URL + 'tickets/'+this.props.ticket.id, {
            headers:{
                'Authorization': "Bearer " + window.sessionStorage.getItem("token")
            }
            })
            .then(res => {
                this.setState({
                    category: res.data.category,
                    title: res.data.title,
                    clientReference: res.data.clientReference,
                    created: res.data.created,
                    createdBy: res.data.createdBy,
                    deleted: res.data.deleted,
                    status: res.data.status,
                    type: res.data.type,
                    project: res.data.project.name,
                    description: res.data.description
                })
            })
            .catch(error => console.log(error));
    }

    onChangeStatus(e) {
        // axios.post('http://localhost:5000/tickets/update/' + this.props.ticket._id, this.props.ticket)
        //     .then(res => console.log(res.data));
    }

    render() {
        return (
            <tr>
                <td>{this.props.ticket.title}</td>
                <td>{this.props.ticket.description}</td>
                <td>{this.props.ticket.projectName}</td>
                <td>{this.props.ticket.assignee}</td>
                { getPriorities(this.props.ticket.priority) }
                <td>{this.props.ticket.status}</td>
                <td>{this.props.ticket.type}</td>
                <td>
                    <Link to={"/edit/"+this.props.ticket.id} className="badge badge-info">Edit</Link>
                    <br></br>
                    {/* <Button onClick={() => { 
                        if(window.confirm('Are you sure you want to delete this ticket?')) 
                            this.props.deleteTicket(this.props.ticket.id) 
                    }} 
                    className="badge badge-danger">Delete</Button> */}
                    <br></br>
                    
                    {/* <MarkButton 
                        mark={this.props.ticket.status} 
                        ticketID={this.props.ticket._id}
                    /> 
                        /* *****
                         *  FIX THIS TO UPDATE STATE
                         * *****/
                        // this.props.ticket.status !== 'Resolved' ? 
                        // <Button onClick={() => {
                        //     this.props.ticket.status = 'Resolved' 
                        // }} 
                        // className="badge badge-success">Mark as Resolved</Button> :
                        // <Button onClick={() => {
                        //     this.props.ticket.status = 'Open' 
                        // }} 
                        // className="badge badge-secondary">Mark as Open</Button>
                    }
                </td>
            </tr>
        );
    }
}