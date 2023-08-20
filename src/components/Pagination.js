import { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
const Pagination = () => {
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  //Calculate Pages
  const numOfPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(numOfPages + 1).keys()].slice(1);

  //Logic for pagination
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  console.log(visibleTodos);
  const prevHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const nextHandler = () => {
    if (currentPage !== numOfPages) setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  });

  return (
    <>
      <h3>Select Number of Todos per page</h3>
      <select onChange={(e) => setTodosPerPage(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
      <ol>
        {visibleTodos.map((todo) => (
          <li key={todo.title}>{todo.title}</li>
        ))}
      </ol>
      <hr />
      <p>
        <button onClick={prevHandler}>Prev</button>
        {pages.map((page) => (
          <span
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${currentPage === page ? "active" : ""}`}
          >
            {page + " | "}
          </span>
        ))}
        <button onClick={nextHandler}>Next</button>
      </p>
    </>
  );
};

export default Pagination;
