"use client";
import React, { useEffect, useState } from "react";

const ProgressBar = () => {
    const [Progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress + 10
            );
        }, 600);
        return () => {
            clearInterval(interval)
        }
    }, []);

    return <div>ProgressBar {Progress} ProgressBar</div>;
};
export default ProgressBar;
