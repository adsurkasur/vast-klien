export type Page = "home" | "contact" | "trolley" | "profile" | "community";

export function getCurrentPage(pathname: string): Page {
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/trolley")) return "trolley";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/community")) return "community";
  return "home";
}
