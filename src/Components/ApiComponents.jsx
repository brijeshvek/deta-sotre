import React, { useState, useEffect } from "react";
import axios from "axios";

function ApiComponents() {
  const [data, setData] = useState({
    name: "",
    age: "",
  });
  const [userData, setUserData] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const SaveData = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      let result = await axios.post(
        // any call like get
        "http://localhost:4000/user", // your URL
        {
          // data if post, put
          data,
        }
      );
      console.log(result.response.data);
    } catch (error) {
      console.error(error); // NOTE - use "error.response.data` (not "error")
    }
    // await axios
    //   .post("http://localhost:4000/user", data)
    //   .then((res) => setData(res.data))
    //   .catch((err) => console.log(err));
    fetchData();
  };
  const fetchData = () => {
    axios
      .get("http://localhost:4000/user")
      .then((res) => setUserData(res.data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <form action="#" method="post" onSubmit={SaveData}>
        <label htmlFor="">Name:</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <label htmlFor="">Age :</label>
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={handleChange}
        />
        <input type="submit" value="Save Data" />
      </form>
      <table>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Phone</td>
          <td>Email</td>
        </tr>
        {userData.map((i) => {
          return (
            <tr>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.phone}</td>
              <td>{i.email}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}

export default ApiComponents;
