import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import { Login } from '../../pages/authorization/login';
import { Register } from '../../pages/authorization/register';
import { ForgotPassword } from '../../pages/authorization/forgot-password';
import { ResetPassword } from '../../pages/authorization/reset-password';


export const App = (props) => {
  return (
      <Routes>
        <Route path='/' element={<ProtectedRouteElement element={<MainPage />} />}/>
        <Route path='/login' element={<ProtectedRouteElement element={<Login />} />}/>
        <Route path='/register' element={<ProtectedRouteElement element={<Register />} />}/>
        <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPassword />} />}/>
        <Route path='/reset-password' element={<ProtectedRouteElement element={<ResetPassword />} />}/>
      </Routes>
  );
};
