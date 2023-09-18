import { ChangeEvent, FC, useState, useEffect } from "react";
import "./loginComponent.css";
import {
  IUserDataInfo,
  IUserLogin,
} from "../../../interfaces/Iuser/IUserLogin";
import { postLogin } from "../../../helpers/PostLogin";
import { save } from "../../../helpers/SaveDataUser";
import { useNavigate } from "react-router-dom";
import { removeSession } from "../../../helpers/removeSession";
import { Link } from "react-router-dom";

const LoginComponent: FC = () => {
  // State for login
  const [userData, setUserData] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Vous pouvez accéder aux données dans formData ici et les soumettre au serveur ou les traiter localement.
    try {
      const data = await postLogin(userData);
      const { username, email, token } = data;
      const userInfo: IUserDataInfo = {
        username,
        email,
        token,
      };

      const saved = save(userInfo);

      if (saved) {
        alert(saved);
        const dataInfo = sessionStorage.getItem("dataUser");
        console.log("dataInfo", dataInfo);
        navigate("/home");
      }
    } catch (error) {
      alert("Errerur");
      console.log(error);
    }
  };

  useEffect(() => {
    removeSession();
  }, []);

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChangeField}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={userData.password}
                name="password"
                onChange={handleChangeField}
              />
            </div>
            <button className="button login__submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a>
            </div>
          </div>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <Link to="/register"> Register</Link>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
