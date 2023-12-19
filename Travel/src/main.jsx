import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from "./Pages";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './components/Authentication';
import Details from "./Pages/detail-page";
import { AuthGuard, AuthProvider } from './context/authprovider';
import server from "./server.js";

server();

const router = createBrowserRouter([
  {
    path: "/",
    element:(
    <AuthGuard>
      <Index />
    </AuthGuard>),
  },
  {
    path: "/detail/:placeId",
    element: (
      <AuthGuard>
        <Details />
      </AuthGuard> 
    ),
  },
  {
    path: "/signin",
    element: <LoginPage />,
  },
]);
const queryclient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryclient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);