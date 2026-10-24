export function getRedirectPath(from, fallback = "/") {
    if (!from) return fallback;

    const path = typeof from === "string" ? from : `${from.pathname ?? ""}${from.seach ?? ""}${from.hash ?? ""}`;
    return path.startsWith("/") && !path.startsWith("//") ? path : fallback;
}