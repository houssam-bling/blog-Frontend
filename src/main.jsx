import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime : 1000 * 60 * 1,
      refetchOnWindowFocus:true,
    }
  }
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
