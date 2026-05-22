import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { SignUp } from "../pages/SignUp/SignUp";
import { SignIn } from "../pages/SignIn/SignIn";
import { useAuthStore } from "../store/authStore";
import { useEffect, type JSX } from "react";
import { Search } from "../pages/Search/Search";
import { Profile } from "../pages/Profile/Profile";

const routes = [
  {
    path: "/",
    element: <Home />,
    isPrivate: true,
    title: "Home",
    name: "home",
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    isPrivate: false,
    isAuthPage: true,
    title: "Sign Up",
    name: "signUp",
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    isPrivate: false,
    isAuthPage: true,
    title: "Sign In",
    name: "signIn",
  },
  {
    path: "/profile",
    element: <Profile />,
    isPrivate: true,
    title: "Profile",
    name: "profile",
  },
  {
    path: "/search",
    element: <Search />,
    isPrivate: true,
    title: "Search",
    name: "search",
  },
  {
    path: "*",
    element: <div>Not Found 404</div>,
    isPrivate: false,
    title: "Not found 404",
    name: "notFound",
  },
];

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { pathname } = useLocation();

  useEffect((): void => {
    const isAvalible =
      pathname === "/sign-in" || pathname === "/sign-up" ? true : false;

    console.log("isAuthenticated: " + isAuthenticated);

    if (!isAuthenticated && !isAvalible) {
      <Navigate to={"/sign-in"} />;
      return;
    }

    

    return;
  }, []);

  return (
    <Routes>
      {routes.map((route) => {
        if (route.isPrivate) {
          return (
            <Route
              key={route.name}
              path={route.path}
              element={<PrivateRoute>{route.element}</PrivateRoute>}
            />
          );
        }

        if (route.isAuthPage) {
          return (
            <Route
              key={route.name}
              path={route.path}
              element={<AuthRoute>{route.element}</AuthRoute>}
            />
          );
        }

        return (
          <Route key={route.name} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
};
