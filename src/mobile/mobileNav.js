import { useState } from "react";

export default function useMobileNav() {
  const [open, setOpen] = useState(false);

  return {
    open,
    toggle: () => setOpen(!open),
    close: () => setOpen(false),
  };
}
