export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      {...props}
      className={`
      h-12
      rounded-xl
      px-5
      font-medium
      bg-black
      text-white
      transition-all
      duration-300
      hover:scale-[1.03]
      hover:shadow-xl
      active:scale-95
      ${className}
      `}
    >
      {children}
    </button>
  );
}
