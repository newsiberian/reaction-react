import { Component, PropTypes } from "react";
// import { _i18n } from "meteor/universe:i18n";
import { translate } from "react-i18next/lib";
import { Card, CardTitle, CardText, CardActions } from "material-ui/lib/card";
import FlatButton from "material-ui/lib/flat-button";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
// todo uncomment after 1.3 release
//import MRF from "meteor/nicolaslopezj:mrf";
import GuestCheckoutForm from "./GuestCheckoutForm.jsx";
import GeneralForm from "./GenaralForm.jsx";


const styles = {
  base: {},
  cardText: {
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 18 // title size
  }
};

/**
 * @class Settings
 * @classdesc
 */
class Settings extends Component {
  getPackageData() {
    return ReactionCore.Collections.Packages.findOne({
      name: "core"
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        { /* General */ }
        <Card initiallyExpanded={true}>
          <CardTitle
            title={t("shopSettings.general")}
            //title={_i18n.__("reaction.core.shopSettings.general")}
            //subtitle="Subtitle"
            actAsExpander={true}
            showExpandableButton={true}
            titleStyle={styles.title}
          />
          <CardText expandable={true} style={styles.cardText}>
            <GuestCheckoutForm />
            <GeneralForm />
            {/*<MRF.Form
              collection={ReactionCore.Collections.Packages}
              type="update"
              ref="form"
              doc={this.getPackageData()}
            />*/}
          </CardText>
        </Card>
        { /* Address */ }
        <Card>
          <CardTitle
            title={t("shopSettings.address")}
            //title={_i18n.__("reaction.core.shopSettings.address")}
            //subtitle="Subtitle"
            actAsExpander={true}
            showExpandableButton={true}
            titleStyle={styles.title}
          />
          <CardText expandable={true} style={styles.cardText}>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`}
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1"/>
            <FlatButton label="Action2"/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Settings.propTypes = {};

export default ActionBarWrapper(translate("core")(Settings));
