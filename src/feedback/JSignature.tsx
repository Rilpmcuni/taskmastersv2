import { Button, Typography } from "@mui/material";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import React, { useState, useRef, useEffect, useCallback } from "react";
import SignatureCanvas from "react-signature-canvas";
//
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@/contexts/SessionContext";
import DialogPer from "./DialogPer";
import Image from "next/image";

const JSignature = ({
    sessionData,
    profile,
}: {
    sessionData: any;
    profile: any;
}) => {
    const { requestUpdate } = useSession();

    const [imageURL, setImageURL] = useState<string | null>(null);
    const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
    const sigCanvas = useRef<SignatureCanvas | null>(null);
    //
    const userId = sessionData?.user?.id;
    const [signature_url, setSignatureUrl] = useState<string | null>(null);
    const [signature, setSignature] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const supabase = createClientComponentClient();
    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(
                    `signature_url, signature` // Add "banco" and "tipoCuenta" here
                )
                .eq("id", userId)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setSignatureUrl(data.signature_url);
                setSignature(data.signature);
            }
        } catch (error) {
            console.log("error traer datos");
        } finally {
            setLoading(false);
        }
    }, [userId, supabase]);

    async function updateProfile({
        signature_url,
    }: {
        signature_url: string | null;
    }) {
        setIsSaving(true);
        const { error } = await supabase.from("profiles").upsert({
            id: userId,
            signature_url,
            updated_at: new Date().toISOString(),
        });
        requestUpdate();
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    }

    const clear = () => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
        }
        setImageURL(null);
        setIsCanvasEmpty(true);
    };
    const save = async () => {
        if (sigCanvas.current) {
            const isCanvasEmpty = sigCanvas.current.isEmpty();
            setIsCanvasEmpty(isCanvasEmpty);
            if (!isCanvasEmpty) {
                const image = sigCanvas.current
                    .getTrimmedCanvas()
                    .toDataURL("image/png");
                const blob = await fetch(image).then((res) => res.blob());
                const filePath = `${userId}/signature.png`;
                const { error: uploadError } = await supabase.storage
                    .from("signatures")
                    .upload(filePath, blob);
                if (uploadError) {
                    console.error(uploadError);
                    return;
                }
                setSignatureUrl(filePath);
                const { error } = await supabase.from("profiles").upsert({
                    id: userId,
                    signature: true,
                    updated_at: new Date().toISOString(),
                });

                if (error) {
                    console.error("Error updating signature:", error);
                } else {
                    requestUpdate();
                }
            }
        }
    };
    useEffect(() => {
        // if (signature_url) {
        const downloadImage = async () => {
            const { data, error } = await supabase.storage
                .from("signatures")
                .download(`${userId}/signature.png`);
            if (error) {
                console.error(error);
                return;
            }
            const url = URL.createObjectURL(data);
            setImageURL(url);
        };
        downloadImage();
        const getProfile = async () => {
            const { data, error, status } = await supabase
                .from("profiles")
                .select(
                    `signature` // Add "banco" and "tipoCuenta" here
                )
                .eq("id", userId)
                .single();
            if (data) {
                setSignature(data.signature);
            }
        };
        getProfile();
        // }
    }, [signature_url, supabase]);
    const handleEnd = () => {
        if (sigCanvas.current) {
            const isCanvasEmpty = sigCanvas.current.isEmpty();
            setIsCanvasEmpty(isCanvasEmpty);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
            }}
        >
            {signature ? (
                imageURL && (
                    <div
                        style={{
                            width: "100%",
                            marginTop: "1em",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Image
                            height={200}
                            width={300}
                            src={imageURL}
                            alt="my signature"
                            style={{
                                border: "1px solid",
                                padding: "3rem",
                                borderRadius: "1.5rem",
                            }}
                        />
                        <Typography variant="caption" fontWeight={"bold"}>
                            <i>
                                {profile.full_name}{" "}
                                {profile.lastName && `, ${profile.lastName}`}
                            </i>
                        </Typography>
                        <Typography variant="caption" fontWeight={"bold"}>
                            <i>{profile.rut}</i>
                        </Typography>
                    </div>
                )
            ) : (
                <>
                    <Typography variant="h5" fontWeight={"bold"}>
                        <i>Firmar</i>
                    </Typography>
                    <div
                        style={{
                            width: "100%",
                            marginTop: "1em",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <SignatureCanvas
                            ref={sigCanvas}
                            // canvasProps={{ className: "signatureCanvas" }}
                            canvasProps={{
                                width: 300,
                                height: 200,
                                style: {
                                    border: "1px solid",
                                    borderRadius: "1.5rem",
                                },
                            }}
                            onEnd={handleEnd}
                            penColor="blue"
                        />
                        <Typography variant="caption" fontWeight={"bold"}>
                            <i>
                                {profile.full_name}{" "}
                                {profile.lastName && `, ${profile.lastName}`}
                            </i>
                        </Typography>
                        <Typography variant="caption" fontWeight={"bold"}>
                            <i>{profile.rut}</i>
                        </Typography>
                    </div>
                    <Button
                        onClick={clear}
                        style={{
                            marginTop: "1em",
                            padding: "0.5em 1em",
                        }}
                        startIcon={<UndoRoundedIcon />}
                        color="error"
                        variant="outlined"
                        size="large"
                        disabled={isCanvasEmpty}
                        fullWidth
                    >
                        Reintentar Firma
                    </Button>
                    <DialogPer
                        title={"Firmar Acuerdo de usuario"}
                        description={
                            "El profesional manifiesta que ha leído y comprendido el presente contrato, y acepta todas las condiciones y obligaciones establecidas en el mismo."
                        }
                        onConfirm={() => {
                            // onClose && (onClose(), setActiveStep(0));
                            save();
                        }}
                        buttonProps={"¡Firmar!"}
                    >
                        <Button
                            style={{
                                marginTop: "1em",
                                padding: "0.5em 1em",
                                color: "white",
                            }}
                            startIcon={<AssignmentTurnedInOutlinedIcon />}
                            color="success"
                            variant="contained"
                            disabled={isCanvasEmpty}
                            fullWidth
                            size="large"
                        >
                            Firmar
                        </Button>
                    </DialogPer>
                </>
            )}
        </div>
    );
};

export default JSignature;
