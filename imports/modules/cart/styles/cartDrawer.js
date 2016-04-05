import { StyleSheet } from "react-look";

export const styles = StyleSheet.create({
  container: {
    height: "10vh",
    width: "100vw",
    marginBottom: "3rem"
  },
  emptyCartHeader: {
    marginTop: "4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

export const cartButton = {
  width: "100%",
  margin: "0 1rem 2rem 0",
  fontSize: 17,
  fontWeight: 600,
  lineHeight: "40px",
  borderRadius: 0
};

export const openCartStyles = {
  marginTop: "1rem",
  marginBottom: "1rem"
};

export const cardStyles = {
  display: "flex",
  height: 225,
  width: 235,
  boxShadow: "0px 1px 3px 0px #d4d4d5, 0px 0px 0px 1px #d4d4d5",
  WebkitTransition: "box-shadow 0.1s ease, -webkit-transform 0.1s ease",
  transition: "box-shadow 0.1s ease, transform 0.1s ease"
};
