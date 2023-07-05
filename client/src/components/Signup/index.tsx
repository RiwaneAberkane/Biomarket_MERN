import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";

interface FormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const Signup: React.FC = () => {
  const [data, setData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData((prevState) => ({
      ...prevState,
      role: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/api/auth/signup";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
      toast.success("Utilisateur créé avec succès !");
    } catch (error: any) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        const responseData = error.response.data as { message: string };
        setError(responseData.message);
      }
    }
  };

  const isAxiosError = (error: any): error is AxiosError => {
    return error.isAxiosError !== undefined;
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Créer un compte</h1>
            <input
              type="text"
              placeholder="Surnom"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="employees"
                  checked={data.role === "employees"}
                  onChange={handleRoleChange}
                  required
                />
                Employé
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="manager"
                  checked={data.role === "manager"}
                  onChange={handleRoleChange}
                  required
                />
                Manager
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={data.role === "admin"}
                  onChange={handleRoleChange}
                  required
                />
                Admin
              </label>
            </div>

            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Inscription
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
