import { Suspense } from "react";
import AuthToast from "./Components/auth-toast";
import LoginSection from "./Components/login-section";
import LogoSection from "./Components/logo-section";
// import { Suspense } from "react";

export default function Page() {
  return (
    <div className="font-outfit flex h-screen w-full items-stretch">
      <Suspense fallback={null}>
        <AuthToast />
      </Suspense>

      <LoginSection />
      <LogoSection />
    </div>
  );
}
