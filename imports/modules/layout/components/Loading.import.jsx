export default class Loading extends React.Component {
  render() {
    // todo i18n needed
    return (
      <div className="ui active inverted dimmer">
        <div className="ui large text loader">Loading</div>
      </div>
    );
  }
}