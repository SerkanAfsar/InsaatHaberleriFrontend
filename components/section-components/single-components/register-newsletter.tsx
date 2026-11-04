import CustomElement from "@/components/utils/custom-element";

export default function RegisterNewsLetter() {
  return (
    <CustomElement as="section" className="categoryWithNews">
      <CustomElement
        as="h3"
        className="mb-6 border-b border-gray-300 pb-6 text-xl font-semibold text-black"
      >
        E-Bülten&apos;e Kayıt Olun
      </CustomElement>
      <CustomElement
        as="p"
        className="font-opensans text-sm leading-7 text-gray-600"
      >
        Faydalı içeriklerden ve özel fırsatlardan haberdar olmak için e-posta
        bültenimize abone olun.
      </CustomElement>
      <CustomElement
        as="input"
        type="email"
        className="my-5 block w-full border border-gray-700 p-3 text-sm text-black placeholder:text-gray-400"
        placeholder="E-Posta Adresinizi Giriniz.."
      />
      <CustomElement
        as="button"
        className="w-full bg-black p-3 text-sm text-white"
      >
        Kayıt Ol
      </CustomElement>
    </CustomElement>
  );
}
