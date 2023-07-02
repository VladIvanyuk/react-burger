import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppHeader } from '../../components/app-header/app-header';
import styles from './authorization.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../../utils/burger-api';

export const ResetPassword = (props) => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const resetPassword = () => {
    resetPasswordRequest({
      password: password,
      token: code
    }).then(() => {
      navigate('/');
    }).catch((err) => {
      alert(err.message)
    })
  }

  if(!localStorage.getItem('visitForgotPage')) {
    navigate('/forgot-password');
    return;
  };

  return (
    <>
      <AppHeader />
      <main className={`${styles.window} container`}>
        <div className={styles.mainBlock}>
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
          <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={resetPassword}>
            Сохранить
          </Button>
          <p className='text text_type_main-default text_color_inactive mb-4'>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
        </div>
      </main>
    </>
  );
};