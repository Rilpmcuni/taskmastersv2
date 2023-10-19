"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Box, Skeleton } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
interface AvatarProps {
    uid: string;
    url: any;
    size: number;
}

export default function AvatarNormal({ uid, url, size }: AvatarProps) {
    const supabase = createClientComponentClient();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        async function downloadImage(path: string) {
            try {
                const { data, error } = await supabase.storage
                    .from("avatars")
                    .download(path);
                if (error) {
                    throw error;
                }

                const url = URL.createObjectURL(data);
                setAvatarUrl(url);
            } catch (error) {
                console.log("Error downloading image: ", error);
            }
        }

        if (url) downloadImage(url);
    }, [url, supabase]);

    return (
        <Box sx={{ position: "relative" }}>
            {avatarUrl ? (
                <Image
                    style={{
                        pointerEvents: "none",
                        borderRadius: "99rem",
                    }}
                    className="avatar image"
                    src={avatarUrl}
                    alt="Avatar"
                    width={size}
                    height={size}
                />
            ) : (
                <Box
                    sx={{
                        width: size,
                        height: size,

                        backgroundColor: "#bbbbbb60",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "99rem",
                    }}
                >
                    <PersonOutlineOutlinedIcon />
                </Box>
            )}
        </Box>
    );
}
