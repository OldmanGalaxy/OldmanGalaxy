import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-cblack h-16">
      <div className="container mx-auto h-full px-6">
        <div className="hidden md:flex items-center justify-between h-full">
          <Link href="/">
            <Image
              src="/images/signature.png"
              alt="Signature"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          
          <div className="flex items-center space-x-8 text-cyellow font-oswald uppercase text-lg">
            <Link 
              href="/about"
              className="hover:text-cwhite duration-500"
            >
              About Me
            </Link>
            <Link 
              href="/projects"
              className="hover:text-cwhite duration-500"
            >
              Projects
            </Link>
            <Link 
              href="/"
              className="hover:text-cwhite duration-500"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="md:hidden flex justify-center items-center h-full">
          <Link href="/">
            <Image
              src="/images/signature.png"
              alt="Signature"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;