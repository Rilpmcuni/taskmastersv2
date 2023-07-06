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
import { Collapse } from "@mui/material";
import { Stack } from "@mui/material";

const steps = [
    {
        label: "Select campaign settings",
        description: `For each ad campaign that you create.`,
    },
    {
        label: "Create an ad group",
        description:
            "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
        label: "Create an ad",
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.`,
    },
];

export default function ServiceWindow() {
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
                height: "16rem",
                display: "flex",
                flexDirection: "row",
                borderRadius: "1.5rem",
                justifyContent: "start",
            }}
        >
            <Stepper
                activeStep={activeStep}
                orientation="vertical"
                sx={{
                    p: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                    borderBottomLeftRadius: "1.5rem",
                    borderTopLeftRadius: "1.5rem",
                    minWidth: "15%",
                    maxWidth: "15%",
                }}
            >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">
                                        Last step
                                    </Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        {/* <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
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
                                </div>
                            </Box>
                        </StepContent> */}
                    </Step>
                ))}
            </Stepper>
            {/* backgroundColor:"rgba(0, 0, 0, 0.12)", */}

            <Box
                sx={{
                    p: 4,
                    // paddingX:2,
                    // paddingy:2,
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
                                }}
                                key={index}
                            >
                                <Typography>{step.label}</Typography>
                                <Typography>{step.description}</Typography>
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
