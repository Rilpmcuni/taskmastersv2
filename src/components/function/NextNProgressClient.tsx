"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <ProgressBar
                height="4px"
                color="#ffd234"
                options={{ showSpinner: false }}
                // delay={200}
                shallowRouting
            />
        </>
    );
};
export default Providers;