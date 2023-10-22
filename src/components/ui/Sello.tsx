import React from "react";
import Image from "next/image";
import { Stack } from "@mui/material";

export default function Sello() {
    return (
        <>
            <Stack
                sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    top: "82px",
                    // bottom: "0px",
                    right: { xs: "-4px", md: "auto" },
                    // left: { xs: "auto", md: "-5rem" },
                    // zIndex: -30,
                    // opacity: 0.9,
                }}
            >
                <Stack
                    sx={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: { xs: "150px", md: "200px" },
                        height: { xs: "150px", md: "200px" },
                    }}
                >
                    <Image
                        src={"/images/SELLO.svg"}
                        className="animate"
                        style={{
                            borderRadius: "99rem",
                            width: "100%",
                            height: "auto",
                        }}
                        width={33}
                        height={33}
                        alt="Sello"
                        priority
                    />
                    <Stack
                        sx={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            inset: "0px",
                            borderRadius: "99rem",
                        }}
                    >
                        <Stack
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "99rem",
                                p: 1,
                                width: { xs: "50px", md: "40px" },
                                height: { xs: "50px", md: "40px" },
                            }}
                        >
                            <Image
                                style={{
                                    borderRadius: "99rem",
                                    width: "100%",
                                    height: "auto",
                                }}
                                src={"/images/LOGO.svg"}
                                alt="Reviasa"
                                width={6}
                                height={6}
                                priority
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}
