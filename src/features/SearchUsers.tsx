import { useState, useMemo } from "react";
import _ from "lodash";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  TextField,
  Box,
} from "@mui/material";

import { fetchUsers, clearUsers } from './SearchUsersSlice';
import { useAppDispatch, useAppSelector } from "@/store/hook";

function SearchUsers() {
  const [inputQuery, setInputQuery] = useState("");

  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.users)


  const handleSearchUser = (data: string) => {
    dispatch(fetchUsers(data));
  };

  const searchDebounceFn = useMemo(() => _.debounce(handleSearchUser, 700), []);

  const handleInputQueryUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputQuery(value);

    if (value.length >= 3) {
      searchDebounceFn(value);
    }

    if (value.length === 0) {
      dispatch(clearUsers());
    }
  };

  return (
    <>
      <Box mb={2}>Search Github Users</Box>
      <TextField
        size="small"
        id="search-field"
        label="Search users"
        variant="outlined"
        value={inputQuery}
        onChange={handleInputQueryUser}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar
                    alt={`avatar of user ${user.login}`}
                    src={user.avatar_url}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.login}
                </TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell align="right">{100}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SearchUsers;
