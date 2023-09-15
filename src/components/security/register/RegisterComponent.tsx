import { ChangeEvent, FormEvent, useState } from "react";
import { ISubscription } from "../../../interfaces/ISubscription";
import "./registerComponent.css";
import { postUser } from "../../../helpers/PostUser";
import { passwordValidator } from "../../../helpers/ValidationPassword";

const RegisterComponent = () => {
  // State for data
  const [userDataRegister, setUserDataRegister] = useState<ISubscription>({
    first_name: "",
    last_name: "",
    username: "",
    birth: new Date(),
    gender: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataRegister({ ...userDataRegister, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (passwordValidator(userDataRegister)) {
        await postUser(userDataRegister);
      }
    } catch (error) {
      console.log(error);
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
          value={userDataRegister.first_name}
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
          value={userDataRegister.last_name}
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
          value={userDataRegister.username}
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
          value={userDataRegister.birth as string}
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
          value={userDataRegister.gender}
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
          value={userDataRegister.email}
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
          value={userDataRegister.role}
          onChange={handleChangeField}
          required
        />
      </div>

      <div className="register__field">
        <i className="login__icon fas fa-lock"></i>
        <input
          type="password"
          className="register__input"
          placeholder="Mot de passe"
          name="password"
          value={userDataRegister.password}
          onChange={handleChangeField}
          required
        />
      </div>

      <div className="register__field">
        <i className="login__icon fas fa-lock"></i>
        <input
          type="password"
          className="register__input"
          placeholder="Confirmation de mot de passe"
          name="password_confirmation"
          value={userDataRegister.password_confirmation}
          onChange={handleChangeField}
          required
        />
      </div>

      <button className="button register__submit">
        <span className="button__text">Enregister</span>
        <i className="button__icon fas fa-chevron-right"></i>
      </button>
    </form>
  );
};

export default RegisterComponent;
