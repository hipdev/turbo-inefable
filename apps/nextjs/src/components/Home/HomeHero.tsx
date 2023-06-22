import Image from "next/image"
import heroImage from "public/family.jpeg"
import { Button, Title } from "src/design-system/index"

export default function HomeHero() {
  return (
    <section className="home-hero relative bg-gradient-to-t from-gray-100 to-white pb-16 pt-10 lg:pt-0">
      <div className="main-wrapper relative z-10 flex h-full items-center backdrop-blur-sm md:backdrop-blur-0">
        <div className="md:w-1/2">
          <Title size="huge" className="mb-7 font-bold" as="h2">
            Inefable
          </Title>
          <Title size="xxxlarge" className="text-black/80">
            Porque tu salud mental es importante
          </Title>
          <p className="mt-3 text-lg text-black/70">
            Espero te guste lo que pasará aquí, porque yo lo estoy disfrutando.
          </p>

          <Button className="mt-7 px-7 py-3 font-semibold">
            Sitio en construcción
          </Button>
        </div>
      </div>

      <div className="absolute bottom-40 right-40 h-[50vh] w-[35vw] overflow-hidden rounded-md">
        <Image
          src={heroImage}
          alt="logo"
          fill
          draggable={false}
          sizes="(min-width: 1024px) 45vw, 80vw"
          className="bottom-0 h-full w-full object-cover object-bottom "
          priority
          quality={90}
        />
      </div>
    </section>
  )
}
