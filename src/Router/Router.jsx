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
import AvailableDoctors from "../Pages/Available_Doctor/AvailableDoctor";
import Contact from "../Pages/Contact/Contact";
import PrivateRoute from "../Routes/PrivateRoute";
import Forbidden from "../Forbidden Page/Forbidden";
import DoctorDetails from "../Pages/Available_Doctor/DoctorDetails";
import Profile from "../Pages/Profile/Profile";
import Patient from "../Pages/Dashboard/Patient";
import Doctor from "../Pages/Dashboard/Doctor";

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
        path: 'doctors',
        element: <PrivateRoute><AvailableDoctors /></PrivateRoute>,
        loader: () => fetch('https://serverside-code-manegment-code.vercel.app/users') // Load all camps data
      },
      {
        path: '/doctor/:id',
        element: < DoctorDetails/>,
        loader: ({ params }) => fetch(`https://serverside-code-manegment-code.vercel.app/users/${params.id}`)
      },{
        path:'/profile',
        Component : Profile
      },
      {
        path:'dashboard/patient',
        element:<PrivateRoute><Patient></Patient></PrivateRoute>
      }, {
        path:'dashboard/doctor',
        element:<PrivateRoute><Doctor></Doctor></PrivateRoute>
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

