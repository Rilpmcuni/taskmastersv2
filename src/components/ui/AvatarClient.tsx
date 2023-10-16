"use client";
import { Avatar } from "@mui/material";

export default function AvatarClient({ session }: { session: any }) {
    return (
        <>
            <Avatar
                sx={{ bgcolor: "primary" }}
                alt={session}
                src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${session}&flip=true&radius=50&backgroundColor=0AB4D6`}
            />
        </>
    );
}
