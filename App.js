import './global';
import {
  Font,
  AppLoading
} from 'expo';
import React from 'react';
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  ScrollableTab,
  Body,
  Title
} from 'native-base';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {
  Button,
  Icon,
} from 'native-base';
import AppMain from './src/components/app/app-main';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }

  async componentWillMount() {
      await Font.loadAsync({
        'Roboto_medium': require('./src/assets/fonts/Roboto_medium.ttf'),
      });
    this.setState({fontLoaded: true});
  }

  render() {
    if (this.state.fontLoaded === true){
      return ( 
       <AppMain/>
      )
    }else {
        return(
          <Container>
            <Image source={require('./src/assets/img/logo.png')} style={{ marginLeft: '12.5%', marginTop: '25%', marginRight: '12.5%'}}/>
          </Container>
        )
    }
  }
}