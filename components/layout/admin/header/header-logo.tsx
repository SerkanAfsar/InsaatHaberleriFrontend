import img from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
export default function HeaderLogo() {
  return (
    <Link href={"/"} title="Firma Rehberi">
      <Image src={img} alt="Firma Rehberi" width={200} height={50} />
    </Link>
  );
}
