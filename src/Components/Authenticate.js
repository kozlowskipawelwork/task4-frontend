import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader } from "@mui/material";
import { useState } from 'react';

import { userAuthenticationStatusContainer } from "../services/user-status";
import { axiosClient } from "../services/axios-client";

const CenteredCard = (props) => {
    return (
        <Card sx={{ mx: 'auto', width: '30vw', mt: 8 }}>
            <CardHeader title={<h3 className='d-flex justify-content-center'>Authentication</h3>}>
            </CardHeader>
            {props.children}
        </Card>
    )
}

export const Authenticate = () => {

    const navigate = useNavigate();

    const { LogIn, LogOut } = userAuthenticationStatusContainer();

    const [UserEmail, setUserEmail] = useState("");
    const [UserPassword, setUserPassword] = useState("");

    const loginUser = async (e) => {
        console.log(`loginUser`);
        e.preventDefault();
        try {
            const response = await axiosClient.post('user/authentication',
                {
                    UserPassword,
                    UserEmail
                }
            );
            console.log(response);
            alert(`HttpStatus:${response.status} Response text::[${response.data.text}]`);
            LogIn(UserEmail);
            navigate("/home");
        } catch (error) {
            console.log(error);
            alert(`HttpStatus:${error.response.status} Response text::[${error.response.data.text}]`);
            LogOut();
        }
    }

    return (
        <CenteredCard>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label htmlFor="E-mail">E-mail:</label>
                    </div>
                    <div className="col-8">
                        <input id="E-mail" type="email" required onChange={(e) => { setUserEmail(e.target.value); }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className="col-8">
                        <input id="password" type="password" required onChange={(e) => { setUserPassword(e.target.value); }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="button" className="btn btn-primary m-2" onClick={(e) => loginUser(e)}>Login</button>
                    </div>
                    <div className="col">
                        <Link to="/register">Registration</Link>
                    </div>
                </div>
            </div>
        </CenteredCard>
);

}