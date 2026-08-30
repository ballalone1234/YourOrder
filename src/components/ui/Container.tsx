import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 xl:px-[72px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
