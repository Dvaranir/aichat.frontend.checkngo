const $static = (url) => `${import.meta?.env?.VITE_BASE_URL ?? "https://yp-dev-chat.checkngo.link:7072"}${url}`;

export {$static};