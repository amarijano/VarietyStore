import { Navigate } from "react-router-dom";

import { AppRoute } from "../constants/constants";
import { CartView, LoginView, NotFoundView, ProductsView } from "../pages";

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
      element: <CartView />,
    },
    {
      path: AppRoute.SEARCH,
      title: "Search",
      element: <ProductsView />,
    },
    {
      path: "*",
      title: "Not Found",
      element: <NotFoundView />,
    },
  ];
}
