'use client'

import { useParticipants } from "@livekit/components-react"
import { useMemo, useState } from "react"
import { useDebounceCallback, useDebounceValue } from "usehooks-ts"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { CommunityItem } from "./community-item"
import { LocalParticipant, RemoteParticipant } from "livekit-client"

interface ChatCommunityProps {
    viewerName: string,
    hostName: string,
    isHidden: boolean
}

export const ChatCommunity = ({
    viewerName,
    hostName,
    isHidden
}: ChatCommunityProps) => {
    const [value] = useState('')
    const [debounceValue, setValue] = useDebounceValue<string>(value, 500)

    const participants = useParticipants()

    const onChange = (newValue: string) => {
        setValue(newValue)
    }

    const filteredParticipants = useMemo(() => {
        // Deduplicate participants based on a condition
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        // Filter participants based on the debounced input value
        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debounceValue.toLowerCase());
        });
    }, [participants, debounceValue]);

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">Community is disabled</p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <Input
                placeholder="Search community"
                onChange={(e) => onChange(e.target.value)}
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                    No results
                </p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name}
                        participantIdentity={participant.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    )
}
