import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
import FlatButton from "material-ui/lib/flat-button";
import EditorFormatQuote from "material-ui/lib/svg-icons/editor/format-quote";
import EditorFormatListBulleted from "material-ui/lib/svg-icons/editor/format-list-bulleted";
import EditorFormatListNumbered from "material-ui/lib/svg-icons/editor/format-list-numbered";
import EditorFormatAlignCenter from "material-ui/lib/svg-icons/editor/format-align-center";
import EditorFormatAlignJustify from "material-ui/lib/svg-icons/editor/format-align-justify";
import EditorFormatAlignLeft from "material-ui/lib/svg-icons/editor/format-align-left";
import EditorFormatAlignRight from "material-ui/lib/svg-icons/editor/format-align-right";
// import EditorTitle from "material-ui/lib/svg-icons/editor/title";

const BLOCK_TYPES = [
  { label: "h1", style: "header-one" },
  // { label: "h2", style: "header-two" },
  // { label: "h3", style: "header-three" },
  // { label: "H4", style: "header-four" },
  // { label: "H5", style: "header-five" },
  // { label: "H6", style: "header-six" },
  { label: "blockquote", style: "blockquote", icon: EditorFormatQuote },
  { label: "ul", style: "unordered-list-item", icon: EditorFormatListBulleted },
  { label: "ol", style: "ordered-list-item", icon: EditorFormatListNumbered },
  // { label: "Code Block", style: "code-block" }
  { label: "alignLeft", style: "alignleft", icon: EditorFormatAlignLeft },
  { label: "alignCenter", style: "aligncenter", icon: EditorFormatAlignCenter },
  { label: "alignRight", style: "alignright", icon: EditorFormatAlignRight },
  { label: "alignJustify", style: "alignjustify", icon: EditorFormatAlignJustify }
];

const styles = { color: "#5890ff" };

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
          label={props.t(`comments.editor.${type.label}`)}
          // TODO uncomment this when all icons will be known
          // title={props.t(`comments.editor.${type.label}`)}
          // icon={<type.icon />}
          onClick={() => props.onClick(type.style)}
          style={type.style === blockType ? styles : {}}
        />
      )}
    </div>
  );
};

BlockStyleControls.propTypes = {
  editorState: PropTypes.object,
  onClick: PropTypes.func,
  t: PropTypes.func
};

export default translate("reaction-react")(BlockStyleControls);
