import NextTopLoader from "nextjs-toploader";
const NextNProgressClient = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NextTopLoader height={4} color="#ffd234" showSpinner={false} />
            {children}
        </>
    );
};
export default NextNProgressClient;
