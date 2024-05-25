export function Button({ onClick, children }) {
  return (
    <button
      className="text-white px-6 hover:bg-sky-500/90 transition-all text-sm hover:shadow-md py-2 rounded-full bg-sky-500 font-bold flex gap-2 items-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
