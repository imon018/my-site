import { Outlet } from "react-router-dom";

import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import WhatsAppButton from "../components/WhatsAppButton";

export default function MainLayout() {
  return (
    <>
      <AnnouncementBar />

      <Header />

      <main className="min-h-screen pb-20 md:pb-0">
        <Outlet />
      </main>

      <WhatsAppButton />

      <MobileBottomNav />

      <Footer />
    </>
  );
}
