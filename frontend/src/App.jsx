import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import {SnackbarProvider} from 'notistack'
import Dashboard from "./pages/Dashboard.jsx";

function App() {


    return (
        <div className="font-poppins h-screen">
            <Router>
                <Routes>

                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
            <SnackbarProvider/>
        </div>
    )
}

export default App
