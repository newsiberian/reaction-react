import i18n from '{universe:i18n}';

export default class ProductNotFound extends React.Component {
  render() {
    const T = i18n.createComponent('reaction.core.app');
    // todo add styles here
    return (
      <div className="ui text container not-found">
        <h1 className="ui centered header">404</h1>
        <h2 className="ui centered header">
          <T>warning</T>
          &nbsp;
          <small><T>unauthorizedMessage</T></small>
        </h2>
      </div>
    );
  }
}