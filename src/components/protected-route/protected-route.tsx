import { TypedUseSelectorHook, useSelector as selectorHook } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState, TLocation, TProtectedRouteElement } from "../../services/types/types";

export const ProtectedRouteElement: React.FC<TProtectedRouteElement> = ({ component, onlyUnAuth }) => {
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
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
export const OnlyUnAuth = ({ component }: TProtectedRouteElement) => {
  return <ProtectedRouteElement onlyUnAuth={true} component={component} />
}