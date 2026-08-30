type ClassValue = string | false | null | undefined;

/** Minimal class name joiner — keeps the bundle free of extra dependencies. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
