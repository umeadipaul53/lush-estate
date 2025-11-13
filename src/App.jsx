// src/App.jsx
import { useRef } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import ManageUsers from "./admin/ManageUsers";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Step4 from "./pages/Step4";
import Step5 from "./pages/Step5";
import Step6 from "./pages/Step6";
import PlotReservation from "./pages/PlotReservation";
import Questionnaire from "./pages/Questionnaire";
import StepLayout from "./components/StepLayout";

import {
  UserProtectedRoute,
  AdminProtectedRoute,
} from "./components/ProtectedRoute";
import AuthProvider from "./components/AuthProvider";

function App() {
  const location = useLocation();
  const scrollRef = useRef(null);

  const isAdminRoute = /^\/admin(\/|$)/.test(location.pathname);

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Navbar for non-admin routes */}
        {!isAdminRoute && <Navbar />}

        {!isAdminRoute ? (
          <>
            <div ref={scrollRef} data-scroll-container className="flex-grow">
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/secured-account/login" element={<Login />} />

                  <Route
                    path="/user-step-1"
                    element={
                      <UserProtectedRoute>
                        <StepLayout>
                          <Step1 />
                        </StepLayout>
                      </UserProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-step-2"
                    element={
                      <UserProtectedRoute>
                        <StepLayout>
                          <Step2 />
                        </StepLayout>
                      </UserProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-step-3"
                    element={
                      <UserProtectedRoute>
                        <StepLayout>
                          <Step3 />
                        </StepLayout>
                      </UserProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-step-4"
                    element={
                      <UserProtectedRoute>
                        <StepLayout>
                          <Step4 />
                        </StepLayout>
                      </UserProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-step-5"
                    element={
                      <UserProtectedRoute>
                        <StepLayout>
                          <Step5 />
                        </StepLayout>
                      </UserProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-step-6"
                    element={
                      <UserProtectedRoute>
                        <StepLayout>
                          <Step6 />
                        </StepLayout>
                      </UserProtectedRoute>
                    }
                  />

                  <Route
                    path="/plot-reservation"
                    element={
                      <UserProtectedRoute>
                        <PlotReservation />
                      </UserProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-questionnaire"
                    element={
                      <UserProtectedRoute>
                        <Questionnaire />
                      </UserProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-dashboard"
                    element={
                      <UserProtectedRoute>
                        <Dashboard />
                      </UserProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>

            {/* Footer */}
            <Footer />
          </>
        ) : (
          <main className="flex-grow">
            <Routes>
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<ManageUsers />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
