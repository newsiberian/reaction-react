import  React, { Component, PropTypes } from "react";
// import ReactMixin from 'react-mixin'
// import ReactMixin from '/myPackages/react-mixin'
// import { ReactMeteorData } from '{react-meteor-data}!exports'
// import { DropdownList } from '{universe:react-widgets}'
// import {  } from '../../../helpers/utilities'

//@ReactMixin.decorate(ReactMeteorData)
// export default class I18nChooser extends React.Component {
export default React.createClass({
  displayName: 'I18nChooser',
  // mixins: [ReactMeteorData],
  propTypes: {
    languages: React.PropTypes.array
  },
  /*getMeteorData() {
    let languages = [];
    /!*let handle = Meteor.subscribe('Shops');
    if (handle.ready()) {
      let products = ReactionCore.Collections.Shops.findOne();
      if (products !== null ? products.languages : void 0) {
        for (let language of products.languages) {
          if (language.enabled === true) {
            language.translation = `languages.${ language.label.toLowerCase() }`;
            languages.push(language);
          }
        }
        return { languages };
      }
    }*!/
  },*/

  componentWillMount() {
    // require('./../styles/header.import.css');
  },

  componentDidMount() {
    // $('')
  },

  render() {
    //debugger;
    // const languages = this.data.languages;
    const languages = this.props.languages;
    // <DropdownList data={['orange', 'red', 'blue', 'purple']} />

    // todo временно отключил из-за нового реакта
    /*<DropdownList
     valueField="i18n"
     textField="label"
     data={ languages }
     defaultValue="en"
     />*/
    return (
      <div></div>
    );
    /*return (
      <div className="ui dropdown item">
        <i className="world icon"></i>
        <span className="text"></span>
        <ul className="menu" role="menu">
          <li
            className="header"
            role="presentation"
            data-i18n="languages.select"
            >
            Select Language
          </li>
          { languages.map((language) => {
            return (
              <li key={ language.i18n } className="item">
                <a role="menuitem" data-i18n={ language.translation }>
                  { language.label }
                </a>
              </li>
            );
          }) }
        </ul>
      </div>
    );*/
  }
});