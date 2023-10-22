import {
    Grid,
    Card,
    CardContent,
    Typography,
    Radio,
    CardActionArea,
    CardMedia,
} from "@mui/material";
import { SetStateAction, useState } from "react";

interface Props {
    service: any;
    handleCardClick: any;
    selectedProduct: any;
}
const ServicesCardV2: React.FC<Props> = ({
    service,
    handleCardClick,
    selectedProduct,
}) => {
    return (
        <>
            <Grid item xs={6} sm={3} md={3}>
                <Card
                    variant="outlined"
                    sx={{
                        userSelect: "none",
                        position: "relative",
                        overflow: "visible",
                        boxShadow:
                            selectedProduct === service.title
                                ? "0 0 1px 5px #ffd234"
                                : "none",
                        cursor: "pointer",
                    }}
                    onClick={handleCardClick}
                >
                    <CardActionArea>
                        <CardMedia
                            sx={{
                                height: 140,
                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem",
                            }}
                            image={service.image}
                            title={service.title}
                        />
                        <CardContent>
                            {selectedProduct === service.title && (
                                <Radio
                                    checked={selectedProduct === service.title}
                                    sx={{
                                        position: "absolute",
                                        top: "-10px",
                                        left: "-10px",
                                        zIndex: 1,
                                        // bgcolor: "secondary.main",
                                        // boxShadow: "0 0 1px 1px #000",
                                        color: "primary",
                                        "&.Mui-checked": {
                                            color: "primary",
                                        },
                                    }}
                                />
                            )}
                            <Typography
                                variant="h6"
                                component="div"
                                fontWeight={600}
                            >
                                {service.title}
                            </Typography>
                            {/* <Typography variant="body2" color="text.secondary">
                                {service.description}
                            </Typography> */}
                            <Typography variant="button" color="primary">
                                Solicitar
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    );
};

export default ServicesCardV2;
