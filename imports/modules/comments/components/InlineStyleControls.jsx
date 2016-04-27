import React, { PropTypes } from "react";
import { translate } from "react-i18next";
import FlatButton from "material-ui/FlatButton";
import EditorFormatBold from "material-ui/svg-icons/editor/format-bold";
import EditorFormatItalic from "material-ui/svg-icons/editor/format-italic";
import EditorFormatUnderlined from "material-ui/svg-icons/editor/format-underlined";
import ActionCode from "material-ui/svg-icons/action/code";

const INLINE_STYLES = [
  { label: "bold", style: "BOLD", icon: EditorFormatBold },
  { label: "italic", style: "ITALIC", icon: EditorFormatItalic },
  { label: "underline", style: "UNDERLINE", icon: EditorFormatUnderlined },
  { label: "monospace", style: "CODE", icon: ActionCode }
];

const styles = { color: "#5890ff" };

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div>
      {INLINE_STYLES.map(type =>
        <FlatButton
          key={type.label}
          title={props.t(`comments.editor.${type.label}`)}
          icon={<type.icon />}
          onClick={() => props.onClick(type.style)}
          style={currentStyle.has(type.style) ? styles : {}}
        />
      )}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.object,
  onClick: PropTypes.func,
  t: PropTypes.func
};

export default translate("reaction-react")(InlineStyleControls);
