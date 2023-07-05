import React from "react";
import Image from "next/image";
import Logosvg from "@/../public/images/LOGO.svg";

export default function Logo() {
    return (
        <div>
            <Image
                className=""
                src={Logosvg}
                alt="TaskMasters"
                width={55}
                height={55}
                priority
            />
        </div>
    );
}
