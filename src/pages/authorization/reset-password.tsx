import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppHeader } from '../../components/app-header/app-header';
import styles from './authorization.module.css';
import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../../utils/burger-api';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const resetPassword = (e: SyntheticEvent): void => {
    e.preventDefault();
    resetPasswordRequest({
      password: password,
      token: code
    }).then(() => {
      localStorage.removeItem('visitForgotPage')
      navigate('/login');
    }).catch((err) => {
      alert(err.message)
    })
  }

  if(!localStorage.getItem('visitForgotPage')) {
    navigate('/forgot-password');
    return null;
  };

  return (
    <>
      <AppHeader />
      <main className={`${styles.window} container`}>
        <form className={styles.mainBlock} onSubmit={resetPassword}>
          <h3 className={`${styles.title} text text_type_main-medium mb-6`}>Восстановить пароль</h3>
          <PasswordInput
            placeholder='Введите новый пароль'
            value={password}
            name={'email'}
            extraClass="mb-6"
            onChange={(e) => setPassword(e.target.value)}
          />
           <Input
            value={code}
            placeholder="Введите код из письма"
            name={'code'}
            extraClass="mb-6"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
            Сохранить
          </Button>
          <p className='text text_type_main-default text_color_inactive mb-4'>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
        </form>
      </main>
    </>
  );
};