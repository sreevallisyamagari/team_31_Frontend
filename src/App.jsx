import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import StudentDashboard from "./pages/student/StudentDashboard";
import CompanyDrives from "./pages/student/CompanyDrives";
import MyApplications from "./pages/student/MyApplications";
import Profile from "./pages/student/Profile";
import Resume from "./pages/student/Resume";
import Notifications from "./pages/student/Notifications";
import PlacementResults from "./pages/student/PlacementResults";
import HelpSupport from "./pages/student/HelpSupport";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import ManageDrives from "./pages/admin/ManageDrives";
import AddDrive from "./pages/admin/AddDrive";
import EditDrive from "./pages/admin/EditDrive";
import ManageApplications from "./pages/admin/ManageApplications";
import EligibleStudents from "./pages/admin/EligibleStudents";
import StudentDetails from "./pages/admin/StudentDetails";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Authentication */}

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Student */}

                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/drives" element={<CompanyDrives />} />
                <Route path="/applications" element={<MyApplications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/results" element={<PlacementResults />} />
                <Route path="/help" element={<HelpSupport />} />

                {/* Admin */}

                <Route path="/admin" element={<AdminDashboard />} />

                <Route path="/students" element={<Students />} />

                <Route path="/company-drives" element={<ManageDrives />} />

                <Route path="/add-drive" element={<AddDrive />} />

                <Route path="/edit-drive/:id" element={<EditDrive />} />

                <Route
                    path="/applications-admin"
                    element={<ManageApplications />}
                />

                <Route
                    path="/eligible-students"
                    element={<EligibleStudents />}
                />

                <Route
                    path="/student-details/:id"
                    element={<StudentDetails />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;