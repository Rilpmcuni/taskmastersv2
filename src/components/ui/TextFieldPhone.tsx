import * as React from "react";
import { IMaskInput } from "react-imask";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { InputAdornment } from "@mui/material";

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
                mask="0 0000 0000"
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

export default function TextFieldPhone({
    value,
    onChange,
}: {
    value: any;
    onChange: any;
}) {
    return (
        <>
            <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                <InputLabel htmlFor="formatted-text-mask-input">Número celular</InputLabel>
                <OutlinedInput
                    // placeholder="Número celular"
                    label="Número celular"
                    value={value}
                    onChange={onChange}
                    name="textmask"
                    id="formatted-text-mask-input"
                    inputComponent={TextMaskCustom as any}
                    startAdornment={
                        <InputAdornment position="start">+56</InputAdornment>
                    }
                />
            </FormControl>
        </>
    );
}
