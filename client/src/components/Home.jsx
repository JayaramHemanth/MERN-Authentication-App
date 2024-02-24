import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get("http://localhost:3000/user/getData")
      .then((result) => setData(result.data.data))
      .catch((error) => console.error("Error fetching data: ", error));
  };

  const getData =async () => {
    await axios
      .post("http://localhost:3000/authentication/getInfo",
      {},
      {
        headers:{
          Authorization:"Bearer " + localStorage.getItem("token"),
        },
      }
      )
      .then((result) => setUserInfo(result.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    getData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/user/deleteUser/" + id)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          fetchData();
        } else {
          toast.error(res.data.error);
        }
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 bg-light sidebar">
          <div className="position-sticky">
            <h4>Dashboard</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <div className="d-flex flex-column align-items-center">
                    <div>Hello,{userInfo.name}</div> 
                  </div>
                </a>
              </li>
            </ul>
          </div>
          {/* Logout Button */}
          {!isLoggedIn ? (
            <button
              className="btn btn-danger btn-sm mt-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button className="btn btn-danger btn-sm mt-auto">Login</button>
          )}
        </nav>

        {/* Main Content */}
        <main
          role="main"
          className="col-md-9 ml-sm-auto col-lg-10 px-md-4 main-content"
        >
          <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
            <h2>User Data</h2>
            <Link to="/createuser" className="btn btn-success">
              Add User
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {data?.map((item, index) => (
              <div className="col" key={index}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.email}</p>
                    <p className="card-text">{item.age}</p>
                    <div className="d-flex justify-content-end">
                      <Link
                        to={`/update/${item._id}`}
                        className="btn btn-primary me-2"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
