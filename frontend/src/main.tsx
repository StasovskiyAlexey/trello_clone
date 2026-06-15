import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import AppProvider from './app/providers/app-provider'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<AppProvider>
			<App />
		</AppProvider>,
	)
}
