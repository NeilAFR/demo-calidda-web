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

// Esta función ahora la llamaremos al arrancar la app
export const initializeAuth = async () => {
    await msalInstance.initialize();
    // Esta es la línea mágica que detecta si estamos en un popup, lee el #code y lo cierra
    await msalInstance.handleRedirectPromise();
};

export const login = async () => {
    try {
        const loginResponse = await msalInstance.loginPopup({
            scopes: ["User.Read"],
            prompt: "select_account"
        });
        return loginResponse.account;
    } catch (error) {
        console.error("Error en el login de Azure:", error);
        return null;
    }
};

export const getActiveAccount = () => {
    const accounts = msalInstance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;
};