import { isFollowingUser } from "@/lib/follow-service";
import { getUserByName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Action } from "./_components/action";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamLayer } from "@/components/stream-player";

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByName(params.username)

    if (!user || !user.stream) {
        notFound()
    }

    const isFollowing = await isFollowingUser(user.id)
    const isBlocked = await isBlockedByUser(user.id)

    if (isBlocked) {
        notFound()
    }

    return (
        <StreamLayer
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
        />
    );
}

export default UserPage;