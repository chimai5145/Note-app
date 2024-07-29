import { useEffect, useState } from 'react';
import LogInModal from './components/LogInModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFound from './pages/NotFound';



function App() {
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLogInModal, setShowLogInModal] = useState(false);

	useEffect(() => {
		async function fetchLogInUser() {
			try {
				const user = await NotesApi.getLogInUser();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLogInUser()
	}, [])

	return (
		<BrowserRouter>
			<div>
				<NavBar
					loggedInUser={loggedInUser}
					onSignUpClicked={() => setShowSignUpModal(true)}
					onLogInClicked={() => setShowLogInModal(true)}
					onLogOutSuccessful={() => setLoggedInUser(null)}
				/>

				<Container>
					<Routes>
						<Route
							path='/'
							element={<NotesPage loggedInUser={loggedInUser} />}
						/>

						<Route
							path='/privacy'
							element={<PrivacyPage />}
						/>

						<Route
							path='/*'
							element={<NotFound />}
						/>
					</Routes>
				</Container>

				
				{showSignUpModal &&
					<SignUpModal
						onDismiss={() => setShowSignUpModal(false)}
						onSignUpSuccessful={(user) => {
							setLoggedInUser(user);
							setShowSignUpModal(false)
						}}
					/>
				}
				{showLogInModal &&
					<LogInModal
						onDismiss={() => setShowLogInModal(false)}
						onLogInSuccessful={(user) => {
							setLoggedInUser(user);
							setShowLogInModal(false)
						}}
					/>
				}
			</div>
		</BrowserRouter>
	);
}

export default App;