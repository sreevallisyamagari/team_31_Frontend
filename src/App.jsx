import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import StudentLayout from "./layouts/StudentLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import ManageDrives from "./pages/admin/ManageDrives";
import AddDrive from "./pages/admin/AddDrive";
import EditDrive from "./pages/admin/EditDrive";
import ManageApplications from "./pages/admin/ManageApplications";
import EligibleStudents from "./pages/admin/EligibleStudents";
import StudentDetails from "./pages/admin/StudentDetails";
import Shortlisting from "./pages/admin/Shortlisting";
import SelectedStudents from "./pages/admin/SelectedStudents";
import Reports from "./pages/admin/Reports";
import AdminNotifications from "./pages/admin/AdminNotifications";
import EditStudent from "./pages/admin/EditStudent";
import Settings from "./pages/admin/Settings";
import EditProfile from "./pages/student/EditProfile";
import CompanyDriveDetails from "./pages/student/CompanyDriveDetails";
import AddAdmin from "./pages/admin/AddAdmin";

import AdminLayout from "./layouts/AdminLayout";

function App() {

    return (

        <BrowserRouter>
            <Toaster position="top-right" />
            <Routes>

                {/* Authentication */}

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Student Layout */}

                <Route element={<StudentLayout />}>

                    <Route
                        path="/student"
                        element={<StudentDashboard />}
                    />

                    <Route
                        path="/drives"
                        element={<CompanyDrives />}
                    />
                    
                    <Route
                        path="/drives/:id"
                        element={<CompanyDriveDetails />}
                    />

                    <Route
                        path="/applications"
                        element={<MyApplications />}
                    />
                    <Route
                        path="/edit-profile"
                        element={<EditProfile />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/resume"
                        element={<Resume />}
                    />

                    <Route
                        path="/notifications"
                        element={<Notifications />}
                    />

                    <Route
                        path="/results"
                        element={<PlacementResults />}
                    />

                    <Route
                        path="/help"
                        element={<HelpSupport />}
                    />

                </Route>

                {/* Admin Layout */}

                <Route element={<AdminLayout />}>

                    <Route path="/admin" element={<AdminDashboard />} />

                    <Route path="/students" element={<Students />} />

                    <Route path="/company-drives" element={<ManageDrives />} />

                    <Route path="/add-drive" element={<AddDrive />} />

                    <Route path="/edit-drive/:id" element={<EditDrive />} />
                    <Route path="/admin/add-admin" element={<AddAdmin />} />

                    <Route
                        path="/reports"
                        element={<Reports />}
                    />

                    <Route
                        path="/applications-admin"
                        element={<ManageApplications />}
                    />

                    <Route
                        path="/notifications-admin"
                        element={<AdminNotifications />}
                    />

                    <Route
                        path="/eligible-students"
                        element={<EligibleStudents />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                    <Route
                        path="/edit-student/:id"
                        element={<EditStudent />}
                    />

                    <Route
                        path="/student-details/:id"
                        element={<StudentDetails />}
                    />

                    <Route
                        path="/shortlisting"
                        element={<Shortlisting />}
                    />

                    <Route
                        path="/selected-students"
                        element={<SelectedStudents />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default App;