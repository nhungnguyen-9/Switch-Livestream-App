import { getSelf } from "./auth-service"
import { db } from "./db"

export const getStreams = async () => {
    let userId

    try {
        const self = await getSelf()
        userId = self.id
    } catch {
        userId = null
    }

    let streams = []

    if (userId) {
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockerId: userId
                            }
                        }
                    }
                }
            },
            include: {
                user: true
            }
        })
    } else {
        streams = await db.stream.findMany({
            include: {
                user: true,
            },
            orderBy: [
                {
                    isLive: 'desc'
                },
                {
                    updatedAt: 'desc'
                }
            ]
        })
    }
    return streams
}