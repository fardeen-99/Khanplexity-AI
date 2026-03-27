import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.jsx'
import { store } from './app/store.jsx'
import { Provider } from 'react-redux'
import { ThemeProvider } from './contexts/ThemeContext.jsx'


createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <ThemeProvider>
        <App />
    </ThemeProvider>
</Provider>


)
