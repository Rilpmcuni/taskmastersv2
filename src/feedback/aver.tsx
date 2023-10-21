// "use client";
// import React, { useState, useEffect } from "react";
// import { Fade } from "@mui/material";
// import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
// // import servicesTwo from "@/../public/images/servicesTwo.jpg";
// import LlavasaLogo from "@/../public/images/LlavasaLogo.svg";
// import { useTheme } from "@mui/material/styles";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import { Link as LinkMui } from "@mui/material";
// import Link from "next/link";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Collapse from "@mui/material/Collapse";
// import Image from "next/image";
// import {
//     Box,
//     Button,
//     FormControl,
//     FormHelperText,
//     SelectChangeEvent,
//     Stack,
//     Typography,
// } from "@mui/material";
// import { ContactData } from "@/data/ContactData";
// // "repeat(auto-fit, minmax(500px, auto))",
// import { Select, MenuItem } from "@mui/material";
// import ToggleButtonPerso from "@/components/function/ToggleButtonPerso";
// const citys = [
//     "Arica, Arica",
//     "Iquique, Tarapacá",
//     "Antofagasta, Antofagasta",
//     "Calama, Antofagasta",
//     "Copiapó, Atacama",
//     "La Serena, Coquimbo",
//     "Valparaíso, Valparaíso",
//     "Viña del Mar, Valparaíso",
//     "Cartagena, Valparaíso",
//     "Santiago, Metropolitana",
//     "Providencia, Metropolitana",
//     "Las Condes, Metropolitana",
//     "Rancagua, O'Higgins",
//     "Talca, Maule",
//     "Chillán, Ñuble",
//     "Concepción, Biobío",
//     "Talcahuano, Biobío",
//     "Temuco, Araucanía",
//     "Valdivia, Los Ríos",
//     "Osorno, Los Lagos",
//     "Puerto Montt, Los Lagos",
//     "Coyhaique, Aysén",
//     "Punta Arenas, Magallanes",
// ];
// export default function aver() {
//     const [propiedad, setPropiedad] = React.useState("10");
//     const [habitaciones, setHabitaciones] = React.useState("2");
//     const [city, setCity] = React.useState<string | null>(citys[3]);
//     const handleChangePropiedad = (event: SelectChangeEvent) => {
//         setPropiedad(event.target.value);
//     };
//     const [propiedadOptions, setPropiedadOptions] = useState({
//         options: ["Casa", "Departamento", "Oficina"],
//         map: {
//             "10": "casa",
//             "20": "departamento",
//             "30": "oficina",
//             "40": "parcela",
//         },
//     });
//     const handleChangeHabitaciones = (event: SelectChangeEvent) => {
//         setHabitaciones(event.target.value);
//     };
//     // habitaciones condicional
//     const renderSelectedValue = (selected: any) => {
//         if (selected === 1) {
//             return `Desde ${selected} habitación`;
//         }
//         return `Desde ${selected} habitaciones`;
//     };
//     const renderSelectedValueHref = (selected: any) => {
//         if (selected === 1) {
//             return `desde-${selected}-habitacion`;
//         }
//         return `desde-${selected}-habitaciones`;
//     };
//     // seacrh

//     const [selectedOption, setSelectedOption] = useState("Arrendar");
//     const handleOptionChange = (option: React.SetStateAction<any>) => {
//         setSelectedOption(option);
//         switch (option) {
//             case "Arrendar":
//                 setPropiedadOptions({
//                     options: ["Casa", "Departamento", "Oficina"],
//                     map: {
//                         "10": "casa",
//                         "20": "departamento",
//                         "30": "oficina",
//                         "40": "",
//                     },
//                 });
//                 break;
//             case "Comprar":
//                 setPropiedadOptions({
//                     options: ["Casa", "Departamento", "Oficina", "Parcela"],
//                     map: {
//                         "10": "casa",
//                         "20": "departamento",
//                         "30": "oficina",
//                         "40": "parcela",
//                     },
//                 });
//                 break;

//             case "Proyectos":
//                 setPropiedadOptions({
//                     options: ["Vivienda", "Parcela", "Oficina"],
//                     map: {
//                         "10": "vivienda",
//                         "20": "parcela",
//                         "30": "oficina",
//                         "40": "",
//                     },
//                 });
//                 break;
//             default:
//                 setPropiedadOptions({
//                     options: [],
//                     map: {
//                         "10": "",
//                         "20": "",
//                         "30": "",
//                         "40": "",
//                     },
//                 });
//         }
//     };
//     useEffect(() => {
//         // Reset propiedad to a valid value whenever selectedOption changes
//         if (selectedOption === "Arrendar") {
//             setPropiedad("10"); // Or whatever default value you want for "Arrendar"
//         } else if (selectedOption === "Comprar") {
//             setPropiedad("10"); // Or whatever default value you want for "Comprar" or "Proyectos"
//         }
//         if (selectedOption === "Proyectos") {
//             setPropiedad("10"); // Or whatever default value you want for "Arrendar"
//         }
//     }, [selectedOption]);
//     function propiedadChange(numero: string): any {
//         return (
//             propiedadOptions.map[
//                 numero as keyof typeof propiedadOptions.map
//             ] || {
//                 options: [],
//                 map: {
//                     "10": "",
//                     "20": "",
//                     "30": "",
//                     "40": "",
//                 },
//             }
//         );
//     }
//     const formattedCity = city
//         ?.toLowerCase()
//         .replace(/[áä]/g, "a")
//         .replace(/[éë]/g, "e")
//         .replace(/[íï]/g, "i")
//         .replace(/[óö]/g, "o")
//         .replace(/[úü]/g, "u")
//         .replace(/,/g, "")
//         .split(" ")
//         .reverse()
//         .join("/");

