const $static = (url) => `${import.meta?.env?.VITE_STATIC_SERVER_URL ?? "https://yp-dev-static.checkngo.pro/ai-chat"}${url}`;

export {$static};