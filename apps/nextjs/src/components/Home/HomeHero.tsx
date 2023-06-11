import Image from "next/image";
import heroImage from "public/hero-image.png";
import { Button, Title } from "src/design-system/index";

export default function HomeHero() {
  return (
    <section className="home-hero relative bg-gradient-to-t from-gray-100 to-white pb-16 pt-10 lg:pt-0">
      <div className="main-wrapper relative z-10 flex h-full items-center backdrop-blur-sm md:backdrop-blur-0">
        <div className="md:w-1/2">
          <Title size="huge" className="mb-7 font-bold" as="h1">
            World-class psychiatry.
          </Title>
          <Title size="xxxlarge" className="text-black/80">
            Covered by your insurance
          </Title>
          <p className="mt-3 text-lg text-black/70">
            Schedule today with a Board-Certified provider and take a leap
            forward in your mental health. Get started with a free consultation!
          </p>

          <a
            href="https://form.jotform.com/231237140729048"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="mt-7 px-7 py-3 font-semibold">Contact us</Button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 h-[90vh] w-[45vw] md:right-20">
        <Image
          src={heroImage}
          alt="logo"
          fill
          draggable={false}
          sizes="(min-width: 1024px) 45vw, 80vw"
          className="bottom-0 h-full w-full object-contain object-bottom"
          priority
          quality={90}
        />
      </div>
    </section>
  );
}
