import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import HomePageLayout from "../Layouts/HomePageLayout";
import { Component } from "react";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Authentication from "../Layouts/Authentication";
import About from "../Pages/About/About";
import Register from "../Pages/Authentication/Register";
import AvailableBootcamp from "../Pages/Available_Doctor/AvailableDoctor";
import CampRegistrationForm from "../Pages/Camaping Related work/CampResistrationForm";
import Dashboard from "../Layouts/Dashboard";
import Contact from "../Pages/Contact/Contact";
import PrivateRoute from "../Routes/PrivateRoute";
import Forbidden from "../Forbidden Page/Forbidden";
import DoctorDetails from "../Pages/Available_Doctor/DoctorDetails";
import Profile from "../Pages/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePageLayout,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: '/contact',
        Component: Contact
      }
      ,
      {
        path: 'availableBootcamp',
        element: <AvailableBootcamp />,
        loader: () => fetch('http://localhost:3000/users') // Load all camps data
      },
      {
        path: '/doctor/:id',
        element: < DoctorDetails/>,
        loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`)
      },
      {
        path: '/registration/:id',
        element: <CampRegistrationForm />,
        loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`)
      },{
        path:'/profile',
        Component : Profile
      }
    ]
  },
  {
    path: "/auth",
    Component: Authentication,
    children: [
      {
        index: true,
        element: <Authentication />
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
path: "/forbidden",
Component : Forbidden
  },
]);

