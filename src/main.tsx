import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import App from './App';
import Landing from './pages/landing/Landing';
import './index.css'; // Import Tailwind CSS

export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Landing />
			}
		]
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		 {/* <QueryClientProvider client={queryClient}> */}
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    {/* </QueryClientProvider> */}
		{/* <App /> */}
		{/* <QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider> */}
	</StrictMode>
);
