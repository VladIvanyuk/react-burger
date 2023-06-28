import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRouteElement = ({ element, onlyUnAuth = false }) => {
  const { isAuthChecked, user } = useSelector((store) => store.setUser);
  const location = useLocation();

  console.log('1')
  if(!isAuthChecked) return null;

  if(onlyUnAuth && user) {
    console.log('2')
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate to={from} />
  }

  if(!onlyUnAuth && !user) {
    console.log('3')
    return <Navigate to='/login' state={{from: location}} />
  }
  console.log('4')
  return element;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ element }) => {
  <ProtectedRouteElement onlyUnAuth={true} element={element} />
}