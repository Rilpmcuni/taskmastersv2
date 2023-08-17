// "use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NextNProgressClient = () => {
    return (
        // <NextNProgress
        //     color="#000"
        //     startPosition={0.3}
        //     stopDelayMs={200}
        //     height={99}
        //     // showOnShallow={true}
        //     // options={{ showSpinner: false }}
        // />

        <ProgressBar
            height="4px"
            color="#ffd234"
            options={{ showSpinner: false }}
            // delay={200}
            shallowRouting
        />
    );
};

export default NextNProgressClient;
