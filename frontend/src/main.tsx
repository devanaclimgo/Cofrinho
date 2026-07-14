import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { ThemeProvider } from "./lib/ThemeContext";
import { I18nProvider } from "./i18n/I18nContext";
import { AppStateProvider } from "./lib/AppStateContext";
import { QueryProvider } from "./providers/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <I18nProvider>
            <AppStateProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AppStateProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
);
