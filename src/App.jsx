import {Route, Routes} from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import About from './pages/About'
import ApiRickMorty from './pages/ApiRickMorty'
import Home from './pages/Home'

export default function App() {
 
  return (
    <>
    <Header />
    <Routes>
      <Route path= '/' element ={<Home />}/>
      <Route path= '/about' element ={<About />}/>
      <Route path= '/rick-and-morty' element ={<ApiRickMorty />}/>
    </Routes>
    <Footer />
    
    </> 
  )
}
