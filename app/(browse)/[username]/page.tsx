import { isFollowingUser } from "@/lib/follow-service";
import { getUserByName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Action } from "./_components/action";

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByName(params.username)

    if (!user) {
        notFound()
    }

    const isFollowing = await isFollowingUser(user.id)

    return (
        <div>
            user: {params.username}
            <p>is Following: {`${isFollowing}`}</p>
            <Action userId={user.id} isFollowing={isFollowing} />
        </div>
    );
}

export default UserPage;