import React, { Component } from 'react';
import { axiosClient } from '../services/axios-client';
import { variables } from '../Variables';

export class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modalTitle: "",
            UserId: 0,
            UserName: "",
            UserEmail: "",
            UserPassword: "",
            UserStatus: 1 // domyslnie ma mozliwość logowania do systemu
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'users')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ users: Array.from(data) })
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    changeUserName = (e) => {
        this.setState({ UserName: e.target.value });
    }
    changeUserEmail = (e) => {
        this.setState({ UserEmail: e.target.value });
    }
    changeUserPassword = (e) => {
        this.setState({ UserPassword: e.target.value.split('T')[0] });
    }
    changeUserStatus = (e) => {
        this.setState({ UserStatus: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add User",
            UserId: 0,
            UserName: "",
            UserEmail: "",
            UserPassword: "",
            UserStatus: 1
        })
    }

    editClick(usr) {
        this.setState({
            modalTitle: "Edit User",
            UserId: usr.UserId,
            UserName: usr.UserName,
            UserEmail: usr.UserEmail,
            UserPassword: usr.UserPassword,
            UserStatus: usr.UserStatus
        })
    }

    createClick = async (e) => {
        try {
            const response = await axiosClient.post('user',
                {
                    UserName: this.state.UserName,
                    UserPassword: this.state.UserPassword,
                    UserEmail: this.state.UserEmail,
                    LastLoginTime: null,
                    RegistrationTime: new Date(),
                    UserStatus: this.state.UserStatus,
                }
            );
            console.log(response);
            alert(`HttpStatus:${response.status} Response text::[${response.data.text}]`);
            this.refreshList();
        } catch (error) {
            console.log(error);
            alert(`HttpStatus:${error.response.status} Response text::[${error.response.data.text}]`);
        }
    }

    updateClick = async (e) => {
        try {
            const response = await axiosClient.put('user',
                {
                    UserId: this.state.UserId,
                    UserName: this.state.UserName,
                    UserPassword: this.state.UserPassword,
                    UserEmail: this.state.UserEmail,
                    LastLoginTime: null,
                    RegistrationTime: new Date(),
                    UserStatus: this.state.UserStatus,
                }
            );
            console.log(response);
            alert(`HttpStatus:${response.status} Response text::[${response.data.text}]`);
            this.refreshList();
        } catch (error) {
            console.log(error);
            alert(`HttpStatus:${error.response.status} Response text::[${error.response.data.text}]`);
        }
    }

    deleteClick = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const response = await axiosClient.delete(`user/${id}`);
                console.log(response);
                alert(`HttpStatus:${response.status} Response text::[${response.data.text}]`);
                this.refreshList();
            } catch (error) {
                console.log(error);
                alert(`HttpStatus:${error.response.status} Response text::[${error.response.data.text}]`);
            }
        }
    }

    blockUserClick = async (id) => {
        try {
            const response = await axiosClient.put('user/block',
                {
                    UserId: id,
                }
            );
            console.log(response);
            alert(`HttpStatus:${response.status} Response text::[${response.data.text}]`);
            this.refreshList();
        } catch (error) {
            console.log(error);
            alert(`HttpStatus:${error.response.status} Response text::[${error.response.data.text}]`);
        }
    }

    unblockAllUserClick = async () => {
        try {
            const response = await axiosClient.put('user/unblock');
            console.log(response);
            alert(`HttpStatus:${response.status} Response text::[${response.data.text}]`);
            this.refreshList();
        } catch (error) {
            console.log(error);
            alert(`HttpStatus:${error.response.status} Response text::[${error.response.data.text}]`);
        }
    }

    render() {

        const {
            users, modalTitle,
            UserId, UserName, UserEmail, UserPassword, UserStatus
        } = this.state;

        return (
            <div>
                <button type="button" className='btn btn-primary m-2 float-end'
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add User
                </button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Status</th>
                            <th>Register Time</th>
                            <th>Last Login Time</th>
                            <th>
                                Actions
                                <button type="button" className='btn btn-light mr-1'
                                    onClick={() => this.unblockAllUserClick()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check-all" viewBox="0 0 16 16">
                                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                                    </svg>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((usr) =>
                            <tr key={usr.UserId}>
                                <td>{usr.UserId}</td>
                                <td>{usr.UserName}</td>
                                <td>{usr.UserEmail}</td>
                                <td>{usr.UserPassword}</td>
                                <td>{usr.UserStatus}</td>
                                <td>{new Date(usr.RegistrationTime).toISOString().slice(0, 19).replace('T', ' ')}</td>
                                <td>{new Date(usr.LastLoginTime).toISOString().slice(0, 19).replace('T', ' ')}</td>
                                <td>
                                    <button type="button" className='btn btn-light mr-1'
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(usr)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button" className='btn btn-light mr-1'
                                        onClick={() => this.deleteClick(usr.UserId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                    <button type="button" className='btn btn-light mr-1'
                                        onClick={() => this.blockUserClick(usr.UserId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-check" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='modal fade' id="exampleModal" tabIndex={-1} aria-hidden="true">
                    <div className='modal-dialog modal-lg modal-dialog-centered'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>{modalTitle}</h5>
                                <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='Close'></button>
                            </div>
                            <div className='modal-body'>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>User Name</span>
                                            <input type="text" className="form-control"
                                                value={UserName}
                                                onChange={this.changeUserName} />
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>UserEmail</span>
                                            <input type="email" className="form-control"
                                                value={UserEmail}
                                                onChange={this.changeUserEmail} />
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>UserPassword</span>
                                            <input type="password" className="form-control"
                                                value={UserPassword}
                                                onChange={this.changeUserPassword} />
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>UserPassword</span>
                                            <input type="check" className="form-control"
                                            value={UserStatus}
                                            onChange={this.changeUserStatus} />
                                        </div>
                                {UserId === 0 ?
                                    <button type="button" className='btn btn-primary float-start'
                                        onClick={() => this.createClick()}>Create</button>
                                    : null}
                                {UserId !== 0 ?
                                    <button type="button" className='btn btn-primary float-start'
                                        onClick={() => this.updateClick()}>Update</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}