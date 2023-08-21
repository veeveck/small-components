import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import "../styles.css";

const AutoSuggestion = () => {
  const [visibleArea, setVisibleArea] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const inputRef = useRef();
  const suggestionRef = useRef();
  const debouncedFetchUsers = useCallback(
    debounce((query) => {
      fetchUsers(query);
    }, 300),
    []
  );
  const fetchUsers = async (query) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const filteredUsers = response.data.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (value) {
      debouncedFetchUsers(value);
    } else {
      setUsers([]);
    }
  };
  const handleClick = (name) => {
    setInputValue(name);
    setUsers([]);
    setVisibleArea(false);
  };
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== inputRef.current && e.target !== suggestionRef.current) {
        setVisibleArea(false);
      }
    });
    return () => {
      window.removeEventListener("click", () => {});
    };
  });
  return (
    <main>
      <input
        type="text"
        name="search"
        placeholder="Search"
        id="search"
        value={inputValue}
        ref={inputRef}
        onChange={handleChange}
        onFocus={() => setVisibleArea(true)}
      />
      {visibleArea && (
        <div id="suggestion-area" ref={suggestionRef}>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleClick(user.name)}>
              {user.name}
            </li>
          ))}
        </div>
      )}
    </main>
  );
};
export default AutoSuggestion;
