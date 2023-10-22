"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import A from "@/../public/images/a.webp";
import B from "@/../public/images/b.webp";
import C from "@/../public/images/c.webp";
import D from "@/../public/images/d.webp";
import E from "@/../public/images/e.webp";
import ButtonBase from "@mui/material/ButtonBase";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Fade, Typography } from "@mui/material";

// import './styles.css';

// import required modules
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Box } from "@mui/material";
export default function DateSwiper({
    date,
    setSelectedHourIndex,
    selectedHourIndex,
}: {
    date: any;
    setSelectedHourIndex: any;
    selectedHourIndex: number;
}) {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                // slidesPerGroup={8}
                navigation={true}
                modules={[Navigation]}
                // centeredSlides={true}
                // modules={[Pagination]}
                className="mySwiper"
                style={{
                    display: "flex",
                    width: "100%",
                    boxShadow:
                        "rgb(204, 204, 204) -10px 0px 8px -10px inset, rgb(204, 204, 204) 10px 0px 8px -10px inset",
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                    height: "100%",
                }}
            >
                {date.map((dat: any, index: any) => {
                    return (
                        <SwiperSlide
                            style={{
                                display: "flex",
                                width: "fit-content",
                                backgroundColor: "transparent",
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                            }}
                            key={index}
                        >
                            <ButtonBase
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    alignSelf: "center",
                                    paddingX: 1.5,
                                    paddingY: 0.3,
                                    borderRadius: 1,
                                    border: "1px #d9d9d9 solid",
                                    "&:hover": {
                                        opacity: 0.9,
                                    },
                                    boxShadow:
                                        index === selectedHourIndex
                                            ? "0 0 1px 3px #ffd234"
                                            : "none",
                                }}
                                onClick={() => setSelectedHourIndex(index)}
                            >
                                <Typography
                                    sx={{
                                        pointerEvents: "none",
                                    }}
                                    variant="body1"
                                >
                                    {dat}
                                </Typography>
                            </ButtonBase>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
//
