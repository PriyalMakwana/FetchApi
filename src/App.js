import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file

const App = () => {
  const [data, setData] = useState([]);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    try {
      fetch("https://api.github.com/users")
        .then((res) => {
          res.json().then((result) => {
            setData(result);
            setRecord(result);
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const Filter = (e) => {
    let filterdata = data.filter((f) =>
      f.login.toLowerCase().includes(e.target.value)
    );
    setRecord(filterdata);
  };

  return (
    <div className="app-container">
      <input type='text' onChange={Filter} placeholder='Search' className="search-input" />
      <div className="card-container">
        {record.map((item, i) => (
          <div className="card" key={i}>
            <img src={item.avatar_url} alt={item.login} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.login}</h5>
              <p className="card-text"><strong>ID:</strong> {item.id}</p>
              <p className="card-text"><strong>Node ID:</strong> {item.node_id}</p>
              <p className="card-text"><strong>Org URL:</strong> {item.organizations_url}</p>
              <p className="card-text"><strong>Repos URL:</strong> {item.repos_url}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
