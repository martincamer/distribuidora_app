import { forwardRef } from "react";

export const Input = forwardRef((props, ref, styles) => (
  <input
    {...props}
    ref={ref}
    className={
      "uppercase text-sm w-full bg-white border-slate-200 border-[1px] text-slate-900 px-4 py-3 rounded-xl shadow"
    }
  />
));
