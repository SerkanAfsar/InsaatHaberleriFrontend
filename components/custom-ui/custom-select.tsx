"use client";
import React, { useImperativeHandle, useRef } from "react";
import Select from "react-select";

export type CustomSelectRef = {
  deneme: () => void;
};

type CustomSelectProps = React.ComponentPropsWithoutRef<typeof Select> & {};

const CustomSelect = React.forwardRef<CustomSelectRef, CustomSelectProps>(
  (props, ref) => {
    const innerRef = useRef<React.ComponentRef<typeof Select>>(null);

    useImperativeHandle(ref, () => ({
      deneme: () => {
        alert("Test");
      },
    }));

    return (
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <Select
          className="w-full"
          noOptionsMessage={() => "Sonuç Bulunamadı..."}
          ref={innerRef}
          {...props}
        />
      </div>
    );
  },
);

CustomSelect.displayName = "CustomSelect";
export default CustomSelect;
