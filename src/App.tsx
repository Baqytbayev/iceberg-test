import React from 'react';
import './App.css';
import {useQuery} from "react-query";
import {GetUsers} from "./api/getUsers";
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  image: string;
}

interface Data {
  users: User[];
  total: number;
  limit: number;
  skip: number;
}

const App = () => {
  const {data, isLoading, error} = useQuery<Data>([
    'getUsers', {limit: 10}
  ], () => GetUsers({limit: 10}))
  console.log(data)
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error loading popular products</div>;
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Фото</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Дата рождения</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar src={user.image} alt={`${user.firstName} ${user.lastName}`} />
              </TableCell>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{new Date(user.birthDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
