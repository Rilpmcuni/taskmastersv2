import {
    Grid,
    Card,
    CardContent,
    Typography,
    Radio,
    CardActionArea,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Box,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import { usePathname } from "next/navigation";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import ElectricBoltRoundedIcon from "@mui/icons-material/ElectricBoltRounded";
import GasMeterTwoToneIcon from "@mui/icons-material/GasMeterTwoTone";

interface Props {
    Job: any;
}
const JobCard: React.FC<Props> = ({ Job }) => {
    const pathname = usePathname();
    function obtenerNombreRegion(numero: number): string {
        const regiones: { [key: number]: string } = {
            1: "Arica y Parinacota",
            2: "Tarapacá",
            3: "Antofagasta",
            4: "Atacama",
            5: "Valparaíso",
            6: "Coquimbo",
            7: "Metropolitana de Santiago",
            8: "Libertador General Bernardo O'Higgins",
            9: "Maule",
            10: "Ñuble",
            11: "Biobío",
            12: "Araucanía",
        };

        return regiones[numero] || "Región no encontrada";
    }
    function obtenerNivelExperiencia(numero: number): string {
        const experiencia: { [key: number]: string } = {
            0: "Sin experiencia",
            1: "1 año exp",
            2: "2 años exp",
            3: "> 3 años exp",
        };

        return experiencia[numero] || "Error experiencia";
    }
    function obtenerEmploy(numero: number): string {
        const employ: { [key: number]: string } = {
            0: "Tiempo completo",
            1: "Medio tiempo",
            2: "Bajo demanda",
            3: "Negociable",
        };

        return employ[numero] || "Error employ";
    }
    function obtenerIco(nombre: string): string {
        const employ: { [key: string]: any } = {
            Gasfitería: (
                <GasMeterIcon
                    sx={{ borderRadius: "0.5rem", border: "5px solid #ffd234" }}
                    color="primary"
                    fontSize="large"
                />
            ),
            Plomería: (
                <PlumbingIcon
                    sx={{ borderRadius: "0.5rem", border: "5px solid #ffd234" }}
                    color="primary"
                    fontSize="large"
                />
            ),
            Electricidad: (
                <ElectricBoltRoundedIcon
                    sx={{ borderRadius: "0.5rem", border: "5px solid #ffd234" }}
                    color="primary"
                    fontSize="large"
                />
            ),
        };

        return employ[nombre] || "Error icon";
    }
    return (
        <>
            <Grid item xs={12} sm={4}>
                <LinkMui
                    component={Link}
                    href={`${pathname}/${Job.id}`}
                    sx={{
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    <Card
                        variant="outlined"
                        sx={{
                            userSelect: "none",
                            position: "relative",
                            overflow: "visible",
                            cursor: "pointer",
                        }}
                    >
                        <CardActionArea>
                            <CardContent>
                                <Stack direction="column" spacing={0}>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        fontWeight={600}
                                    >
                                        {obtenerIco(Job.title)}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        fontWeight={600}
                                    >
                                        {Job.title}
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" component="div">
                                    {obtenerNombreRegion(Job.location)}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <List dense>
                                        <ListItem>
                                            <BarChartRoundedIcon
                                                fontSize="small"
                                                sx={{
                                                    color: "text.secondary",
                                                    mr: 0.5,
                                                }}
                                            />

                                            <ListItemText
                                                primary={obtenerNivelExperiencia(
                                                    Job.experience
                                                )}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <WatchLaterRoundedIcon
                                                fontSize="small"
                                                sx={{
                                                    color: "text.secondary",
                                                    mr: 0.5,
                                                }}
                                            />

                                            <ListItemText
                                                primary={obtenerEmploy(
                                                    Job.employ
                                                )}
                                            />
                                        </ListItem>
                                    </List>
                                    <List dense>
                                        <ListItem>
                                            <AccountBalanceRoundedIcon
                                                fontSize="small"
                                                sx={{
                                                    color: "text.secondary",
                                                    mr: 0.5,
                                                }}
                                            />

                                            <ListItemText
                                                primary={`$${Job.salary}.000`}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <PersonRoundedIcon
                                                fontSize="small"
                                                sx={{
                                                    color: "text.secondary",
                                                    mr: 0.5,
                                                }}
                                            />

                                            <ListItemText primary={Job.role} />
                                        </ListItem>
                                    </List>
                                </Box>

                                <Typography variant="button" color="primary">
                                    Solicitar
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </LinkMui>
            </Grid>
        </>
    );
};

export default JobCard;
