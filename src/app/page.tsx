import { SiteHome } from "@/components/sections/SiteHome";
import { defaultLocale } from "@/lib/i18n";

export default function HomePage() {
  return <SiteHome locale={defaultLocale} />;
}
