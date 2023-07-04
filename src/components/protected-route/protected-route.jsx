import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRouteElement = ({ component, onlyUnAuth = false }) => {
  const { isAuthChecked, user } = useSelector((store) => store.user);
  const location = useLocation();

  if(!isAuthChecked) return null;

  if(onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate to={from} />
  }

  if(!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{from: location}} />
  }
  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => {
  return <ProtectedRouteElement onlyUnAuth={true} component={component} />
}