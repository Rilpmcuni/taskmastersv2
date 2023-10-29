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
                // mask='$num'
                // radix="."
                // inputRef={ref}
                // onAccept={(value: any) =>
                //     onChange({ target: { name: props.name, value } })
                // }
                // overwrite
                mask={Number}
                radix="."
                thousandsSeparator="."
                // value="123"
                unmask={true} // true|false|'typed'
                ref={ref}
                // inputRef={inputRef} // access to nested input
                // DO NOT USE onChange TO HANDLE CHANGES!
                // USE onAccept INSTEAD
                onAccept={(value: any) =>
                    onChange({ target: { name: props.name, value } })
                }
                // ...and more mask props in a guide

                // input props also available
                placeholder=" Valor"
            />
        );
    }
);

export default function TextFieldPrice({
    value,
    onChange,
}: {
    value: any;
    onChange: any;
}) {
    return (
        <>
            <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                <InputLabel htmlFor="valor-text-input">Valor</InputLabel>
                <OutlinedInput
                    startAdornment={<span>$</span>}
                    // placeholder="Valor"
                    size="small"
                    label="Valor"
                    value={value}
                    onChange={onChange}
                    name="textmask"
                    id="valor-text-input"
                    inputComponent={TextMaskCustom as any}
                />
            </FormControl>
        </>
    );
}
