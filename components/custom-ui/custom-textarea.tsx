import React from "react";
import { Textarea } from "../ui/textarea";

type CustomTextAreaProps = React.ComponentPropsWithoutRef<typeof Textarea> & {};

const CustomTextArea = React.forwardRef<
  React.ComponentRef<typeof Textarea>,
  CustomTextAreaProps
>((props, ref) => {
  return <Textarea ref={ref} {...props} />;
});
CustomTextArea.displayName = "CustomTextArea";
export default CustomTextArea;
