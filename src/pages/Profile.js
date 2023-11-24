//Profile.js

import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    console.log(currentUser);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h3>
                <strong>{currentUser.email}</strong> Profile
            </h3>
            <p>
                Profile image
                <img
                    src={currentUser.photoURL}
                    alt="profile"
                    style={{ width: "100px" }}
                />
            </p>
            <p>
                <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
                {currentUser.token.substr(currentUser.token.length - 20)}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
        </div>
    );
};

export default Profile;
