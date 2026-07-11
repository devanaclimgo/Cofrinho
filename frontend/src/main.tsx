import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { App } from "./App"
import { ThemeProvider } from "./lib/ThemeContext"
import { I18nProvider } from "./i18n/I18nContext"
import { CurrencyProvider } from "./lib/CurrencyContext"
import { AppStateProvider } from "./lib/AppStateContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <CurrencyProvider>
          <AppStateProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AppStateProvider>
        </CurrencyProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
