export function Message({ message }) {
  return (
    <p className="text-red-800 bg-red-500/10 py-2 px-3 text-sm rounded-xl text-center mb-3">
      {message}
    </p>
  );
}
