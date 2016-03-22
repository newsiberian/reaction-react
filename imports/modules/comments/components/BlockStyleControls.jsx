import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
import FlatButton from "material-ui/lib/flat-button";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div>
      {BLOCK_TYPES.map(type =>
        <FlatButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onClick={() => props.onClick(type.style)}
          // style={type.style}
        />
      )}
    </div>
  );
};

BlockStyleControls.propTypes = {
  editorState: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(BlockStyleControls);
