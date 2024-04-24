export function Button({ onClick, children }) {
  return (
    <button
      className="text-violet-700 uppercase hover:shadow-md transition-all ease-linear hover:bg-violet-500/90 hover:text-white bg-violet-100 px-4 py-3 rounded-xl my-2 disabled:bg-violet-300 flex gap-2 items-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
