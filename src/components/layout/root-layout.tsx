import { Outlet } from "react-router-dom"
import { AppProvider } from "../../core/providers/app-provider"

const RootLayout = () => {

  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
}

export default RootLayout