import React, { useState } from 'react';
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [contactInfo, setContactInfo] = useState("");

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      idType,
      idNumber,
      contactInfo,
    };

    setUsers([...users, newUser]);
    setName("");
    setIdType("");
    setIdNumber("");
    setContactInfo("");
  
    fetchData();
  };

  return (
    <>
    <div>
      <h1>User Information</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          ID Type:
          <input
            type="text"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          />
        </label>
        <br />
        <label>
          ID Number:
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contact Info:
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <h2>User List:</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <strong>Name:</strong> {user.name}, <strong>ID Type:</strong>{" "}
              {user.idType}, <strong>ID Number:</strong> {user.idNumber},{" "}
              <strong>Contact Info:</strong> {user.contactInfo}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users to display.</p>
      )}
      <div>
        <h1>Data Fetching Example</h1>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>No data fetched yet.</p>
        )}
      </div>
    </div>
    </>
   
  );
}

export default App;
