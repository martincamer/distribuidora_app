export function Card({ children }) {
  return (
    <div className="bg-white border-slate-200 border-[1px] max-w-md w-full p-10 rounded-xl shadow mx-auto">
      {children}
    </div>
  );
}
