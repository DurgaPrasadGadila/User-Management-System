import React, { useEffect, useState } from "react";
import "./RemovedUsers.css";
import axios from "axios";

function RemovedUsers() {
  //deleted users state
  let [deletedUsers, setDeletedUsers] = useState([]);
  //error state
  let [error, setError] = useState("");
  useEffect(() => {
    getRemovedUsers();
  }, []);

  //get removed users
  const getRemovedUsers = () => {
    axios
      .get("http://localhost:4000/removedUsers")
      .then((res) => {
        if (res.status === 200) {
          setDeletedUsers(res.data);
        } else {
          throw new Error("Something went wrong in fetcing removed users data");
        }
      })
      .catch((err) => {
        // The client was given an error response (5xx, 4xx)
        if (err.response) {
          //console.log(err.response.data);
          //console.log(err.response.status);
          //console.log(err.response.headers);
          setError(err.message);
          // The client never received a response, and the request was never left
        } else if (err.request) {
          setError(err.message);
          // for other errors
        } else {
          setError(err.message);
        }
      });
  };

  //restore user
  const restoreUser = (user) => {
    axios
      .post(`http://localhost:4000/users`, user)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          // remove user from "users"
          axios
            .delete(`http://localhost:4000/removedUsers/${user.id}`)
            .then((res) => {
              if (res.status === 200) {
                getRemovedUsers();
              }
            });

          //clear error message
          setError("");
          //  navigate("/users");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        // The client was given an error response (5xx, 4xx)
        if (err.response) {
          setError(err.message);
          // The client never received a response, and the request was never left
        } else if (err.request) {
          setError(err.message);
          // for other errors
        } else {
          setError(err.message);
        }
      });
  };

  //delete user permanently
  let deleteUser=(user)=>{
            axios
            .delete(`http://localhost:4000/removedUsers/${user.id}`)
            .then((res) => {
              if (res.status === 200) {
                getRemovedUsers();
              }
            })
            .catch((err) => {
              // The client was given an error response (5xx, 4xx)
              if (err.response) {
                setError(err.message);
                // The client never received a response, and the request was never left
              } else if (err.request) {
                setError(err.message);
                // for other errors
              } else {
                setError(err.message);
              }
            });
  }

  return (
    <div className="removed-users">
      {/* errors data display */}
      {error.length!==0 && (<p className='text-danger fw-bold display-2 text-center'>{error}</p>)}
      <p className="display-2 text-center fw-bold text-white-50 ">Removed Users</p>
      {deletedUsers.length === 0 ? (
        <div className="text-center text-warning display-3 mt-5">
         
          <div>
            <h1 className="text-center text-danger">Empty!!!</h1>
          </div>
        </div>
      ) : (
        <ul className="removed-users-list">
          {deletedUsers.map((user) => (
            <li key={user.id}>
              <span>
                <span>
                  <img
                    src={user.image}
                    width="70px"
                    height="70px"
                    alt=""
                    className="removed-user-image"
                  />
                </span>
                <span className="removed-user-name">{user.name}</span>
              </span>
              <span>
                {/* restore user button */}
                <button
                  className="user-restore-btn"
                  onClick={() => restoreUser(user)}
                >
                  Restore
                </button>

                {/* delete user button */}
                <button
                  className="user-restore-btn ms-3 text-danger bg-light fs-6"
                  onClick={() => deleteUser(user)}
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RemovedUsers;