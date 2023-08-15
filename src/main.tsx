import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "@radix-ui/themes/styles.css"
import { RecoilRoot } from "recoil"
import { Theme } from "@radix-ui/themes"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Theme radius="none" accentColor="crimson">
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Theme>
  </React.StrictMode>
)
