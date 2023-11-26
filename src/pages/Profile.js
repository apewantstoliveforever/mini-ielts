import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Card, Typography } from "antd";
import './Profile.css'
import UserService from "../services/user.service"


const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [userResults, setUserResults] = useState([]);
    const [exercisesCompleted, setExercisesCompleted] = useState(0);
    const [averageScore, setAverageScore] = useState(0);

    useEffect(() => {
        UserService.getUserResults().then(
            (response) => {
                console.log(response.data);
                setUserResults(response.data.results);
                setExercisesCompleted(response.data.results.length);
                let sum = 0;
                response.data.results.forEach(result => {
                    sum += result.point;
                });
                setAverageScore(sum / response.data.results.length);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);
    useEffect(() => {
        console.log(userResults);
    }, [userResults]);
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
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
                    {
                        userResults.map((result, index) => (
                            <div key={index}>
                                <Typography.Paragraph>Exercise {result.post_id}: {result.point}%</Typography.Paragraph>
                            </div>
                        ))
                    }
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
