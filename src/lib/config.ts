 const config = {
    APP_ENV: import.meta.env.VITE_APP_ENV,
    API_KEY: import.meta.env.VITE_API_KEY,
    API_URL: import.meta.env.VITE_API_URL,
    VITE_LOCAL_URL: import.meta.env.VITE_LOCAL_URL,
}
config.API_URL = config.APP_ENV === "DEV" ? config.VITE_LOCAL_URL : config.API_URL
export const __config =  Object.freeze(config)