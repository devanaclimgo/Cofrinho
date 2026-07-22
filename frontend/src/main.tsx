import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./style.css";
import { App } from "./App";
import { ThemeProvider } from "./lib/ThemeContext";
import { I18nProvider } from "./i18n/I18nContext";
import { AppStateProvider } from "./lib/AppStateContext";
import { QueryProvider } from "./providers/QueryProvider";
import { AuthProvider } from "./providers/AuthProvider";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <I18nProvider>
            <AppStateProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AppStateProvider>
          </I18nProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
);
