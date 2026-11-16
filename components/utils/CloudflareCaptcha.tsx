"use client";

import { Turnstile, TurnstileProps } from "@marsidev/react-turnstile";

type Props = {
  onVerify: (token: string) => void;
  onExpire: () => void;
  className?: string;
  optionsRest: TurnstileProps["options"];
};

export default function CloudflareCaptcha({
  onVerify,
  onExpire,
  className,
  optionsRest,
}: Props) {
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
      onSuccess={onVerify}
      onExpire={onExpire}
      onError={onExpire}
      className={className && className}
      options={{
        theme: "auto",
        ...optionsRest,
      }}
    />
  );
}
