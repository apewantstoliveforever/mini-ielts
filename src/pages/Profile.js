import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Card, Typography } from "antd";
import './Profile.css'

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    const exercisesCompleted = 50;
    const workoutHistory = ["Exercise 1", "Exercise 2", "Exercise 3"];
    const averageScore = 85;

    return (
        <div className="ProfilePage">
            <Card
                style={{
                    width: "400px",
                    margin: "auto",
                    marginTop: "50px",
                    textAlign: "center",
                }}
                title="Profile"
            >
                <Avatar style={{ marginBottom: "20px" }} size={64} src={currentUser.photoURL} alt="profile" />
                <Typography.Title level={3}>{currentUser.displayName}</Typography.Title>
                <Typography.Paragraph>Email: {currentUser.email}</Typography.Paragraph>
                <Typography.Paragraph>
                    Token: {currentUser.token.substring(0, 20)} ... {currentUser.token.substr(currentUser.token.length - 20)}
                </Typography.Paragraph>

                <div style={{ marginTop: "20px" }}>
                    <Typography.Title level={4}>Exercise Statistics</Typography.Title>
                    <Typography.Paragraph>Exercises Completed: {exercisesCompleted}</Typography.Paragraph>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <Typography.Title level={4}>Workout History</Typography.Title>
                    <ul>
                        {workoutHistory.map((exercise, index) => (
                            <li key={index}>{exercise}</li>
                        ))}
                    </ul>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <Typography.Title level={4}>Average Score</Typography.Title>
                    <Typography.Paragraph>Average Score: {averageScore}%</Typography.Paragraph>
                </div>
            </Card>
        </div>
    );
};

export default Profile;
