import { Navigate } from "react-router-dom";

import { AppRoute } from "../../constants/constants";
import { LoginPage, ProductsView } from "../../pages";

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
      element: <LoginPage />,
    },
    {
      path: AppRoute.CART,
      title: "Cart",
      element: <div>Cart</div>,
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
