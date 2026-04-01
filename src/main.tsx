import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "@fontsource-variable/inter/index.css"
import "@/app/styles/index.css"
import { App } from "@/app/App"
import { ThemeProvider } from "@/app/providers/theme-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
