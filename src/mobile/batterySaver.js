export async function batteryLevel() {
  if (!navigator.getBattery) return null;

  const battery = await navigator.getBattery();

  return {
    level: battery.level,
    charging: battery.charging,
  };
}
