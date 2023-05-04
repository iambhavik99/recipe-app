import { Button, IconButton } from "@mui/material"

export const AppButton = (props) => {
    return (
        <Button
            style={props.style}
            type={props.type || 'button'}
            className={props.className}
            variant={props.variant}
            onClick={props.onClick}
            startIcon={props.startIcon}>
            {props.text}
        </Button>
    );
}

export const AppButtonRounded = (props) => {
    return (
        <Button
            style={{ borderRadius: 24, ...props.style }}
            type={props.type || 'button'}
            className={props.className}
            variant={props.variant}
            onClick={props.onClick}>
            {props.text}
        </Button>
    );
}

export const AppIconButton = (props) => {
    return (
        <IconButton
            component="label"
            className={props.className}
            onClick={props.onClick}>
            {props.icon}
        </IconButton>
    )
}

