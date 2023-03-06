import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    // height: "100vh",
  },
  card: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "80%",
    margin: "10px",
    // [theme.breakpoints.down("sm")]: {
    //   width: "80%",
    // },
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(1),
  },
  input: {
    width: "100%",
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
