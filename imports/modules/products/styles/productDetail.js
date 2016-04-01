import { StyleSheet } from "react-look";

export default {
  container: {
    paddingTop: "2rem",
    paddingBotton: "2rem",
    paddingLeft: "3rem",
    paddingRight: "3rem"
  },
  icon: {
    fontSize: "inherit"
  },
  infoMessage: {
    backgroundColor: "#f8ffff",
    color: "#276f86",
    boxShadow: "0 0 0 1px #a9d5de inset, 0 0 0 0 transparent",
    padding: "1em 1.5em",
    minHeight: "1em",
    lineHeight: "1.4285em",
    margin: "1rem 0",
    flex: "1 1 auto"
  },
  headerContainer: {
    flex: "1 1 auto"
  },
  header: {

  },
  titleHeader: {
    textAlign: "center"
  },
  pageTitleHeader: {
    color: "#1999dd",
    textAlign: "center",
    fontWeight: "400"
  }
};

export const editStyles = StyleSheet.create({
  input: {
    width: "100%",
    borderColor: "#fafafa",
    borderWidth: 1,
    borderStyle: "solid",
    transition: "background-color .1s ease-out"
  },
  title: {
    textAlign: "center",
    // fontSize: "3.5rem"
    fontSize: "5vmin"
  },
  pageTitle: {
    textAlign: "center",
    // fontSize: "2rem"
    fontSize: "4vmin",
    color: "inherit"
  },
  vendor: {
    display: "inline",
    marginTop: "1rem",
    marginBottom: "1rem",
    width: "auto"
  },
  description: {
    marginTop: "1rem",
    marginBottom: "2rem"
  },
  hover: {
    ":hover": {
      borderColor: "#cccccc",
      borderWidth: 1,
      borderStyle: "dotted"
    }
  }
});

export const addToCartStyle = StyleSheet.create({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "baseline",
  position: "relative"
});

export const numberPickerButtonsStyle = StyleSheet.create({
  // marginRight: "2rem",

  position: "absolute",
  top: 5,
  left: 10,
  // float: "left",
  fontSize: "1em"
});

export const numberPickerStyle = StyleSheet.create({
  width: "4rem",
  borderRadius: 0,
  // borderColor: "#ffffff",
  boxShadow: "inset 0 0px 6px 0px rgba(0,0,0,.3), inset 0 0 0 30px rgba(255,255,255,.3), 0 0px rgba(255,255,255,.08)",
  // boxShadow: "inset 0 2px 10px 1px rgba(0,0,0,.3), inset 0 0 0 60px rgba(0,0,0,.3), 0 1px rgba(255,255,255,.08)",
  backgroundColor: "aliceblue",
  fontSize: "1em",
  color: "rgba(0, 0, 0, 0.87)",
  paddingRight: 2,
  paddingLeft: 5,
  paddingTop: 5,
  paddingBottom: 5
});

export const priceStyle = StyleSheet.create({
  fontWeight: "bold",
  fontSize: "3.5rem"
});
