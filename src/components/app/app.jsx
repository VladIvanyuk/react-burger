import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import { Login } from '../../pages/login/login';

export const App = (props) => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRouteElement element={<MainPage />} />}/>
        <Route path='/login' element={<ProtectedRouteElement element={<Login />} />}/>
      </Routes>
    </Router>
  );
};
