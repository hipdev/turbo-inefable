import Image from "next/image";
import Link from "next/link";
import logo from "public/legion-logo.png";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center bg-white pb-6 pt-8 md:pt-10">
      <Image src={logo} alt="logo" width="146" height="40" />
      <p className="mt-5 font-semibold text-black/80 md:mt-7">
        Fueling the future of mental health
      </p>

      <nav className="mt-5 flex gap-8 text-sm text-black/70 md:text-base">
        <Link href="#" className="hover:text-black/80">
          Help center
        </Link>
        <Link href="#" className="hover:text-black/80">
          Privacy policy
        </Link>
        <Link href="#" className="hover:text-black/80">
          Terms of service
        </Link>
      </nav>
      <div className="main-wrapper mt-5 flex w-full items-center justify-between border-t border-black/10 pt-3 text-sm md:mt-10">
        <div className="flex gap-3 text-xl text-black/60 md:text-2xl">
          <a
            href="https://www.instagram.com/legion.health/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <AiOutlineInstagram />
          </a>
          <a
            href="https://twitter.com/LegionHealth"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <AiOutlineTwitter />
          </a>
          <a
            href="https://www.linkedin.com/company/legionhealth/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <AiFillLinkedin />
          </a>
        </div>
        <p className="text-xs text-black/60 md:text-sm">
          Copyright © {new Date().getFullYear()} Legion Health
        </p>
      </div>
    </footer>
  );
};
