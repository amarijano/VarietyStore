export enum AppRoute {
  BASE = "/",
  LOGIN = "/login",
  LOGOUT = "/logout",
  CART = "/cart",
}

export function AppRoutes() {
  return [
    {
      path: AppRoute.BASE,
      title: "Home",
      element: <div>Catalog Page</div>,
    },
    {
      path: AppRoute.LOGIN,
      title: "Login",
      element: <div>Login</div>,
    },
    {
      path: AppRoute.CART,
      title: "Cart",
      element: <div>Cart</div>,
    },
    {
      path: "*",
      title: "Not Found",
      element: <div>NotFOund Page</div>,
    },
  ];
}
