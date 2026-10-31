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
    const { value, ...selectProps } = props;

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
          {...selectProps}
          value={value ?? undefined}
        />
      </div>
    );
  },
);

CustomSelect.displayName = "CustomSelect";
export default CustomSelect;
