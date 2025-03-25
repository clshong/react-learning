import { createRoot } from 'react-dom/client'
import './index.module.less'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(

  <App />

)
function sendToAnalytics(metric) {
  console.log(metric);
}

