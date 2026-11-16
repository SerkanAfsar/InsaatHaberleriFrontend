"use client";

import { Turnstile } from "@marsidev/react-turnstile";

type Props = {
  onVerify: (token: string) => void;
  onExpire: () => void;
};

export default function CloudflareCaptcha({ onVerify, onExpire }: Props) {
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
      onSuccess={onVerify}
      onExpire={onExpire}
      onError={onExpire}
      options={{
        theme: "auto",
        size: "flexible",
      }}
    />
  );
}