//     //
//     // responsive
//     const theme = useTheme();
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"), {
//         noSsr: true,
//     });
//     return (
//         <>
//             <Box
//                 sx={{
//                     display: "grid",
//                     gridGap: "8px",
//                     gridTemplateColumns:
//                         "repeat(auto-fit, minmax(200px, auto))",
//                     // marginTop: "1rem",}
//                     marginLeft: { xs: "0rem", md: "1rem" },
//                     marginRight: { xs: "0rem", md: "1rem" },
//                     marginBottom: "2rem",
//                 }}
//             >
//                 <Box
//                     sx={{
//                         position: "relative",
//                         height: { xs: "630px", md: "590px" },
//                         backgroundColor: "#1e293b",
//                         borderRadius: "1.5rem",
//                     }}
//                 >
//                     <Stack
//                         spacing={2}
//                         style={{
//                             zIndex: "30",
//                             position: "absolute",
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             height: "100%",
//                             width: "100%",
//                             borderRadius: "1.5rem",
//                             textAlign: "center",
//                             /*  */
//                             backgroundImage: `linear-gradient(0deg, #1e293b 0%, rgba(255,210,52,0) 100%)`,
//                         }}
//                     >
//                         <Stack
//                             display={"flex"}
//                             justifyContent="center"
//                             alignItems="stretch"
//                             sx={{
//                                 width: { xs: "90%", md: "60%" },
//                             }}
//                             direction="column"
//                             spacing={1}
//                             color={"white"}
//                         >
//                             <Typography
//                                 fontWeight={700}
//                                 variant="h2"
//                                 component="h2"
//                                 sx={{
//                                     fontSize: { xs: "3rem", md: "4rem" },
//                                 }}
//                             >
//                                 Llavasa: Más Allá del Inmobiliario
//                             </Typography>
//                             {/* Bienvenido a Reviasa:  */}
//                             <Typography variant="body1" component="p">
//                                 Tu Socio Inmobiliario en Chile: Tecnología,
//                                 Protección y Amistad en Cada Paso del Camino
//                             </Typography>
//                         </Stack>
//                         <Box
//                             display={"flex"}
//                             justifyContent="center"
//                             alignItems="center"
//                             sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 gap: 1,
//                                 borderRadius: "1rem",
//                                 padding: "0.5rem",
//                             }}
//                         >
//                             <ToggleButtonPerso
//                                 options={["Arrendar", "Comprar", "Proyectos"]}
//                                 groupName="group1"
//                                 value={selectedOption} // Pasamos el estado como valor
//                                 onChange={handleOptionChange} // Pasamos setSelectedOption como manejador de cambio
//                             />
//                             <Box
//                                 sx={{
//                                     display: "flex",
//                                     flexDirection: { xs: "column", md: "row" },
//                                     gap: 1,
//                                     borderRadius: "1rem",
//                                     padding: "0.5rem",
//                                     paddingTop: "1rem",
//                                     width: "100%",
//                                     backgroundColor: "white",
//                                     transition: "250ms ease-in-out",
//                                     boxShadow: 6,
//                                     "&:hover": {
//                                         transition: "250ms ease-in-out",
//                                         boxShadow: 4,
//                                     },
//                                 }}
//                             >
//                                 <FormControl
//                                     sx={{
//                                         minWidth: { xs: "auto", md: 180 },
//                                         flexGrow: 1,
//                                     }}
//                                     size="small"
//                                 >
//                                     <InputLabel id="tipoPropiedad">
//                                         Propiedad
//                                     </InputLabel>
//                                     <Select
//                                         id="tipoPropiedad"
//                                         value={propiedad}
//                                         onChange={handleChangePropiedad}
//                                         label="Propiedad"
//                                         displayEmpty
//                                         inputProps={{
//                                             "aria-label": "Without label",
//                                         }}
//                                     >
//                                         {propiedadOptions.options.map(
//                                             (option, index) => (
//                                                 <MenuItem
//                                                     key={index}
//                                                     value={(index + 1) * 10}
//                                                 >
//                                                     {option}
//                                                 </MenuItem>
//                                             )
//                                         )}
//                                     </Select>
//                                 </FormControl>

