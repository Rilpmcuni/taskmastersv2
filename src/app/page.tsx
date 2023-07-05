"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import Top from "@/layouts/Top";
import { Link, Stack, Typography } from "@mui/material";
import Hero from "@/layouts/Hero";
export default function Home() {
    return (
        <main>
            <Hero/>
            <Stack
                display={"flex"}
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
                paddingX={"1rem"}
            >
                <Top />
                <Button variant="contained">Hello World</Button>
                <Button variant="contained">Hello World</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
                <Button sx={{ boxShadow: 0 }} variant="contained">Hello World</Button>
                <Button sx={{ boxShadow: 0 }} variant="contained">Hello World</Button>
                <Button sx={{ boxShadow: 0 }} color="secondary">Secondary</Button>
                <Button sx={{ boxShadow: 0 }} variant="contained" color="success">
                    Success
                </Button>
                <Button sx={{ boxShadow: 0 }} variant="outlined" color="error">
                    Error
                </Button>
                <Button variant="contained">Hello World</Button>
                <Button variant="contained">Hello World</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
                <Button variant="contained">Hello World</Button>
                <Button variant="contained">Hello World</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
                <Button variant="contained">Hello World</Button>
                <Button variant="contained">Hello World</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
                <Button variant="contained">Hello World</Button>
                <Button variant="contained">Hello World</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
                <Button variant="contained">Hello World</Button>
                <Button variant="contained">Hello World</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
                <Button variant="contained">Hello World</Button>
                <Button variant="contained">Hello World</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
                <Button variant="contained">Hello World</Button>
                <Button variant="contained">Hello World</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
                <Button variant="contained">Hello World</Button>
                <Button variant="contained">Hello World</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
                <Button variant="contained">Hello World</Button>
                <Button variant="contained">Hello World</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
            </Stack>
        </main>
    );
}
