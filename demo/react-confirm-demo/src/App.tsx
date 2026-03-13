import { Routes, Route } from "react-router-dom";
import { ConfirmDialogProvider } from "react-confirm-dialog";
import { ThemeProvider } from "./components/ThemeProvider";
import LandingPage from "./pages/LandingPage";
import DocsPage from "./pages/DocsPage";

export default function App() {
  return (
    <ThemeProvider>
      <ConfirmDialogProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </ConfirmDialogProvider>
    </ThemeProvider>
  );
}
