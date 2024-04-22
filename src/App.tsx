
import { Container } from 'react-bootstrap'
import './App.css'
import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword'
import UpdateProfile from './components/UpdateProfile'

function App() {

  return (
    
      <Container className='d-flex align-items-center justify-content-center' style={{minHeight:"100vh"}}>
      <div className='w-100' style={{maxWidth:'400px'}}>
        <Router>
          <AuthProvider>
            <Routes >
              {/* <PrivateRoute path='/' Component={Dashboard}/> */}
              {/* <PrivateRoute path="/" component={Dashboard}/> */}
              <Route element={<PrivateRoute/>}>
                <Route path='/' Component={Dashboard}></Route>
              </Route>
              <Route element={<PrivateRoute/>}>
                <Route path='/update-profile' Component={UpdateProfile}></Route>
              </Route>
              <Route path='/signup' Component={Signup}/>
              <Route path='/login' Component={Login}/>
              <Route path='/forgot-password' Component={ForgotPassword}/>
            </Routes >
          </AuthProvider>
        </Router>
      </div>
    </Container>
 
  )
}

export default App
