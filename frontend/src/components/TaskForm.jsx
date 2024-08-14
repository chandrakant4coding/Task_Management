import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { AddTodo } from "../hooks/useApi";
import { updateTodo } from "../hooks/useApi";

const TaskForm = ({ selectedTodo, setIsModalOpen }) => {
  const formRef = useRef(null);
  const addMutaion = AddTodo();
  const updateTodoMutaton = updateTodo();
  console.log("selectedTodo", selectedTodo);
  useEffect(() => {
    if (selectedTodo) {
      formRef.current.title.value = selectedTodo.title;
      formRef.current.description.value = selectedTodo.description;
      formRef.current.status.value = selectedTodo.status;
    } else {
      formRef.current.reset();
    }
  }, [selectedTodo]);

  function handleFormSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const todo = Object.fromEntries(formdata.entries());
    if (selectedTodo) {
      updateTodoMutaton.mutate({ _id: selectedTodo?._id, ...todo });
    } else {
      addMutaion.mutate(todo);
    }
    console.log(Object.fromEntries(formdata.entries()));
    setIsModalOpen((pre) => !pre);
  }

  return (
    <Wrapper>
      <Form onSubmit={handleFormSubmit} ref={formRef}>
        <label htmlFor="title">Enter Task</label>
        <input type="text" name="title" id="task" />
        <label htmlFor="description">Enter Description</label>
        <textarea name="description" id="description" />
        <label htmlFor="status">Enter Status</label>
        <select name="status" id="status">
          <option value="">Select status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <ButtonGroup>
          <button type="reset">Reset</button>
          <button type="submit">{selectedTodo ? "Update" : "Add"}</button>
        </ButtonGroup>
      </Form>
    </Wrapper>
  );
};

export default TaskForm;

const Wrapper = styled.div`
  box-sizing: border-box;
  /* background-color: #f0f4f8; */
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  label {
    font-weight: bold;
  }
  input,
  textarea,
  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    resize: vertical;
  }
  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  button[type="reset"] {
    background-color: #ff6b6b;
    color: white;
  }
  button[type="submit"] {
    background-color: #4caf50;
    color: white;
  }
  button:hover {
    opacity: 0.9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
`;
