import React, {useState} from 'react';
import './App.css';
import {useQuery} from "react-query";
import {GetUsers} from "./api/getUsers";
import {
  Avatar,
  CircularProgress,
  Pagination,
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
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = useQuery<Data>(
    ['getUsers', page, limit],
    () => GetUsers({ limit, page }),
    {
      keepPreviousData: true,
    }
  );
  const changePage = ()=> {
    setPage(page + 1);
  }
  if (isLoading) {
    return <div><CircularProgress/></div>;
  }
  
  if (error) {
    return <div>Ошибка данных</div>;
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
          {data?.users.map((user: User) => (
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
      <Pagination
        count={data?.total ? Math.ceil(data.total / limit) : 0}
        page={page}
        onChange={() => changePage()}
        style={{ margin: '20px auto', display: 'flex', justifyContent: 'center' }}
      />
    </TableContainer>
  );
}

export default App;
