import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import look, { StyleSheet } from "react-look";
import Subheader from "material-ui/Subheader";
import TextField from "material-ui/TextField";

const styles = {
  row: {
    margin: 0,
    padding: "0.5rem"
  },
  customerNote: {
    padding: "1rem",
    borderRight: "1px solid rgb(224, 224, 224)"
  },
  adminNote: {
    padding: "1rem"
  },
  noteHeader: {
    fontSize: 16,
    paddingLeft: 0,
    lineHeight: "2rem"
  }
};

const adminNoteStyles = StyleSheet.create({
  onChange: {
    backgroundColor: props => {
      if (props.note.isChanged) {
        // fires effect rollback
        setTimeout(() => {
          props.ordersActions.rollbackOrderState();
        }, 400);
        return "#e2f2e2";
      }
      return "#fff";
    }
  }
});

class OrderNotes extends Component {
  handleBlur(event) {
    const content = event.target.value;
    if (content !== "") {
      this.props.ordersActions.updateOrderNote(content);
    }
  }

  // this needed to prevent opening Order Details menu while we click on admin
  // note field
  handleClick(event) {
    event.stopPropagation();
  }

  render() {
    const { order, t } = this.props;
    // findIndex returns -1 of nothing was found, we are using this
    const customerNoteIndex = order.notes && order.notes.length ?
      order.notes.findIndex(note => note.userId === order.userId) : -1;
    const adminNoteIndex = order.notes && order.notes.length ?
      order.notes.findIndex(note => note.userId !== order.userId) : -1;
    const adminNoteContent = adminNoteIndex !== -1 ? order.notes[adminNoteIndex].content : "";

    return (
      <div className="row" style={{ margin: 0 }}>
        {customerNoteIndex !== -1 &&
          <div className="col-xs" style={styles.customerNote}>
            <Subheader style={styles.noteHeader}>{t("orders.customerNotes")}</Subheader>
            <p>{order.notes[customerNoteIndex].content}</p>
          </div>
        }
        <div className="col-xs" style={styles.adminNote}>
          <Subheader style={styles.noteHeader}>{t("orders.managerNotes")}</Subheader>
          <div className={adminNoteStyles.onChange}>
            <TextField
              hintText={t("orders.noteToOrderPlaceholder")}
              floatingLabelText={t("orders.noteToOrder")}
              multiLine={true}
              fullWidth={true}
              defaultValue={adminNoteContent}
              // name="note"
              onBlur={event => this.handleBlur(event)}
              onTouchTap={event => this.handleClick(event)}
              rows={3}
              rowsMax={5}
            />
          </div>
        </div>
      </div>
    );
  }
}

OrderNotes.propTypes = {
  note: PropTypes.shape({
    isChanged: PropTypes.bool
  }),
  order: PropTypes.object.isRequired,
  ordersActions: PropTypes.shape({
    updateOrderNote: PropTypes.func,
    rollbackOrderState: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate("reaction-react")(look(OrderNotes));
