import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Popup } from "../components";
import { OnBoarding, Chat } from "../features";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<OnBoarding />} />
        </Routes>
      </BrowserRouter>
      <Popup />
    </>
  );
}
