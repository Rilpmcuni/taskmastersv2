import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const words = [
    " Calidad ",
    " Comodidad ",
    " Confianza ",
    " Simplicidad ",
    " Eficiencia ",
    " Conveniencia ",
    " Excelencia ",
    " Accesibilidad ",
    " Profesionalismo ",
    " Facilidad ",
    " Seguridad ",
    " Flexibilidad ",
    " Confiabilidad ",
    " Comodidad ",
    " Experiencia ",
    " Confort ",
    " Perfección ",
    " Prontitud ",
    " Precisión ",
    " Sencillez ",
    " Reviasa ",
];
const colors = ["primary", "secondary", "greenyellow"];
const CarouselContainer = styled(Box)({
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
});

const CarouselWord = styled("div")(({ theme }) => ({
    position: "absolute",
    opacity: 0,
    transition: "opacity 0.5s",
    "&.show": {
        opacity: 1,
    },
}));

const TextCarousel: React.FC = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((currentWordIndex + 1) % words.length);
            setCurrentColorIndex(Math.floor(Math.random() * colors.length));
        }, 4000);
        return () => clearInterval(interval);
    }, [currentWordIndex]);

    return (
        <CarouselContainer
        sx={{
            height: { xs: "56px", md: "81px" },
        }}
        >
            {shuffledWords.map((word, index) => (
                <CarouselWord
                    className={currentWordIndex === index ? "show" : ""}
                >
                    {word.split("").map((letter, i) => (
                        <Typography
                            color={colors[currentColorIndex]}
                            fontWeight={700}
                            variant="h2"
                            sx={{
                                fontSize: { xs: "2.5rem", md: "4rem" },
                                transition: "color 1s", // Agrega esta línea
                            }}
                            key={i}
                            style={{
                                transition: `transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${
                                    i * 80
                                }ms`,
                                display: "inline-block",
                                transform:
                                    currentWordIndex === index
                                        ? "rotateX(0deg)"
                                        : "rotateX(90deg)",
                            }}
                        >
                            {letter}
                        </Typography>
                    ))}
                </CarouselWord>
            ))}
        </CarouselContainer>
    );
};

export default TextCarousel;
