import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';
import {Drawer} from 'native-base';
import Sidebar from '../sidebar/sidebar';
import AppHeader from './app-header';

export default class AppMain extends Component {
  closeDrawer = () => {
    this
      .drawer
      ._root
      .close()
  };
  openDrawer = () => {
    this
      .drawer
      ._root
      .open()
  };
  render() {
    return (
      <Drawer
        ref={(ref) => {
        this.drawer = ref;
      }}
        content={< Sidebar />}
        onClose={() => this.closeDrawer()}>
        <AppHeader openDrawer={this
          .openDrawer
          .bind(this)}/>
      </Drawer>
    );
  }
}
