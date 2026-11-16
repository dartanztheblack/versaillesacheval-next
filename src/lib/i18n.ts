// Liens d'accueil par langue : la version anglaise vit sur /en (indexable), plus sur ?lang=en
export function homeHref(lang?: string): string {
  return lang === "en" ? "/en" : "/";
}
