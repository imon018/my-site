import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { useNotifications } from "../context/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {
  const { unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-gray-100 transition"
      >
        <FiBell size={22} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
}
