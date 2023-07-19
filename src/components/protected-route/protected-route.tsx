import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { TLocation, TProtectedRouteElement } from "../../types/types";

export const ProtectedRouteElement: React.FC<TProtectedRouteElement> = ({ component, onlyUnAuth }: TProtectedRouteElement): JSX.Element | null => {
  const { isAuthChecked, user } = useSelector((store: any) => store.user);
  const location: TLocation = useLocation();

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
export const OnlyUnAuth = ({ component }: TProtectedRouteElement): JSX.Element => {
  return <ProtectedRouteElement onlyUnAuth={true} component={component} />
}