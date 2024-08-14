import React, { useState } from "react";
import styled from "styled-components";
import { getTodoList, deleteTodo, getTodoByStatus } from "../hooks/useApi";
import { Link } from "react-router-dom";
import { Button, Empty, Typography, Modal } from "antd";
import { Trash, PencilLine } from "@phosphor-icons/react";

const TaskList = ({ handleEdit, status }) => {
  const { data, isLoading, error } = getTodoByStatus(status);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const EmptyTable = () => (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={<Typography.Text>No Task to show</Typography.Text>}
    />
  );

  const deleteMutation = deleteTodo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  function handleDeleteConfirm(id) {
    setTaskIdToDelete(id);
    setIsModalVisible(true);
  }

  function handleDelete() {
    if (taskIdToDelete) {
      deleteMutation.mutate(taskIdToDelete);
      setIsModalVisible(false);
      setTaskIdToDelete(null);
    }
  }

  function handleCancel() {
    setIsModalVisible(false);
    setTaskIdToDelete(null);
  }

  return (
    <WrapperList>
      {data.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Task Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((todo) => (
              <tr key={todo._id}>
                <td>{todo?.title}</td>
                <td>{todo?.description}</td>
                <td>{todo?.status}</td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <PencilLine
                    size={15}
                    onClick={() => handleEdit(todo)}
                    style={{ color: "#dddd22", cursor: "pointer" }}
                  />
                  <Trash
                    size={15}
                    onClick={() => handleDeleteConfirm(todo._id)}
                    style={{ color: "#e35050", cursor: "pointer" }}
                  />
                  <Link to={`/${todo._id}`} style={{ textDecoration: "none" }}>
                    {" "}
                    <button
                      style={{
                        background: "#000",
                        color: "#fff",
                        border: "none",
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyTable />
      )}

      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </WrapperList>
  );
};

export default TaskList;

const WrapperList = styled.div`
  margin-top: 100px;
  margin-right: 20px;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th,
  td {
    padding: 10px;
    border: 1px solid #0a8fe1;
  }

  th {
    background-color: #56b5f0;
  }
  td {
    background-color: #fff;
  }

  button {
    margin-right: 5px;
  }

  @media (max-width: 768px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
      width: 100%;
    }

    th,
    td {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }

    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      margin-bottom: 15px;
    }

    td::before {
      content: attr(data-label);
      font-weight: bold;
      width: 40%;
      display: inline-block;
    }

    td:last-child {
      border-bottom: 1px solid #0a8fe1;
    }
  }
`;
