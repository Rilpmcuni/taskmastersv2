import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActionArea,
} from "@mui/material";

interface Props {
    proof: any;
}
const SocialProofCard: React.FC<Props> = ({
    proof,
}) => {
    return (
        <>
            <Grid item xs={4} sm={2}>
                <Card
                    variant="outlined"
                    sx={{
                        userSelect: "none",
                        position: "relative",
                        overflow: "visible",
                        cursor: "pointer",
                        textAlign:"center"
                    }}
                >
                    <CardActionArea>
                        <CardContent>
                            <Typography
                                variant="h4"
                                component="div"
                                fontWeight={900}
                            >
                                {proof.number}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {proof.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    );
};

export default SocialProofCard;
