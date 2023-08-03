import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center w-full mt-5 border-b-2 pb-3 sm:px-4 px-2">
      <Link href="./ " className="flex space-x-3">
        <Image
          alt="header QR Loved"
          src="/Logo2.svg"
          width={300}
          height={50}
        />
      </Link>
    </header>
  );
}
