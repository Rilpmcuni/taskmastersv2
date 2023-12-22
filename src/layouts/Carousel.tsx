import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import heroImg from "@/../public/images/heroImg.jpg";
import heroRabbit from "@/../public/images/heroRabbit.webp";
import CallUsImgOne from "@/../public/images/CallUsImgOne.webp";
import CallUsImgTwo from "@/../public/images/CallUsImgTwo.webp";
import featureImg from "@/../public/images/featureImg.webp";
import servicesOne from "@/../public/images/servicesOne.webp";
import servicesTwo from "@/../public/images/servicesTwo.jpg";
import servicesTree from "@/../public/images/servicesTree.webp";

import pintor from "@/../public/images/cards/pintor.jpg";
import instalador from "@/../public/images/cards/instalador.jpg";
import reparacion from "@/../public/images/cards/reparacion.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

// import './styles.css';

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import { Box } from "@mui/material";

export default function Carousel() {
    const JobsImage = [
        heroImg,
        heroRabbit,
        CallUsImgOne,
        CallUsImgTwo,
        featureImg,
        servicesOne,
        servicesTwo,
        servicesTree,
        pintor,
        instalador,
        reparacion,
    ];

    return (
        <>
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={true}
                centeredSlides={false}
                slidesPerView={2}
                slidesPerGroup={2}
                spaceBetween={20}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
                style={{
                    borderRadius: "1.5rem",
                }}
            >
                {JobsImage.map((image: any, index: any) => (
                    <SwiperSlide key={index}>
                        <Box
                            sx={{
                                // width: "10rem",
                                height: "24rem",
                                // position: "relative",
                                borderRadius: "1.5rem",
                            }}
                        >
                            <Image
                                alt={`trabajos${index}`}
                                fill={true}
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "1.5rem",
                                }}
                                src={image}
                            />
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
