import { TextField } from "@mui/material"

export const AppInputField = (props) => {
    return (
        <div className="login-input-div">
            <TextField
                id={props.id}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                label={props.label}
                size={props.size}
                className={props.className}
                required
            />
        </div>
    )
}


export const AppInputFieldMultiline = (props) => {
    return (
        <div className="login-input-div" style={{ width: '100%' }}>
            <TextField
                id={props.id}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                label={props.label}
                size={props.size}
                className={props.className}
                required
                multiline
                style={props.style}
                maxRows={props.maxRows}
            />
        </div>
    )
}