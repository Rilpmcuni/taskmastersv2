import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ paddingX: 1, paddingY: 2.5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({
    labels,
    contents,
}: {
    labels: any;
    contents: any;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("tab");

    const [value, setValue] = React.useState(Number(search) || 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        router.push(`${pathname}?tab=${newValue}`);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    {labels.map((label: any, index: any) => (
                        <Tab
                            label={label}
                            {...a11yProps(index)}
                            sx={{
                                borderTopLeftRadius: "0.5rem",
                                borderTopRightRadius: "0.5rem",
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
            {contents.map((content: any, index: any) => (
                <CustomTabPanel value={value} index={index}>
                    {content}
                </CustomTabPanel>
            ))}
        </Box>
    );
}
