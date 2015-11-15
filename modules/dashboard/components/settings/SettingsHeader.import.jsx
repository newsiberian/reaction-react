/**
 * @classdesc SettingsHeader
 */

export default class SettingsHeader extends React.Component {
  render() {
    return (
      <header>
        <div className="ui secondary  menu">
          <div className="header item">
            Header
          </div>
          <div className="right menu">
            <a className="item" href="#"><i className="remove icon"></i></a>
          </div>
        </div>
      </header>
    );
  }
}

SettingsHeader.propTypes = {};
