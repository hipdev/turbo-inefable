import Image, { type StaticImageData } from "next/image";
import defaultPicture from "public/visit-icon.jpg";

import { Title } from "../..";

type Props = {
  picture?: StaticImageData;
  title?: string;
  description?: string;
};

export const Feature = ({ picture, title, description }: Props) => {
  return (
    <div>
      <Image
        className="mb-3"
        src={picture ? picture : defaultPicture}
        alt="feature"
        width="77"
        height="77"
      />
      <Title size="xlarge" className="mb-1 text-black/80">
        {title || "Feature title"}
      </Title>
      <p className="text-black/60">
        {description ||
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatibus voluptatum. Quisquam, voluptatibus voluptatum."}
      </p>
    </div>
  );
};
