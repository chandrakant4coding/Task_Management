import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodoById } from "../hooks/useApi";
import { Typography, Button } from "antd";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTodoById(id);
        console.log("response id:", response);
        setTask(response);
        setLoading(false);
      } catch (err) {
        setError("Error fetching task details");
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        type="primary"
        onClick={() => window.history.back()}
        style={{ position: "absolute", left: "50px", top: "20px" }}
      >
        Go Back
      </Button>
      <Typography.Title level={2}>Task Details</Typography.Title>
      <div
        style={{
          width: "80vw",
          background: "#fff",
          padding: "40px",
          boxShadow: "10px 10px 10px #e2e3e3",
        }}
      >
        <Typography.Paragraph>
          <Typography.Title level={4}>Title: </Typography.Title>
          {task?.title}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Title level={4}>Description: </Typography.Title>
          {task?.description}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Title level={4}>Status: </Typography.Title>
          {task?.status}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default TaskDetail;
