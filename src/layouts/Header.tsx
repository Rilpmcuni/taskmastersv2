import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
    Badge,
    Button,
    Chip,
    IconButton,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import Logo from "@/components/ui/Logo";

export default function Header() {
    return (
        <Stack
            bgcolor={"white"}
            position={"sticky"}
            top={0}
            display={"flex"}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            paddingX={"1rem"}
            zIndex={50}
        >
            <Link
                href={"/"}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                <Logo />
                {/* <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        mr: 2,
                        fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    taskMasters
                </Typography> */}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color="grey.700"
                    sx={{
                        mr: 2,
                        fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none",
                        /*  */

                        backgroundcolor: "primary.main",
                        backgroundImage: `linear-gradient(to right, #1681FF 23%, #FFD234 42%)`,
                        "&:hover": {
                            backgroundImage: `linear-gradient(to right, #FFD234 23%, #1681FF 42%)`,
                        },
                        backgroundSize: "100%",
                        backgroundRepeat: "repeat",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    taskMasters
                </Typography>
            </Link>
            <Stack
                sx={{ display: { xs: "none", md: "flex" } }}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={1}
            >
                <Button>Inicio</Button>
                <Button>Nosotros</Button>
                <Button>Servicios</Button>
                <Badge color="primary" badgeContent="+20">
                <Button
                    sx={{
                        boxShadow: 0,
                        "&:hover": {
                            boxShadow: 0,
                            bgcolor: "secondary.dark",
                        },
                    }}
                    variant="contained"
                    color="secondary"
                >
                    Empleo
                </Button>
                </Badge>
                <Button>Contacto</Button>
            </Stack>
            <Button
                variant="contained"
                size="medium"
                sx={{ boxShadow: 0 }}
                href={"tel:+123456789"}
                // sx={{ borderRadius: "0.8rem" }}
                LinkComponent={Link}
                startIcon={<LocalPhoneIcon />}
            >
                Llámanos
            </Button>
        </Stack>
    );
}
