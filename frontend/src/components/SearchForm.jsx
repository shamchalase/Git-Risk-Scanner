import { useState } from "react";

function SearchForm({ onSearch }) {
  const [username, setUsername] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    onSearch(username);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="GitLab Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button type="submit">
        Scan
      </button>
    </form>
  );
}

export default SearchForm;