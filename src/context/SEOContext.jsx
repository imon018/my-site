import {
  createContext,
  useContext,
  useMemo,
} from "react";

import { useSettings } from "./SettingsContext";

const SEOContext = createContext();

export function SEOProvider({ children }) {

  const { settings } = useSettings();

  const seo = useMemo(() => {

    const siteUrl =
      settings.websiteUrl?.trim() ||
      "https://dream-mode-site-eight.vercel.app";

    return {

      siteName:
        settings.storeName || "Dream Mode",

      siteUrl,

      logo:
        settings.logoUrl ||
        `${siteUrl}/logo512.png`,

      phone:
        settings.phone || "",

      email:
        settings.email || "",

      address:
        settings.address || "",

      facebook:
        settings.facebook || "",

      whatsapp:
        settings.whatsapp || "",

    };

  }, [settings]);

  return (

    <SEOContext.Provider value={seo}>

      {children}

    </SEOContext.Provider>

  );

}

export function useSEO() {

  return useContext(SEOContext);

}
