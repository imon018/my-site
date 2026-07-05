import { siteConfig } from "../config/siteConfig";

export default function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition"
    >
      WhatsApp
    </a>
  );
}
