import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'bootstrap'
export default class MarkButton extends Component {
	constructor(props) {
		super(props);

        this.handleClick = this.handleClick.bind(this);

		this.state = { 
            title: '',
            description: '',
            projectName: '',
            assignee: '',
            priority: '',
            status: '',
            type: '',
            users: [],
            projects: []
        };
	}

	componentDidMount() {
        // default state of ticket
        axios.get(window.API_URL + 'tickets/'+this.props._id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    projectName: res.data.projectName,
                    assignee: res.data.assignee,
                    priority: res.data.priority,
                    status: res.data.status,
                    type: res.data.type
                })
            })
            .catch((error) => { console.log(error); })

        // get list of users to select from
        axios.get(window.API_URL + 'users')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.name)
                })
            }
        })
        .catch((error) => { console.log(error); })

        // get list of projects to select from
        axios.get(window.API_URL + 'projects')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    projects: res.data.map(project => project.name)
                })
            }
        })
        .catch((error) => { console.log(error); })
    }

    handleClick(e) {
        e.preventDefault();

        this.state.status !== 'Resolved' ?
        this.setState({status: 'Resolved'}) : 
        this.setState({status: 'Open'})

        const ticket = {
            title: this.state.title,
            description: this.state.description,
            projectName: this.state.projectName,
            assignee: this.state.assignee,
            priority: this.state.priority,
            status: this.state.status,
            type: this.state.type
        }

        axios.post(window.API_URL + 'update/' + this.props._id, ticket)
            .then(res => console.log(res.data));
            
        alert('Successfully updated.');
    }
	
	render() {
		return(
            this.state.status !== 'Resolved' ? 
            <Button href="#" onClick={this.handleClick} 
            className="badge badge-success">Mark as Resolved</Button> :
            <Button href="#" onClick={this.handleClick}
            className="badge badge-secondary">Mark as Open</Button>          
		);
	}
}