export const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    fontFamily: '"Open Sans", "Roboto", "Helvetica Neue", Helvetica, sans-serif'
  },
  container: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    height: "100vh"
  },
  main: {
    // display: "flex",
    overflow: "auto",
    minHeight: "80vh", // todo: разобраться с этим стилем
    height: "100%", // todo возможно без этого боковая панель не будет растягиваться
    // position: 'relative', // todo зачем здесь это?
    marginBottom: 0, // костыль для ui grid
    marginTop: 0
  },
  nav: {
    flex: "0 0 auto",
    minWidth: 70,
    width: 70
  },
  navButton: {
    display: "flex",
    justifyContent: "center"
  }
};
