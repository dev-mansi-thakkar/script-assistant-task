import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAuthStore } from './store/authStore';
import Login from './components/Login';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import ErrorBoundary from './pages/errorboundary';

const App: React.FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const queryClient = new QueryClient();

	return (
		<React.StrictMode>
			<ErrorBoundary>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/resources/:id" element={<ResourceDetail />} />
							<Route path="/resources" element={<ResourceList />} />
							<Route path='*' element={isAuthenticated ? <Navigate to="/resources" replace={true} /> : <Navigate to="/login" replace={true} />} />
						</Routes>
					</BrowserRouter>
				</QueryClientProvider>
			</ErrorBoundary>
		</React.StrictMode>
	);
};

export default App;