import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";

const font = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800']
})

export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-white rounded-full p-2">
                <Image
                    src='/logo.svg'
                    alt="Switch"
                    height='60'
                    width='60'
                />
            </div>
            <div className={cn(
                "flex flex-col items-center",
                font.className
            )}>
                <p className='text-xl font-semibold text-white'>
                    Gamehub
                </p>
                <p className='text-sm text-muted-foreground'>
                    Let&apos;s play
                </p>
            </div>
        </div>
    )
};
