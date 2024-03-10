import {lazy, Suspense} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import LayoutLogin from "./components/LayoutLogin.jsx";


const Login = lazy(() => import('./pages/authPage/Login.jsx'));
const Registration = lazy(() => import('./components/Registration.jsx'));
const Home = lazy(() => import('./pages/home/Home.jsx'));
const CheckCode = lazy(() => import('./pages/checkCode/CheckCodeEmail.jsx'));
function App() {


  return (
      <Suspense fallback={'Loading'}>
        <Routes>
            <Route path={'/'} element={<Navigate to="/login"/>}/>
            <Route path={'/'} element={<LayoutLogin/>}>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'registration'} element={<Registration/>}/>
                <Route path={'registration/check'} element={<CheckCode/>}/>
            </Route>
          <Route path={'/home'} element={<Home/>}/>
          <Route path={'*'} element={<Navigate to={'/login'}/>}/>
        </Routes>
      </Suspense>
  )
}

export default App
