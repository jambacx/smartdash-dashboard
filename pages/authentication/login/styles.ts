import { type Theme } from '@mui/material/styles';

export const backgroundStyles = (theme: Theme) => ({
    position: "relative",
    "&:before": {
        content: '""',
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        position: "absolute",
        height: "100%",
        width: "100%",
        opacity: "0.3",
        // backgroundColor: theme.palette.background.default,
    },
});

export const gridContainerStyles = {
    bgcolor: 'white',
    height: "100vh",
    maxWidth: "70%",
    margin: "0 auto",
};

export const cardStyles = {
    width: "100%",
    display: "flex",
    flexDirection: "row", bgcolor: 'white',

};

export const gridItemStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
};
