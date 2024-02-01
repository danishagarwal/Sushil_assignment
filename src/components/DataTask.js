import React, { useEffect, useState } from "react";

const DataTask = () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]); //All users
  const [sortOrder, setSortOrder] = useState("asc"); //Sorting order asc/desc
  const [searchText, setSearchText] = useState(""); //Searching
  const [currentPage, setCurrentPage] = useState(1); //Pagination
  const usersPerPage = 5;

  //Getting data from API
  const getUserData = async () => {
    const data = await fetch(url);
    const response = await data.json();
    setUsers(response);
  };
  console.log(users);
  useEffect(() => {
    getUserData();
  }, []);

  //Function for sorting with name
  const handleSort = () => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //Searching
  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText)
  );

  //Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1>User Data</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={handleSort}>Name</th>
            <th>Email</th>
            <th>Adress</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="5">No users match the search.</td>
            </tr>
          ) : (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.address.suite}, {user.address.street},{" "}
                  {user.address.city}, {user.address.zipcode}
                </td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
              </tr>
            ))
          )}
          {}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTask;
