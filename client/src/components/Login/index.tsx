import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useUserContext } from "../context/UserContext";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormData>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { setToken } = useUserContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/api/auth/signin";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.accessToken);
      setToken(res.accessToken);
      navigate("/");
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
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Connectez-vous</h1>
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
              type="password"
              placeholder="Mot de passe"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Connexion
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Bonjour !</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
