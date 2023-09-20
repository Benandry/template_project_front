import { ChangeEvent, FormEvent, useState } from "react";
import { ISubscription } from "../../../interfaces/Iuser/ISubscription";
import "./registerComponent.css";
import { postUser } from "../../../helpers/PostUser";
import { passwordValidator } from "../../../helpers/ValidationPassword";
import { useNavigate } from "react-router-dom";
import { postImage } from "../../../helpers/postImage";

const RegisterComponent = () => {
  // State for data

  const [userDataRegister, setUserDataRegister] = useState<ISubscription>({
    imageUrl: "",
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
  const [imageUser, setImageUser] = useState<File | null>();
  const navigate = useNavigate();

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const imageFile = files[0];
      setImageUser(imageFile);
    }
  };

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataRegister({ ...userDataRegister, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageUser) {
      alert("Please enter a image name");
      return;
    }
    const response = await postImage(imageUser);
    if (response.success) {
      setUserDataRegister({
        ...userDataRegister,
        imageUrl: response.imageName,
      });

      try {
        if (passwordValidator(userDataRegister)) {
          await postUser(userDataRegister);
          navigate("/home");
        } else {
          alert("Password must be at least 8 characters long");
        }
      } catch (error) {
        console.log(error);
        alert("Missing password");
      }
    } else {
      alert("response.message)");
    }
  };
  return (
    <div className="register__screen__content">
      <div className="content_form">
        <div className="title_">
          <h3>S’inscrire</h3>
        </div>
        <div className="image_label">
          <div className="image__user">
            <img
              src={
                imageUser
                  ? URL.createObjectURL(imageUser)
                  : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }
              alt="Image user"
              className="avatar"
            />
          </div>
          <div className="label_photo">
            {" "}
            <label htmlFor="input__file">
              <i className="icon_img fas fa-camera"></i>
            </label>
          </div>
        </div>
        <form
          className="register__form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="field_content">
            <div className="col_form">
              <div className="field__file">
                <input
                  className="input_field_file"
                  type="file"
                  placeholder="Nom "
                  id="input__file"
                  name="imageUrl"
                  accept="image/*"
                  onChange={handleUploadImage}
                  required
                />
              </div>

              <div className="register__field">
                <input
                  type="text"
                  className="input_field"
                  placeholder="Nom "
                  name="first_name"
                  value={userDataRegister.first_name}
                  onChange={handleChangeField}
                  required
                />
              </div>
              <div className="register__field">
                <input
                  type="text"
                  className="input_field"
                  placeholder="Prenom"
                  name="last_name"
                  value={userDataRegister.last_name}
                  onChange={handleChangeField}
                  required
                />
              </div>
              <div className="register__field">
                <input
                  type="text"
                  className="input_field"
                  placeholder="Pseudo"
                  name="username"
                  value={userDataRegister.username}
                  onChange={handleChangeField}
                  required
                />
              </div>

              <div className="register__field">
                <input
                  type="date"
                  className="input_field"
                  placeholder="Date de naissance "
                  name="birth"
                  value={userDataRegister.birth as string}
                  onChange={handleChangeField}
                  required
                />
              </div>
            </div>
            <div className="col_form">
              <div className="register__field">
                <input
                  type="text"
                  className="input_field"
                  placeholder="Genre"
                  name="gender"
                  value={userDataRegister.gender}
                  onChange={handleChangeField}
                  required
                />
              </div>

              <div className="register__field">
                <input
                  type="email"
                  className="input_field"
                  placeholder="Email"
                  name="email"
                  value={userDataRegister.email}
                  onChange={handleChangeField}
                  required
                />
              </div>

              <div className="register__field">
                <input
                  type="text"
                  className="input_field"
                  placeholder="Role"
                  name="role"
                  value={userDataRegister.role}
                  onChange={handleChangeField}
                  required
                />
              </div>

              <div className="register__field">
                <input
                  type="password"
                  className="input_field"
                  placeholder="Mot de passe"
                  name="password"
                  value={userDataRegister.password}
                  onChange={handleChangeField}
                  required
                />
              </div>

              <div className="register__field">
                <input
                  type="password"
                  className="input_field"
                  placeholder="Confirmation de mot de passe"
                  name="password_confirmation"
                  value={userDataRegister.password_confirmation}
                  onChange={handleChangeField}
                  required
                />
              </div>
            </div>
          </div>
          <button className="btn">
            <span className="button__text">Enregister</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
