import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Popup } from "../components";
import { OnBoarding, Chat } from "../features";
import { ProtectedRoute, PublicOnlyRoute } from "@/routes";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public route for login */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<OnBoarding />} />
          </Route>
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Chat />} />
          </Route>
         {/* Catch-all for 404 */}
          <Route path="*" element={<>404</>} />
        </Routes>
      </BrowserRouter>
      <Popup />
    </>
  );
}
