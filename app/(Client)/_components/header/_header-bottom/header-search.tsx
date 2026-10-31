import CustomInput from "@/components/custom-ui/custom-input";
import CustomElement from "@/components/utils/custom-element";

import { SearchIcon } from "lucide-react";
import { FormEvent, RefObject } from "react";

export default function HeaderSearch({
  refElem,
}: {
  refElem: RefObject<HTMLFormElement | null>;
}) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <CustomElement className="animate-scroll-fade-in bg-bgsearch/95 fixed inset-0 z-20 flex h-full min-h-screen w-full items-center justify-center text-white transition-all duration-300">
      <CustomElement className="p-4">
        <CustomElement
          as="form"
          onSubmit={handleSubmit}
          ref={refElem}
          className="relative flex max-w-4xl items-center justify-center border-b-4 border-gray-400/20"
        >
          <CustomInput
            id="search"
            name="search"
            className="w-full border-none px-0 text-5xl! outline-none focus-within:border-none focus-within:outline-none focus:border-none focus:shadow-none focus:outline-none focus-visible:ring-0"
            placeholder="Arama..."
          />
          <CustomElement
            as="button"
            type="submit"
            className="absolute top-[50%] right-0 -translate-y-1/2"
          >
            <SearchIcon size={50} className="text-gray-400" />
          </CustomElement>
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
