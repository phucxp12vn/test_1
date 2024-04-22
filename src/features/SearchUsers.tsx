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
  CircularProgress,
} from "@mui/material";

import { fetchUsers, clearUsers, ApiStatusEnum } from "./SearchUsersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

function DisplayUserTable() {
  const users = useAppSelector((state) => state.users.users);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
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
              <TableCell align="right">{user.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SearchUsers() {
  const [inputQuery, setInputQuery] = useState("");
  const fetchUsersStatus = useAppSelector(
    (state) => state.users.fetchUsersStatus
  );
  const dispatch = useAppDispatch();

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
      <Box mb={2}>
        <Box mb={2}>Search Github Users</Box>
        <TextField
          size="small"
          id="search-field"
          label="Search users"
          variant="outlined"
          value={inputQuery}
          onChange={handleInputQueryUser}
        />
      </Box>
      {fetchUsersStatus === ApiStatusEnum.PENDING && <CircularProgress />}
      {fetchUsersStatus === ApiStatusEnum.SUCCESS && (
        <Box>
          <DisplayUserTable />
        </Box>
      )}
      {fetchUsersStatus === ApiStatusEnum.ERROR && (
        <p>There was a problem searching users</p>
      )}
    </>
  );
}

export default SearchUsers;
