import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/layout/app-layout";
import RootLayout from "./components/layout/root-layout";
import { DashboardPage } from "./features/dashboard/pages/dashboard_page";
import { LoginPage } from "./features/auth/pages/login_page";
import { RegionsPage } from "./features/regions/pages/regions_page";
import { CreatePlacePage } from "./features/places/pages/create_place_page";
import { EditPlacePage } from "./features/places/pages/edit_place_page";
import { PlacesPage } from "./features/places/pages/places_page";
import { SingleRegionPage } from "./features/regions/pages/single_region_page";
import { BookingsPage } from "./features/booking/pages/bookings_page";
import { BookingDetailsPage } from "./features/booking/pages/booking_details_page";
import { SettingsPage } from "./features/settings/pages/settings_page";
import { UsersPage } from "./features/users/pages/users_page";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: '/regions',
            element: <RegionsPage />,
          },

          {
            path: 'places',
            element: <PlacesPage />,
          },
          {
            path: 'places/create',
            element: <CreatePlacePage />,
          },
          {
            path: 'places/edit/:id',
            element: <EditPlacePage />,
          },

          {
            path: 'regions/:id',
            element: <SingleRegionPage />,
          },

          {
            path: 'bookings',
            element: <BookingsPage />,
          },
          {
            path: 'bookings/:id',
            element: <BookingDetailsPage />,
          },

          {
            path: 'settings',
            element: <SettingsPage />,
          },

          {
            path: 'users',
            element: <UsersPage />,
          },
        ]
      },
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  }
])

export default router;