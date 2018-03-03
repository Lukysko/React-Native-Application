import React, {Component} from 'react';
import {Text, ImageBackground, StyleSheet} from 'react-native';
import {Content, Thumbnail, List, ListItem, Left} from 'native-base';
import SidebarConstruct from './sidebar-construct';

export default class Sidebar extends Component {
  render() {
    return (
      <Content style={stylesSidebar.contentMain}>
        <Content style={stylesSidebar.contentTop}>
          <ImageBackground source={require('../../assets/img/tab.png')} style={stylesSidebar.image}>
            <List style={stylesSidebar.list}>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={require('../../assets/img/foto.png')}/>
                </Left>
              </ListItem>
            </List>
            <Text style={stylesSidebar.textName}>
              Lukas Beno
            </Text>
            <Text style={stylesSidebar.textEmail}>
              lukys137@gmail.com
            </Text>
          </ImageBackground>
        </Content>
        <SidebarConstruct/>
      </Content>
    );
  }
}

const stylesSidebar = StyleSheet.create({
  textName: {
    backgroundColor: 'transparent',
    textAlign: 'left',
    fontSize: 25,
    paddingTop: 5,
    paddingLeft: 10,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  textEmail: {
    backgroundColor: 'transparent',
    textAlign: 'left',
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 10,
    color: '#FFFFFF'
  },
  image: {
    height: 250,
    width: 350
  },
  contentMain: {
    backgroundColor: '#FFFFFF'
  },
  contentTop: {
    height: 150,
    width: 350
  },
  list: {
    paddingTop: 10
  }
});
