import { FC, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appQuery } from "../../Hooks/Hooks";
import { IUserData } from "../../interfaces/Iuser/IUserData";
import { formttedDate } from "../../helpers/formateDate";
import axios from "axios";
import { getToken } from "../../helpers/getToken";

const UserEdit: FC = () => {
  const [_user, setUser] = useState<IUserData>({
    _id: "",
    first_name: "",
    last_name: "",
    username: "",
    birth: "",
    gender: "",
    email: "",
    role: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  if (id) {
    const fetchDataUser = async () => {
      const data = await appQuery("GET", `user/${id}`);
      setUser(data);
    };
    useEffect(() => {
      fetchDataUser();
    }, []);
  }

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ..._user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const api_url: string = `http://localhost:9000/user/edit/${id}`;
      const token: string | null = getToken();
      const response = await fetch(api_url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(_user),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/home");
      } else {
        alert("error");
      }
    } catch (error) {
      console.log(error);
      alert("Missing password");
    }
  };

  return (
    <form className="register__form" onSubmit={handleSubmit}>
      <div className="register__field">
        <i className="login__icon fas fa-user"></i>
        <input
          type="text"
          placeholder="Nom "
          name="first_name"
          value={_user?.first_name}
          onChange={handleChangeField}
          required
        />
      </div>
      <div className="register__field">
        <i className="login__icon fas fa-lock"></i>
        <input
          type="text"
          className="register__input"
          placeholder="Prenom"
          name="last_name"
          value={_user?.last_name}
          onChange={handleChangeField}
          required
        />
      </div>
      <div className="register__field">
        <i className="login__icon fas fa-lock"></i>
        <input
          type="text"
          className="register__input"
          placeholder="Pseudo"
          name="username"
          value={_user?.username}
          onChange={handleChangeField}
          required
        />
      </div>

      <div className="register__input">
        <i className="login__icon fas fa-lock"></i>
        <input
          type="date"
          className="register__input"
          placeholder="Date de naissance "
          name="birth"
          value={formttedDate(_user?.birth)}
          onChange={handleChangeField}
          required
        />
      </div>

      <div className="register__field">
        <i className="login__icon fas fa-lock"></i>
        <input
          type="text"
          className="register__input"
          placeholder="Genre"
          name="gender"
          value={_user?.gender}
          onChange={handleChangeField}
          required
        />
      </div>

      <div className="register__field">
        <i className="login__icon fas fa-lock"></i>
        <input
          type="email"
          className="register__input"
          placeholder="Email"
          name="email"
          value={_user?.email}
          onChange={handleChangeField}
          required
        />
      </div>

      <div className="register__field">
        <i className="login__icon fas fa-lock"></i>
        <input
          type="text"
          className="register__input"
          placeholder="Role"
          name="role"
          value={_user?.role}
          onChange={handleChangeField}
          required
        />
      </div>

      <button className="btn">
        <span className="button__text">Enregister</span>
        <i className="button__icon fas fa-chevron-right"></i>
      </button>
    </form>
  );
};

export default UserEdit;
