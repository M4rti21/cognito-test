import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const env = import.meta.env;

function App() {
    const auth = useAuth();

    const signOutRedirect = () => {
        window.location.href = `${env.VITE_COGNITO_DOMAIN}/logout?client_id=${
            env.VITE_COGNITO_CLIENT_ID
        }&logout_uri=${encodeURIComponent(env.VITE_COGNITO_LOGOUT_URI)}`;
    };

    useEffect(() => {
        if (!auth.isAuthenticated) return;
        validateLogin();
        async function validateLogin() {
            const res = await fetch(`https://<back>`, {
                method: "POST",
                body: JSON.stringify({
                    access_token: auth.user?.access_token,
                    refresh_token: auth.user?.refresh_token,
                }),
            });
            const data = await res.json();
            console.log(data);
        }
    }, [auth]);

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <pre> Hello: {auth.user?.profile.email} </pre>
                <pre> ID Token: {auth.user?.id_token} </pre>
                <pre> Access Token: {auth.user?.access_token} </pre>
                <pre> Refresh Token: {auth.user?.refresh_token} </pre>

                <button onClick={() => auth.removeUser()}>Sign out</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
        </div>
    );
}

export default App;
