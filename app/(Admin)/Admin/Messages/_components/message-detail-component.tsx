"use client";

import { useSingleItemById } from "@/hooks/use-queries";
import { MainAdminMenuData } from "@/lib";

import { AddAppUserType, AddFormRef, AddUpdateContainerProps } from "@/types";

import React from "react";

import CustomElement from "@/components/utils/custom-element";
import { MessageType } from "@/types/entity.types";
import SetReadedComponent from "./set-readed-component";

const MessageDetail = React.forwardRef<
  AddFormRef,
  AddUpdateContainerProps<AddAppUserType>
>(({ idNumber, setOpened }) => {
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
