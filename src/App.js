import Header from './components/Header'
import Footer from './components/Footer'
import Weather from './components/Weather'
import Hour from './components/Hour'
import Day from './components/Day'
import Live from './components/Live'

import "./App.css"
function App() {
  return (
    <div>
      <Header />
      <Weather />
      <Hour />
      <div className='day-live'>
        <Day />
        <Live />
      </div>
      <Footer />
    </div>
  );
}

export default App;
