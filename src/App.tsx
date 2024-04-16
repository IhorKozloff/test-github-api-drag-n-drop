import { Route, Routes } from 'react-router';
import PrivateRoute from './routes/private';
import PublicRoute from './routes/public';
import { HomePage } from './pages/Home-Page';
import { Layout } from './pages/Layout';
import { AuthPage } from './pages/Auth-Page';

function App() {
    return (

        <Routes>

            <Route path="/" element={<Layout/>}>

                <Route index element={<PrivateRoute><HomePage/></PrivateRoute>}/>
    
                <Route 
                    path="auth" 
                    element={
                        <PublicRoute>
                            <AuthPage/>
                        </PublicRoute>
                    }
                />
            </Route>

        </Routes>
    );
}

export default App;
