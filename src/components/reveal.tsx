import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  id?: string;
  delay?: number;
  className?: string;
  children: ReactNode;
};

/** Fades and lifts its content in once it scrolls into view. Observed by <RevealObserver />. */
export function Reveal({ as: Tag = "div", id, delay = 0, className, children }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;
  return (
    <Tag id={id} data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
