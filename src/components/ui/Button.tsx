import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "primaryInvert" | "secondaryInvert";
type Size = "md" | "lg";

const BASE =
  "group inline-flex items-center justify-center gap-2.5 rounded-[2px] font-medium " +
  "transition-colors duration-200 ease-out select-none " +
  "disabled:cursor-not-allowed disabled:opacity-55";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-deep",
  secondary:
    "border border-line bg-transparent text-ink hover:border-ink hover:bg-surface",
  primaryInvert: "bg-white text-night hover:bg-paper",
  secondaryInvert:
    "border border-white/25 bg-transparent text-white hover:border-white/70 hover:bg-white/5",
};

const SIZES: Record<Size, string> = {
  md: "h-12 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-[0.9375rem] md:h-[3.25rem] md:px-7 md:text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Adds a trailing arrow that nudges on hover. */
  arrow?: boolean;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "lg",
    arrow = false,
    className,
    ...rest
  } = props;

  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonRest.type ?? "button"} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
