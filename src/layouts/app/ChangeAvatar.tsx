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
    onUpload: (filePath: string) => void;
}

export default function Avatar({ uid, url, size, onUpload }: AvatarProps) {
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

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const filePath = `${uid}-${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            onUpload(filePath);
        } catch (error) {
            alert("Error uploading avatar!");
        } finally {
            setUploading(false);
        }
    };

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
            <Box sx={{ width: size, position: "absolute", bottom: 0 }}>
                <label
                    className="button primary block"
                    htmlFor="single"
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: "99rem",
                        padding: 1,
                    }}
                >
                    {uploading ? (
                        "Cargando ..."
                    ) : (
                        <Box
                            sx={{
                                display: "inline-flex",
                                backgroundColor: "#fff",
                                borderRadius: "99rem",
                                padding: "3px",
                                alignItems: "center",
                            }}
                        >
                            <FileUploadOutlinedIcon
                                fontSize="large"
                                color="primary"
                            />
                        </Box>
                    )}
                </label>
                <input
                    style={{
                        visibility: "hidden",
                        position: "absolute",
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </Box>
        </Box>
    );
}
