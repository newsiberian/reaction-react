const { Component, PropTypes, cloneElement } = React;

/**
 * @class Accounts
 */
export default class Accounts extends Component {
  render() {
    const children = cloneElement(this.props.children, {
      registerLink: '/register',
      resetLink: '/reset_password',
      loginLink: '/login'
    });

    return (
      <div className="ui container" style={ style }>
        { children }
      </div>
    );
  }
}

Accounts.propTypes = {
  children: PropTypes.node.isRequired
};

const style = {
  marginTop: '2rem',
  marginBottom: '2rem'
};
