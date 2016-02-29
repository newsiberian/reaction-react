export const styles = {
  wrapper: {
    display: "flex",
    height: "100%"
  },
  container: {
    flex: "1 1 auto",
    height: "100%"
  },
  main: {
    minHeight: "80vh", // todo: разобраться с этим стилем
    // height: "100%", // todo возможно без этого боковая панель не будет растягиваться
    // position: 'relative', // todo зачем здесь это?
    marginBottom: 0, // костыль для ui grid
    marginTop: 0
  },
  nav: {
    flex: "0 0 auto",
    minWidth: 70,
    width: 70
  }
};
