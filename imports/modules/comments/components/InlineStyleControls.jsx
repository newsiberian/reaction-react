import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
import FlatButton from "material-ui/lib/flat-button";

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const styles = { color: "#5890ff" };
  return (
    <div>
      {INLINE_STYLES.map(type =>
        <FlatButton
          key={type.label}
          //active={currentStyle.has(type.style)}
          label={type.label}
          onClick={() => props.onClick(type.style)}
          style={currentStyle.has(type.style) && styles}
        />
      )}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(InlineStyleControls);
