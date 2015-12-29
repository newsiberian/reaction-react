export const linkStyles = {
  display: "flex",
  height: 225,
  width: 235, // todo move this to card
  boxShadow: "0px 1px 3px 0px #d4d4d5, 0px 0px 0px 1px #d4d4d5",
  WebkitTransition: "box-shadow 0.1s ease, -webkit-transform 0.1s ease",
  transition: "box-shadow 0.1s ease, transform 0.1s ease"
};

export const fakeImage = {
  display: "block",
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center center"
};

export const primaryImage = {
  width: "auto",
  height: "100%",
  minWidth: "80%",
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: "auto"
};

export const realImage = {
  height: 225,
  width: "100%",
  objectFit: "cover"
};

export const titleStyles = {
  backgroundColor: "#fafafa",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  paddingTop: 5,
  paddingBottom: 5
};

export const removeButtonStyle = {
  position: "absolute",
  right: "2%",
  top: "2%",
  width: 46
};

export const removeButtonIconStyle = {
  marginTop: -2,
  marginLeft: -2
};
