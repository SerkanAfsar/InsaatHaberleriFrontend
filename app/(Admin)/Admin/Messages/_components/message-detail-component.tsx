"use client";
import AdminModalSubmit from "@/components/datatables/datatable-modal-submit";
import CustomSelect from "@/components/custom-ui/custom-select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { useCrudData, useSingleItemById } from "@/hooks/use-queries";
import { MainAdminMenuData } from "@/lib";
import { setErrors } from "@/lib/utils";

import {
  AddAppUserType,
  AddFormRef,
  AddUpdateContainerProps,
  CustomOptionItemProps,
} from "@/types";

import React, { useEffect, useImperativeHandle, useRef } from "react";
import { Controller } from "react-hook-form";
import CustomElement from "@/components/utils/custom-element";
import { MessageType } from "@/types/entity.types";
import SetReadedComponent from "./set-readed-component";

const MessageDetail = React.forwardRef<
  AddFormRef,
  AddUpdateContainerProps<AddAppUserType>
>(({ idNumber, setOpened }, ref) => {
  const { data } = useSingleItemById<MessageType>(
    idNumber!,
    MainAdminMenuData.Messages.apiUrl,
    MainAdminMenuData.Messages.validateKey,
  );

  return (
    <CustomElement className="flex h-full w-full flex-col gap-4">
      <CustomElement className="flex w-full flex-col gap-2">
        <CustomElement className="font-bold">İsim Soyisim</CustomElement>
        <CustomElement>{data?.nameSurname}</CustomElement>
      </CustomElement>
      <CustomElement className="flex w-full flex-col gap-2">
        <CustomElement className="font-bold">E Mail</CustomElement>
        <CustomElement>{data?.eMail}</CustomElement>
      </CustomElement>
      <CustomElement className="flex w-full flex-col gap-2">
        <CustomElement className="font-bold">Konu</CustomElement>
        <CustomElement>{data?.subject}</CustomElement>
      </CustomElement>
      <CustomElement className="flex w-full flex-col gap-2">
        <CustomElement className="font-bold">Mesaj</CustomElement>
        <CustomElement>{data?.messageText}</CustomElement>
      </CustomElement>
      <SetReadedComponent id={idNumber as number} setOpened={setOpened} />
    </CustomElement>
  );
});
MessageDetail.displayName = "MessageDetail";

export default MessageDetail;
