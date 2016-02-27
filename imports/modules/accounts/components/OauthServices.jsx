import React, { Component, PropTypes } from "react";
import RaisedButton from "material-ui/lib/raised-button";
import FontIcon from "material-ui/lib/font-icon";
import Colors from "material-ui/lib/styles/colors";
import { ReactionServiceHelper } from "../../../client/helpers/utilities";
import styles from "../styles/signStyles";

const getServices = () => {
  const enabledServices = [];
  const serviceHelper = new ReactionServiceHelper();
  const services = serviceHelper.services();
  services.forEach(service => {
    if (service.enabled) {
      enabledServices.push(service);
    }
  });

  return enabledServices;
};

const getServiceStyles = name => {
  switch (name) {
  case "google":
    return {
      root: {
        background: "#4285f4"
      },
      label: {
        color: "#ffffff"
      }
    };
  case "ok":
    return {
      root: {
        background: "#f4731c"
      }
    };
  case "vk":
    return {
      root: {
        background: "#45668e"
      }
    };
  default:
    return {};
  }
};

/**
 * @class OauthServices
 * @classdesc
 */
class OauthServices extends Component {
  handleClick(name) {
    const { loginWithService, prevPath } = this.props;
    // fire action creator
    loginWithService(name, prevPath);
  }

  render() {
    return (
      <div style={styles.services}>
        <div>
          {"Login with Social"}
        </div>
        {getServices().map((service) => {
          const name = service.name;
          const serviceStyle = getServiceStyles(name);
          return (
            <RaisedButton
              backgroundColor={serviceStyle.root.background}
              key={service._id}
              icon={
                  <FontIcon
                    className={`fa fa-${name === "ok" ? "odnoklassniki" : name}`}
                    color={Colors.white}
                    style={{color: "#ffffff"}}
                  />
                  // title={t()}
                }
              onClick={() => this.handleClick(name)}
              style={styles.button}
            />
          );
        })}
      </div>
    );
  }
}

OauthServices.propTypes = {
  loginWithService: PropTypes.func.isRequired,
  prevPath: PropTypes.string.isRequired,
  styles: PropTypes.object
};

export default OauthServices;
