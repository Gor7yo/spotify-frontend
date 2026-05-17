import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home/Home"
import { SignUp } from "../pages/SignUp/SignUp"
import { SignIn } from "../pages/SignIn/SignIn"

const routes = [
	{ path: '/', element: <Home />, isAvalible: false, title: 'Home', name: 'home'},
	{ path: '/sign-up', element: <SignUp />, isAvalible: false, title: 'Sign Up', name: 'signUp'},
	{ path: '/sign-in', element: <SignIn />, isAvalible: false, title: 'Sign In', name: 'signIn'},
	{ path: '/profile', element: '', isAvalible: true, title: 'Profile', name: 'profile'},
]

export const AppRouter = () => {

	return (
		<Routes>
			{routes.map((route) => (
				<Route key={route.name} path={route.path} element={route.element}  />
			))}
		</Routes>
	)
}