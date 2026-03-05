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
let isInitialized = false;

export const initializeAuth = async () => {
    if (!isInitialized) {
        await msalInstance.initialize();
        isInitialized = true;
    }
    // ¡LA MAGIA OCURRE AQUÍ! 
    // Si la página se está recargando porque Microsoft nos devolvió, esto captura el token.
    const response = await msalInstance.handleRedirectPromise();
    return response;
};

export const login = async () => {
    try {
        // Redirige toda la pestaña, 100% seguro contra bloqueos de navegadores
        await msalInstance.loginRedirect({
            scopes: ["User.Read"],
            prompt: "select_account"
        });
    } catch (error) {
        console.error("Error al redirigir a Azure:", error);
    }
};

export const getActiveAccount = () => {
    const accounts = msalInstance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;
};