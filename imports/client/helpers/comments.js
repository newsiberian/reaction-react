import { Comments } from "meteor/sunlark:reaction-comments-core";
import { StyleSheet } from "react-look";

/**
 * Comments helpers
 */

const styles = StyleSheet.create({
  blockquote: {
    borderLeft: "5px solid #eee",
    color: "#666",
    fontFamily: "'Hoefler Text', 'Georgia', serif",
    fontStyle: "italic",
    margin: "16px 0",
    padding: "10px 20px"
  },
  alignLeft: {
    textAlign: "left"
  },
  alignCenter: {
    textAlign: "center"
  },
  alignRight: {
    textAlign: "right"
  },
  alignJustify: {
    textAlign: "justify"
  }
});

export const getTopComments = sourceId => {
  return Comments.find({
    sourceId: sourceId,
    ancestors: []
  }).fetch();
};

export const getChildComments = parentId => {
  return Comments.find({
    ancestors: [parentId]
  }).fetch();
};

export const getBlockStyle = block => {
  switch (block.getType()) {
  case "blockquote":
    return styles.blockquote;
  case "alignleft":
    return styles.alignLeft;
  case "aligncenter":
    return styles.alignCenter;
  case "alignright":
    return styles.alignRight;
  case "alignjustify":
    return styles.alignJustify;
  default:
    return null;
  }
};
