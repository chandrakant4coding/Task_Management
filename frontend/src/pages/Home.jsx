import React, { useState } from "react";
import styled from "styled-components";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { Modal } from "antd";
import { Empty } from "antd";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [status, setStatus] = useState("");

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <Wrapper>
      <div style={{ backgroundColor: "#000", height: "100vh" }}>
        <button
          className="addTask"
          onClick={() => {
            setSelectedTodo(null);
            setIsModalOpen((pre) => !pre);
          }}
        >
          Add new task
        </button>

        <select name="status" id="" onChange={(e) => setStatus(e.target.value)}>
          <option value="">--Select Status--</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen((pre) => !pre)}
        footer={false}
      >
        <TaskForm selectedTodo={selectedTodo} setIsModalOpen={setIsModalOpen} />
      </Modal>

      <TaskList handleEdit={handleEdit} status={status} />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;

  select {
    width: 100%;
    padding: 10px;
    border: none;
    margin-top: 10px;
    font-size: 20px;
  }

  .addTask {
    width: 100%;
    padding: 10px;
    font-size: 20px;
    font-weight: 700;
    color: black;
    background-color: white;
    border: none;
    float: left;
    margin-top: 20px;
    cursor: pointer;
    &:hover {
      background-color: black;
      border: none;
      color: #fff;
    }
  }
`;
