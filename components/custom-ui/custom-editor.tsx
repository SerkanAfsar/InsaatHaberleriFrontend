"use client";

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Bold, Essentials, Italic, Paragraph } from "ckeditor5";
import "ckeditor5/ckeditor5.css";

type CustomEditorProps = React.ComponentPropsWithoutRef<typeof CKEditor>;
type EditorProps = Omit<CustomEditorProps, "editor">;

const CustomEditor = React.forwardRef<
  React.ComponentRef<typeof CKEditor>,
  EditorProps
>(({ ...rest }, ref) => {
  return (
    <CKEditor
      ref={ref}
      editor={ClassicEditor}
      data="<p>Merhaba dünya</p>"
      config={{
        licenseKey: "GPL", // 🔥 free kullanım için
        plugins: [Essentials, Bold, Italic, Paragraph],
        toolbar: ["undo", "redo", "|", "bold", "italic"],
      }}
      {...rest}
    />
  );
});

CustomEditor.displayName = "CustomEditor";
export default CustomEditor;
