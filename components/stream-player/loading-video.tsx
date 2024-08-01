import { Loader, WifiOff } from 'lucide-react'
import React from 'react'

interface LoadingVideoProps {
    label: string
}

export const LoadingVideo = ({
    label
}: LoadingVideoProps) => {
    return (
        <div className='h-full flex flex-col space-y-4 justify-center items-center'>
            <Loader className='h-10 w-10 text-muted-foreground animate-spin' />
            <p className='text-muted-foreground'>
                {label}
            </p>
        </div>
    )
}
