'use client'

import { onBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean,
    userId: string
}

export const Action = ({
    isFollowing,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnFollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnFollow()
        } else {
            handleFollow()
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`Blocked the user ${data.blocked.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    return (
        <>
            <Button
                disabled={isPending}
                onClick={onClick}
                variant='primary'
                className="w-full"
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
            <Button
                className="w-full my-2"
                onClick={handleBlock}
                disabled={isPending}
            >
                Block
            </Button>
        </>
    )
};
