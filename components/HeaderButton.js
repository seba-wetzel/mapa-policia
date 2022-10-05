import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const HomeButton = ({ image = {}, text, active = false, goTo, alt, hoverText }) => {

    return (

        <Link href={goTo}>
            <div className="group text-center font-lulo h-full w-24 relative flex flex-col justify-center cursor-pointer">
                <div className="group-hover:hidden absolute self-center">
                    {image.src ? <Image src={image?.src} alt={alt} width={image?.w ?? 64} height={image?.h ?? 64} /> :
                        <p className="text-verde font-luloBold text-xs">
                            {text}
                        </p>
                    }
                </div>

                <button className="hidden group-hover:block absolute self-center">
                    <p className="text-violeta text-xxs font-luloBold">{hoverText}</p>
                </button>
                {active && <div className="h-2 w-2/3 self-center bg-violeta absolute inset-y-full"></div>}
            </div>

        </Link>
    );
};
export default HomeButton;

// 