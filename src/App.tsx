import React from 'react';
import './App.css';
import {useQuery} from "react-query";
import {GetUsers} from "./api/getUsers";

const App = () => {
  const {data, isLoading, error} = useQuery([
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
    <div className="App">
      Hello
    </div>
  );
}

export default App;
