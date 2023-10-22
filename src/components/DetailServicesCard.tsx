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
    selectedDetailService: any;
}
const DetailServicesCard: React.FC<Props> = ({
    service,
    handleCardClick,
    selectedDetailService,
}) => {
    return (
        <>
            <Grid item xs={6} sm={2}>
                <Card
                    variant="outlined"
                    sx={{
                        userSelect: "none",
                        position: "relative",
                        overflow: "visible",
                        boxShadow:
                            selectedDetailService === service.title
                                ? "0 0 1px 5px #ffd234"
                                : "none",
                        cursor: "pointer",
                    }}
                    onClick={handleCardClick}
                >
                    <CardActionArea>
                        <CardMedia
                            sx={{
                                height: 70,
                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem",
                            }}
                            image={service.img}
                            title={service.title}
                        />
                        <CardContent>
                            {selectedDetailService === service.title && (
                                <Radio
                                    checked={selectedDetailService === service.title}
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

export default DetailServicesCard;
