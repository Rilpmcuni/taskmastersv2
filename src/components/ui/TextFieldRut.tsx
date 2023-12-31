import * as React from "react";
import { IMaskInput } from "react-imask";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00.000.000-0"
                radix="."
                inputRef={ref}
                onAccept={(value: any) =>
                    onChange({ target: { name: props.name, value } })
                }
                overwrite
            />
        );
    }
);

export default function TextFieldRut({
    value,
    onChange,
    disabled = false,
}: {
    value: any;
    onChange: any;
    disabled?: boolean;
}) {
    return (
        <>
            <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                <InputLabel htmlFor="rut-text-input">RUT</InputLabel>
                <OutlinedInput
                    // placeholder="RUT"
                    label="RUT"
                    value={value}
                    onChange={onChange}
                    name="textmask"
                    id="rut-text-input"
                    inputComponent={TextMaskCustom as any}
                    disabled={disabled}
                />
                <FormHelperText>Necesario para verificar tu identidad</FormHelperText>
            </FormControl>
        </>
    );
}
