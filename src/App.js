import React from "react";
import "./App.css";
import Layout from "./views/Layout/Layout";
import firebaseConfig from "./firebase/firebaseConfig";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import Form from "./views/Form/Form";
import Answers from "./views/Answers/Answers";
import FormGenerator from "./views/CreateForm/FormGenerator/FormGenerator";
import Auth from "./utils/Auth";
import MyForms from "./views/MyForms/MyForms";
import LoginScreen from "./views/LoginScreen/LoginScreen";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);

	const [appInitialized, setInit] = React.useState(false);
	const [authChecked, setCheckAuth] = React.useState(false);
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		async function init() {
			await firebase.initializeApp(firebaseConfig);
			setInit(true);
		}
		init();
	}, []);

	React.useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				const userData = {
					name: user.displayName,
					photo: user.photoURL,
					uid: user.uid,
					email: user.email
				};
				setData();
				async function setData() {
					await setIsAuthenticated(true);
					await setUser(userData);
					setCheckAuth(true);
				}

			} else {
				setUser(null);
				setCheckAuth(true);
				setIsAuthenticated(false);
			}
		});
	}, []);

	return (
		<div className='App'>
			<Router>
				{appInitialized && authChecked && (
					<Layout user={user}>
						<Auth isAuthenticated={isAuthenticated}
							auth={
								<Switch>
									<Route path='/myforms' exact>
										<MyForms user={user} />
									</Route>
									<Route path='/create' exact>
										<FormGenerator user={user} />
									</Route>
									<Route path='/:id' exact>
										<Form user={user} />
									</Route>
									<Route path='/:id/answers' exact>
										<Answers user={user} />
									</Route>
									<Route path='/' exact>
										<Redirect to='/create' />
									</Route>
								</Switch>
							}
							notAuth={
								<Switch>
									<Route path='/' exact>
										<LoginScreen />
									</Route>
									<Route path='*'>
										<Redirect to="/" />
									</Route>
								</Switch>
							}
						>
						</Auth>
					</Layout>
				)}
			</Router>
		</div>
	);
};

export default App;
