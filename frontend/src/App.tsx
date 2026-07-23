import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import DashboardPage from "./components/DashboardPage";
import Header  from "./components/Header";

function DashboardLayout() {
  return (
    <>
      <Header />
      <DashboardPage />
    </>
  );
}



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