//                                 <FormControl
//                                     sx={{
//                                         display:
//                                             selectedOption != "Proyectos"
//                                                 ? "flex"
//                                                 : "none",
//                                         minWidth: { xs: "auto", md: 230 },
//                                         flexGrow: 1,
//                                     }}
//                                     size="small"
//                                 >
//                                     <InputLabel id="cantidadHabitaciones">
//                                         Habitaciones
//                                     </InputLabel>
//                                     <Select
//                                         sx={{
//                                             width: "100%",
//                                         }}
//                                         id="cantidadHabitaciones"
//                                         value={habitaciones}
//                                         onChange={handleChangeHabitaciones}
//                                         displayEmpty
//                                         inputProps={{
//                                             "aria-label": "Without label",
//                                         }}
//                                         label="Habitaciones"
//                                         renderValue={renderSelectedValue}
//                                     >
//                                         <MenuItem value={1}>1</MenuItem>
//                                         <MenuItem value={2}>2</MenuItem>
//                                         <MenuItem value={3}>3</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                                 <Autocomplete
//                                     value={city}
//                                     onChange={(
//                                         event: any,
//                                         newValue: any | null
//                                     ) => {
//                                         setCity(newValue);
//                                     }}
//                                     size="small"
//                                     disablePortal
//                                     id="combo-box-demo"
//                                     options={citys}
//                                     noOptionsText="Sin resultados"
//                                     sx={{
//                                         width: { xs: "auto", md: 300 },
//                                         flexGrow: 1,
//                                     }}
//                                     renderInput={(params) => (
//                                         <TextField
//                                             {...params}
//                                             label="Ciudad o Comuna"
//                                         />
//                                     )}
//                                     freeSolo
//                                     clearOnBlur
//                                 />
//                                 <Button
//                                     sx={{
//                                         display: { xs: "flex", md: "none" },
//                                     }}
//                                     size="large"
//                                     variant="contained"
//                                     LinkComponent={Link}
//                                     href={`${selectedOption.toLocaleLowerCase()}-${propiedadChange(
//                                         propiedad
//                                     )}-${
//                                         formattedCity !== null
//                                             ? `${formattedCity}`
//                                             : "antofagasta/antofagasta"
//                                     }${
//                                         selectedOption != "Proyectos"
//                                             ? `/${renderSelectedValueHref(
//                                                   habitaciones
//                                               )}`
//                                             : ""
//                                     }`}
//                                 >
//                                     BUSCAR
//                                 </Button>
//                                 <Button
//                                     LinkComponent={Link}
//                                     href={`${selectedOption.toLocaleLowerCase()}-${propiedadChange(
//                                         propiedad
//                                     )}-${
//                                         formattedCity !== null
//                                             ? `${formattedCity}`
//                                             : "antofagasta/antofagasta"
//                                     }${
//                                         selectedOption != "Proyectos"
//                                             ? `/${renderSelectedValueHref(
//                                                   habitaciones
//                                               )}`
//                                             : ""
//                                     }`}
//                                     sx={{
//                                         display: { xs: "none", md: "flex" },
//                                     }}
//                                     size="medium"
//                                     variant="contained"
//                                 >
//                                     BUSCAR
//                                 </Button>
//                             </Box>
//                             <Button
//                                 size="small"
//                                 color="secondary"
//                                 LinkComponent={Link}
//                                 href="/Características"
//                                 variant="text"
//                                 sx={{
//                                     transition: "300ms",
//                                     textDecoration: "wavy underline",
//                                     "&:hover": {
//                                         transition: "300ms",
//                                         textDecoration: "wavy underline",
//                                     },
//                                 }}
//                             >
//                                 Publica GRATIS con nosotros
//                             </Button>
//                         </Box>
//                     </Stack>
//                     <Fade in={selectedOption === "Arrendar"} timeout={600}>
//                         <Image
//                             priority
//                             src={"/images/a.webp"}
//                             alt="Hero Arrendar"
//                             fill={true}
//                             style={{
//                                 objectFit: "cover",
//                                 borderRadius: "1.5rem",
//                                 userSelect: "none",
//                             }}
//                         />
//                     </Fade>
//                     <Fade in={selectedOption === "Comprar"} timeout={600}>
//                         <Image
//                             src={"/images/b.webp"}
//                             alt="Hero Arrendar"
//                             fill={true}
//                             style={{
//                                 objectFit: "cover",
//                                 borderRadius: "1.5rem",
//                                 userSelect: "none",
//                             }}
//                         />
//                     </Fade>
//                     <Fade in={selectedOption === "Proyectos"} timeout={600}>
//                         <Image
//                             src={"/images/d.webp"}
//                             alt="Hero Arrendar"
//                             fill={true}
//                             style={{
//                                 objectFit: "cover",
//                                 borderRadius: "1.5rem",
//                                 userSelect: "none",
//                             }}
//                         />
//                     </Fade>
//                 </Box>
//                 {/* And more images in the grid... */}
//             </Box>
//         </>
//     );
// }
import React from "react";

export default function aver() {
    return <div>aver</div>;
}
