import { StyleSheet } from "react-look";

export const styles = StyleSheet.create({
  card: {
    padding: "1rem",
    position: "relative"
  },
  fakeImage: {
    // borderTopLeftRadius: "0.28571429rem",
    display: "block",
    width: "100%",
    height: "100%",
    /*position: "absolute",
     left: 0,
     top: 0,
     right: 0,
     bottom: 0,*/
    backgroundSize: "cover",
    backgroundPosition: "center center"
  },
  primaryImage: {
    width: "auto",
    height: "100%",
    minWidth: "80%",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto"
  },
  additionalImages: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    width: "20%"
  },
  additionalImage: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto"
  },
  realImage: {
    height: 325,
    width: "100%",
    objectFit: "cover"
  },
  realAdditionalImage: {
    height: "calc(325px / 3)",
    width: "100%",
    objectFit: "cover",
    flex: "1 1 auto"
  },
  productMedium: {
    width: "calc(50% - 1.5em)"
  },
  productLarge: {
    width: "calc(100% - 1.5em)"
  },
  productSmall: {
    width: "calc(25% - 1.5em)"
  }
});

// this was moved to component
//export const linkStyles = {
//  display: "flex",
//  height: 325,
//  boxShadow: "0px 1px 3px 0px #d4d4d5, 0px 0px 0px 1px #d4d4d5",
//  transition: "box-shadow 0.1s ease, transform 0.1s ease"
//};

// export const fakeImage = {
//   // borderTopLeftRadius: "0.28571429rem",
//   display: "block",
//   width: "100%",
//   height: "100%",
//   /*position: "absolute",
//   left: 0,
//   top: 0,
//   right: 0,
//   bottom: 0,*/
//   backgroundSize: "cover",
//   backgroundPosition: "center center"
// };
//
// export const primaryImage = {
//   width: "auto",
//   height: "100%",
//   minWidth: "80%",
//   flexGrow: 1,
//   flexShrink: 1,
//   flexBasis: "auto"
// };
//
// export const additionalImages = {
//   display: "flex",
//   flexDirection: "column",
//   flexGrow: 0,
//   flexShrink: 0,
//   flexBasis: "auto",
//   width: "20%"
// };
//
// export const additionalImage = {
//   flexGrow: 1,
//   flexShrink: 1,
//   flexBasis: "auto"
// };
//
// export const realImage = {
//   // borderTopLeftRadius: "0.28571429rem",
//   height: 325,
//   width: "100%",
//   objectFit: "cover"
//
// };
//
// export const realAdditionalImage = {
//   height: "calc(325px / 3)",
//   width: "100%",
//   objectFit: "cover"
// };
//
// export const productMedium = {
//   width: "calc(50% - 1.5em)"
// };
//
// export const productLarge = {
//   width: "calc(100% - 1.5em)"
// };
//
// export const productSmall = {
//   width: "calc(25% - 1.5em)"
// };
