import React, { useState, useEffect } from "react";
import "./homeContainer.css";
import { Link } from "react-router-dom";
import { appQuery } from "../../Hooks/Hooks";
import { IUserData } from "../../interfaces/Iuser/IUserData";

const HomeContainer: React.FC = () => {
  const [allUsers, setAllUsers] = useState<IUserData[]>();

  const fetchDataUser = async () => {
    const data = await appQuery("GET", "user");
    setAllUsers(data);
  };
  useEffect(() => {
    fetchDataUser();
  }, []);

  const deleteDataUser = async (_id: string) => {
    console.log("_id", _id);
  };
  return (
    <div className="container_home">
      <div className="bouton_register">
        <Link to="/register">
          {" "}
          <button className=" btn">
            <span className="button__text">Ajouter nouveau user</span>
          </button>
        </Link>
      </div>
      <div className="table_content">
        <table>
          <thead>
            <tr>
              <th>Nom </th>
              <th>Prenom </th>
              <th>Pseudo </th>
              <th>Date de naissance </th>
              <th>Role </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.map(
                (
                  { _id, username, last_name, first_name, birth, role },
                  index
                ) => {
                  return (
                    <tr key={index}>
                      <td> {first_name}</td>
                      <td> {last_name}</td>
                      <td> {username}</td>
                      <td>
                        {" "}
                        {birth instanceof Date
                          ? birth.toLocaleDateString()
                          : birth}
                      </td>
                      <td> {role}</td>
                      <td>
                        <div className="d_flex">
                          {" "}
                          <Link to={`/edit/${_id}`}>
                            <button className=" btn">
                              <span className="button__text">Modifier</span>
                            </button>
                          </Link>
                          <button
                            className=" btn"
                            onClick={() => deleteDataUser(_id)}
                          >
                            <span className="button__text">Supprimer</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeContainer;
