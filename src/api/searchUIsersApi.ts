import api from "./api";
import { User } from "@/features/SearchUsers.type";

export const fetchUsers = (query: string) => {
  const params = {
    per_page: 100,
  };

  return api
    .get<{ items: User[] }>(`/search/users?q=${query}+in:login`, {
      params: params,
    })
    .then((res) => res.data.items);
};
