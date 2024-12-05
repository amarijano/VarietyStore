import { Navigate } from "react-router-dom";

import { Cart } from "../../components";
import { AppRoute } from "../../constants/constants";
import { LoginView, ProductsView } from "../../pages";

export function AppRoutes() {
  return [
    {
      path: AppRoute.ROOT,
      element: <Navigate to={AppRoute.BASE} replace />,
    },
    {
      path: AppRoute.BASE,
      title: "Home",
      element: <ProductsView />,
    },
    {
      path: AppRoute.LOGIN,
      title: "Login",
      element: <LoginView />,
    },
    {
      path: AppRoute.CART,
      title: "Cart",
      element: <Cart />,
    },
    {
      path: AppRoute.SEARCH,
      title: "Search",
      element: <ProductsView />,
    },
    {
      path: "*",
      title: "Not Found",
      element: <div>NotFOund Page</div>,
    },
  ];
}
