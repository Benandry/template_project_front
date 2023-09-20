import React, { useState, useEffect } from "react";
import "./homeContainer.css";
import { Link } from "react-router-dom";
import { appQuery } from "../../Hooks/Hooks";
import { IUserData } from "../../interfaces/Iuser/IUserData";
import Thumbnail from "./Thumbnail";

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
    if (confirm("Are you sure you want to delete")) {
      await appQuery("DELETE", `user/delete/${_id}`);
      fetchDataUser();
    } else {
      console.log("Annulé");
    }
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
              <th>Image </th>
              <th>Nom </th>
              <th>Prenom </th>
              <th>Email </th>
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
                  {
                    _id,
                    imageUrl,
                    username,
                    last_name,
                    first_name,
                    birth,
                    role,
                    email,
                  },
                  index
                ) => {
                  return (
                    <tr key={index}>
                      <td>
                        {" "}
                        <Thumbnail
                          src={imageUrl}
                          // src="https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="Thumbnail image"
                        />
                      </td>
                      <td> {first_name}</td>
                      <td> {last_name}</td>
                      <td> {email}</td>
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
