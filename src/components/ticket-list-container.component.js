import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import TicketList from './ticket-list.component';

export class TicketContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: []
        }
        this.getTickets();
    }
    getTickets = () => {
        axios.get(window.API_URL + 'tickets', {
            headers: {
                'Authorization': "Bearer " + window.sessionStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res);
                this.setState({tickets:res.data});
            })
            .catch(error => console.log(error));
    }
    render() {
        return this.state.tickets.title ? (<></>) : (
            <Row>
                <Col lg="12" className="h-100">
                    <TicketList columns={
                        [
                            { Header: "Id", accessor: "id" },
                            { Header: "Reference", accessor: "reference" },
                            { Header: "Client Ref", accessor: "clientReference" },
                            { Header: "Company", accessor: "project.company.name" },
                            { Header: "Created", accessor: "created", Cell:({row: {original}})=> { return moment(original).format()}},
                            { Header: "Title", accessor: "title" },
                            { Header: "Priority", accessor: "priority.name" },
                            { Header: "Status", accessor: "status.name" },
                            { Header: "Category", accessor: "category.name" }
                        ]
                    } data={this.state.tickets} />
                </Col>
            </Row>
        )
    }
}