import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../constants";

export function getTodoList() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/tasks`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch Todo list");
      }
      return response.data;
    },
  });
}

export function AddTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await axios.post(`${API_URL}/tasks/add`, payload);
      if (response.status !== 200) {
        throw new Error("Failed to fetch Todo list");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
}

export function updateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id, ...payload }) => {
      const response = await axios.put(`${API_URL}/tasks/${_id}`, payload);

      if (response.status !== 200) {
        throw new Error("Failed to update Todo");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
}

export function deleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${API_URL}/tasks/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
}

export function getTodoByStatus(status) {
  return useQuery({
    queryKey: ["todos", status],
    queryFn: async () => {
      const response =
        status !== ""
          ? await axios.get(`${API_URL}/tasks/status?status=${status}`)
          : await axios.get(`${API_URL}/tasks`);
      return response.data;
    },
  });
}

export const getTodoById = async (id) => {
  const response = await axios.get(`${API_URL}/tasks`);
  console.log("response is:", response);
  const data = response?.data?.filter((res) => res?._id === id);
  return data[0];
};
