"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Collapse, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { ServicesData } from "@/data/ServicesData";

export default function ServiceWindow({
    selectedProduct,
}: {
    selectedProduct: any;
}) {
    let selectedService = ServicesData.find(
        (service) => service.title === selectedProduct
    );
    const steps = [
        {
            label: "Detalles del Trabajo",
            description: (
                <>
                    <span>{selectedService?.title}</span>
                    <span>{selectedService?.badge}</span>
                    <span>{selectedService?.description}</span>
                </>
            ),
        },
        {
            label: "Ubicación y Horarios",
            description: (
                <>
                    <TextField
                        id="time"
                        label="Desde"
                        type="time"
                        value={"day.from"}
                        // onChange={ }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            flexGrow: 1,
                        }}
                    />
                </>
            ),
        },
        {
            label: "Cálculo del Costo Estimado",
            description: <></>,
        },
    ];

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box
            sx={{
                boxShadow: 4,
                // maxWidth: "90%",
                // minWidth: "90%",
                display: "flex",
                flexDirection: "Column",
                borderRadius: "1.5rem",
                justifyContent: "start",
                bgcolor: "white",
                height: "100%",
            }}
        >
            <Stepper
                activeStep={activeStep}
                orientation="horizontal"
                sx={{
                    p: 2,
                    backgroundColor: "text.primary",
                    borderBottomLeftRadius: "1.5rem",
                    borderTopLeftRadius: "1.5rem",
                }}
            >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === activeStep ? (
                                    <Typography variant="body2" color="white">
                                        {step.label}
                                    </Typography>
                                ) : null
                            }
                        ></StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box
                sx={{
                    p: 4,
                    // paddingX:2,
                    // paddingy:2,
                    height: "100%",
                }}
            >
                {steps.map((step, index) => {
                    if (index === activeStep) {
                        return (
                            <Stack
                                sx={{
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "",
                                    flexDirection: "col",
                                    height: "100%",
                                }}
                                key={index}
                            >
                                {/* <Typography> */}

                                {step.description}

                                {/* </Typography> */}
                                <Box sx={{ mb: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1
                                            ? "Finish"
                                            : "Continue"}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </Box>
                            </Stack>
                        );
                    }
                    return null;
                })}
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
        </Box>
    );
}
