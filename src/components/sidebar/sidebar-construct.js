import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Title,
  Button
} from 'native-base';
import {StyleSheet} from 'react-native';
import SettingsMenu from './settings-menu';
import MainMenu from './main-menu';

export default class SidebarConstruct extends Component {
  constructor(props) {
    super(props)
    this.showOptions = this
      .showOptions
      .bind(this);
    this.state = {
      showOptions: false
    }
  }

  showOptions = () => {
    this.setState({showOptions: true});
  };

  hideOptions = () => {
    this.setState({showOptions: false});
  };

  render() {
    if (this.state.showOptions === false) {
      return (<MainMenu showOptions={this
        .showOptions
        .bind(this)}/>)
    } else if (this.state.showOptions === true) {
      return (<SettingsMenu hideOptions={this
        .hideOptions
        .bind(this)}/>)
    }
  }
}

const styleSidebarMenu = StyleSheet.create({
  header: {
    backgroundColor: '#2C353A'
  },
  iconSettings: {
    color: 'white'
  }
});