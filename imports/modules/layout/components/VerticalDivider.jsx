import React, { PropTypes } from "react";
import look, { StyleSheet } from "react-look";

const styles = StyleSheet.create({
  divider: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: "50%",
    margin: 0,
    padding: 0,
    // height: "50%",
    height: "calc(50% - 1rem)",
    lineHeight: 0,
    textAlign: "center",
    transform: "translateX(-50%)",
    // divider
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: ".05em",
    color: "rgba(0,0,0,.85)",
    userSelect: "none",
    fontSize: "1rem",
    "@media (max-width: 52em)": { // this is from flexboxgrid.css .col-sm
      display: "table",
      height: "auto",
      left: 0,
      lineHeight: 1,
      overflow: "hidden",
      position: "static",
      textAlign: "center",
      top: 0,
      transform: "none",
      whiteSpace: "nowrap"
    }
    // ":before": {
    //   position: "absolute",
    //   left: "50%",
    //   top: "-100%",
    //   content: "",
    //   zIndex: 3,
    //   borderLeft: "1px solid rgba(34,36,38,.15)",
    //   borderRight: "1px solid rgba(255,255,255,.1)",
    //   width: 0,
    //   height: "calc(100% - 1rem)"
    // },
    // ":after": {
    //   position: "absolute",
    //   left: "50%",
    //   top: "auto",
    //   bottom: "0",
    //   content: "",
    //   zIndex: 3,
    //   borderLeft: "1px solid rgba(34,36,38,.15)",
    //   borderRight: "1px solid rgba(255,255,255,.1)",
    //   width: 0,
    //   height: "calc(100% - 1rem)"
    // }
  },
  "before": {
    position: "absolute",
    left: "50%",
    top: "-100%",
    // content: "",
    zIndex: 3,
    borderLeft: "1px solid rgba(34,36,38,.15)",
    borderRight: "1px solid rgba(255,255,255,.1)",
    width: 0,
    height: "calc(100% - 1rem)",
    "@media (max-width: 52em)": {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 2em top 50%",
      backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC")',
      borderLeft: "medium none",
      borderRight: "medium none",
      content: "",
      display: "table-cell",
      left: "1em",
      position: "relative",
      top: "50%",
      width: "50%"
    }
  },
  "after": {
    position: "absolute",
    left: "50%",
    top: "auto",
    bottom: "0",
    // content: "",
    zIndex: 3,
    borderLeft: "1px solid rgba(34,36,38,.15)",
    borderRight: "1px solid rgba(255,255,255,.1)",
    width: 0,
    height: "calc(100% - 1rem)",
    "@media (max-width: 52em)": {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left 2em top 50%",
      backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC")',
      borderLeft: "medium none",
      borderRight: "medium none",
      content: "",
      display: "table-cell",
      left: "-1em",
      position: "relative",
      top: "50%",
      width: "50%"
    }
  }
});

const VerticalDivider = props => {
  return (
    <div className={styles.divider}>
      <span className={styles.before} />
      {props.label}
      <span className={styles.after} />
    </div>
  );
};

VerticalDivider.propTypes = {
  label: PropTypes.node
};

export default look(VerticalDivider);
