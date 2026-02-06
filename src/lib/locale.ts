export type Locale = "en" | "es";

export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith("/es") ? "es" : "en";
}

export function getAlternatePath(pathname: string, targetLocale: Locale): string {
  if (targetLocale === "es") {
    // Convert EN path to ES path
    if (pathname === "/") return "/es";
    return `/es${pathname}`;
  } else {
    // Convert ES path to EN path
    if (pathname === "/es") return "/";
    if (pathname.startsWith("/es")) {
      return pathname.replace("/es", "");
    }
    return pathname;
  }
}
