import CustomElement from "@/components/utils/custom-element";
import img from "@/public/images/reklam.jpg";
import Image from "next/image";
export default function MainPageAdvertisement() {
  return (
    <CustomElement className="block w-full">
      <Image
        src={img}
        width={386}
        height={304}
        alt="Reklam"
        className="h-auto w-full object-cover object-center"
      />
    </CustomElement>
  );
}
