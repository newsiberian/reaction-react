export const linkStyles = {
  display: 'flex',
  height: 225,
  width: 235, // todo move this to card
  boxShadow: '0px 1px 3px 0px #d4d4d5, 0px 0px 0px 1px #d4d4d5',
  WebkitTransition: 'box-shadow 0.1s ease, -webkit-transform 0.1s ease',
  transition: 'box-shadow 0.1s ease, transform 0.1s ease'
};

export const fakeImage = {
  display: 'block',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center center'
};

export const primatyImage = {
  width: 'auto',
  height: '100%',
  minWidth: '80%',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto'
};

export const realImage = {
  height: 225,
  width: '100%',
  objectFit: 'cover'
};