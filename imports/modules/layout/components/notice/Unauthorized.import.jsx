import { LoginBox } from '{universe:accounts-ui}';

export default class Unauthorized extends React.Component {
  render() {
    // todo i18n needed here
    return (
      <section className="ui middle aligned center aligned grid" style={{ height: '100%' }}>
        <div className="row">
          <h1 className="ui huge center aligned header" style={{ marginTop: '1rem' }}>
            <span>Oops!&nbsp;</span>
            <span>You don't have permission to view this content.</span>
          </h1>
        </div>
        <div className="row" style={{ maxWidth: '50vw', marignTop: '2rem', marginBottom: '2rem' }}>
          <LoginBox
            registerLink={ FlowRouter.path('register') }
            resetLink={ FlowRouter.path('resetPassword') }
          />
        </div>
      </section>
    );
  }
}