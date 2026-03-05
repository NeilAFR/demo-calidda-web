import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
        redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

const msalInstance = new PublicClientApplication(msalConfig);
// Debemos inicializar la instancia antes de usarla
await msalInstance.initialize();

export const login = async () => {
    try {
        const loginResponse = await msalInstance.loginPopup({
            scopes: ["User.Read"]
        });
        return loginResponse.account;
    } catch (error) {
        console.error("Error en el login de Azure:", error);
        return null;
    }
};

export const logout = () => {
    msalInstance.logoutPopup();
};

export const getActiveAccount = () => {
    return msalInstance.getAllAccounts()[0] || null;
};