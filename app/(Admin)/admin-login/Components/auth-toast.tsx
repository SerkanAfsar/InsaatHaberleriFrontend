"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AuthToast() {
  const params = useSearchParams();
  const auth = params.get("auth");

  useEffect(() => {
    switch (auth) {
      case "UnAuth": {
        toast.error("Oturum Süreniz Dolmuştur", {
          position: "top-right",
        });
        break;
      }
      case "Forbidden": {
        toast.error("Yetkiniz Yok", {
          position: "top-right",
        });
        break;
      }
    }
  }, [auth]);

  return null;
}
