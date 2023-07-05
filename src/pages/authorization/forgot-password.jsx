import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppHeader } from '../../components/app-header/app-header';
import styles from './authorization.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkEmailForResetPassword } from '../../utils/burger-api';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = (props) => {
  const [emailValue, setEmailValue] = useState('');
  const navigate = useNavigate();

  const checkEmail = (e) => {
    e.preventDefault();
    checkEmailForResetPassword(emailValue).then(() => {
      localStorage.setItem('visitForgotPage', true);
      navigate('/reset-password');
    }).catch((err) => {
      alert(err.message);
    })
  }

  return (
    <>
      <AppHeader />
      <main className={`${styles.window} container`}>
        <form className={styles.mainBlock} onSubmit={checkEmail}>
          <h3 className={`${styles.title} text text_type_main-medium mb-6`}>Восстановить пароль</h3>
          <EmailInput
            value={emailValue}
            name={'email'}
            extraClass="mb-6"
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
            Восстановить
          </Button>
          <p className='text text_type_main-default text_color_inactive mb-4'>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
        </form>
      </main>
    </>
  );
};