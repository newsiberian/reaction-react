const { Component, PropTypes } = React;
const { Link } = ReactRouter;

export default class HeaderBrand extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.siteName !== this.props.siteName;
  }
  render() {
    const { siteName } = this.props;

    console.log("HeaderBrand rendering...");
    return (
      <div className="header item">
        <Link to={ "/shop" }>{ siteName }</Link>
      </div>
    );
  }
}

HeaderBrand.propTypes = {
  siteName: PropTypes.string.isRequired
};
