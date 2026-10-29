import React from "react";

type CustomElementProps<T extends React.ElementType> = {
  as?: T;
  children?: React.ReactNode;
  ref?: React.ComponentPropsWithRef<T>["ref"];
} & React.ComponentPropsWithoutRef<T>;

export default function CustomElement<T extends React.ElementType = "div">({
  children,
  as,
  ref,
  ...rest
}: CustomElementProps<T>) {
  const Comp = (as ?? "div") as React.ElementType;
  return (
    <Comp ref={ref} {...rest}>
      {children}
    </Comp>
  );
}
