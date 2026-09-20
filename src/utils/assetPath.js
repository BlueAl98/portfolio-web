// Resolves a public-folder asset path against Vite's configured base path,
// so links/images work both in dev (base "/") and when deployed under a
// subpath (e.g. GitHub Pages project sites at /portfolio-web/).
// External URLs (http/https) are returned unchanged.
export const withBase = (path) => {
    if (!path) return path;
    if (/^https?:\/\//i.test(path)) return path;
    return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
};
