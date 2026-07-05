import { useEffect, useState } from "react";

export default function useLazyLoad(callback) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      callback();
      setLoaded(true);
    }
  }, [loaded, callback]);

  return loaded;
}
