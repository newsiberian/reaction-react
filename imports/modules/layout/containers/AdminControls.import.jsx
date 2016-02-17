/**
 * @classdesc AdminControls is part of coreAdminLayout Reaction template
 */

import SettingsHeader from '/modules/dashboard/components/settings/SettingsHeader';

export default class AdminControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SettingsHeader />
      </div>
    );
  }
}

AdminControls.propTypes = {};
