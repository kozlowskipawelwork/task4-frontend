import { Card, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import { axiosClient } from "../services/axios-client";

const CenteredCard = (props) => {
    return (
        <Card sx={{ mx: 'auto', width: '30vw', mt: 8 }}>
            <CardHeader title={<h3 className='d-flex justify-content-center'>Registration</h3>}>
            </CardHeader>
            {props.children}
        </Card>
    )
}

export const Register = () => {

    const navigate = useNavigate();
    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [UserPassword, setUserPassword] = useState("");

    const registerUser = async (e) => {
        console.log(`registerUser`);
        e.preventDefault();
        try {
            const response = await axiosClient.post('user',
                {
                    UserName,
                    UserPassword,
                    UserEmail,
                    LastLoginTime: null,
                    RegistrationTime: new Date(),
                    UserStatus: 1,
                }
            );
            console.log(response);
            alert(`HttpStatus:${response.status} Response text::[${response.data.text}]`);
            navigate("/home");
        } catch (error) {
            console.log(error);
            alert(`HttpStatus:${error.response.status} Response text::[${error.response.data.text}]`);
        }
    }

    return (
        <CenteredCard>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label htmlFor="Name">Name:</label>
                    </div>
                    <div className="col-8">
                        <input id="Name" type="text" required onChange={(e) => { setUserName(e.target.value); }} />
                    </div>
                </div>
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
                        <button type="button" className="btn btn-primary m-2" onClick={(e) => registerUser(e)}>Register</button>
                    </div>
                </div>
            </div>
        </CenteredCard>
    );

}