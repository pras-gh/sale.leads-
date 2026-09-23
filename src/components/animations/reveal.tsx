import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  id?: string;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Fades and lifts its content in once it scrolls into view. Observed by <RevealObserver />. */
export function Reveal({ as: Tag = "div", id, delay = 0, className, style, children }: RevealProps) {
  const merged = delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style;
  return (
    <Tag id={id} data-reveal="" className={className} style={merged}>
      {children}
    </Tag>
  );
}
