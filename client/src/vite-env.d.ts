/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_COGNITO_AUTHORITY: string;
    readonly VITE_COGNITO_CLIENT_ID: string;
    readonly VITE_COGNITO_REDIRECT: string;
    readonly VITE_COGNITO_LOGOUT_URI: string;
    readonly VITE_COGNITO_DOMAIN: string;
}
