import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
//
// index.js
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
    authority: import.meta.env.REACT_APP_COGNITO_AUTHORITY,
    client_id: import.meta.env.REACT_APP_COGNITO_CLIENT_ID,
    redirect_uri: import.meta.env.REACT_APP_COGNITO_REDIRECT,
    response_type: "code",
    scope: "phone openid email",
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <App />
        </AuthProvider>
    </StrictMode>
);
