import CustomElement from "@/components/utils/custom-element";

export default function ContactLeft() {
  return (
    <CustomElement className="flex flex-1 flex-col items-start justify-start gap-4">
      <CustomElement as="h2" className="text-xl font-semibold">
        İLETİŞİM
      </CustomElement>
      <CustomElement as="p" className="text-sm leading-7 text-gray-800">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
        nobis mollitia error incidunt quam voluptatum? Quaerat aperiam vel
        commodi maiores veritatis non nisi, cumque deleniti similique
        praesentium ipsum quibusdam vitae iure optio. Aut quibusdam sunt ipsa,
        odio reprehenderit nam voluptatibus. Maxime accusamus fugit animi
        repellat quas hic fugiat placeat. Quas.
      </CustomElement>
      <CustomElement>info@insaatgundemi.org</CustomElement>
    </CustomElement>
  );
}
