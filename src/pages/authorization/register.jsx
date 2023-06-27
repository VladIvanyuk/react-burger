import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../../components/app-header/app-header";
import styles from "./authorization.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerRequest } from "../../utils/burger-api";

export const Register = (props) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const register = () => {
    registerRequest({
      email: emailValue,
      name: nameValue,
      password: passwordValue,
    });
  };

  return (
    <>
      <AppHeader />
      <main className={`${styles.window} container main`}>
        <div className={styles.mainBlock}>
          <h3 className={`${styles.title} text text_type_main-medium mb-6`}>
            Регистрация
          </h3>
          <Input
            value={nameValue}
            placeholder="Имя"
            name={"name"}
            extraClass="mb-6"
            onChange={(e) => setNameValue(e.target.value)}
          />
          <EmailInput
            value={emailValue}
            name={"email"}
            extraClass="mb-6"
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <PasswordInput
            value={passwordValue}
            name={"password"}
            extraClass="mb-6"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mb-20"
            onClick={register}
          >
            Зарегистрироваться
          </Button>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Уже зарегистрированы?{" "}
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};
