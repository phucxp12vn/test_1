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

const dummyData = [
  {
    login: "octocat",
    id: 1,
    node_id: "MDQ6VXNlcjE=",
    avatar_url: "https://avatars.githubusercontent.com/u/1272629?s=80&v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/octocat",
    html_url: "https://github.com/octocat",
    followers_url: "https://api.github.com/users/octocat/followers",
    following_url:
      "https://api.github.com/users/octocat/following{/other_user}",
    gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
    starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
    organizations_url: "https://api.github.com/users/octocat/orgs",
    repos_url: "https://api.github.com/users/octocat/repos",
    events_url: "https://api.github.com/users/octocat/events{/privacy}",
    received_events_url: "https://api.github.com/users/octocat/received_events",
    type: "User",
    site_admin: false,
  },
];

function SearchUsers() {
  const [inputQuery, setInputQuery] = useState("");
  const [users, setUsers] = useState(dummyData);

  const handleSearchUser = (data: string) => {
    console.log("Call api", data);
  };

  const searchDebounceFn = useMemo(() => _.debounce(handleSearchUser, 700), []);

  const handleInputQueryUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputQuery(value);

    if (value.length >= 3) {
      searchDebounceFn(value);
    }

    if (value.length === 0) {
      setUsers([]);
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
