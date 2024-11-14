import { RouterProvider } from "react-router-dom"
import { router } from "./routes/web"
import { TooltipProvider } from '@/components/ui/tooltip';
import { Provider } from "react-redux";
import { store } from "./store";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "./components/ui/toaster";
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <Provider store={store}>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
