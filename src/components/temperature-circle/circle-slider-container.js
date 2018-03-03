import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import CircleSlider from './circle-slider';
import {Button, Text, Icon, Container} from 'native-base';

const stylesCircle = StyleSheet.create({
  containerInner: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EE4E3C'
  },
  button: {
    backgroundColor: '#F16E60'
  },
  text: {
    paddingRight: 20
  }
});

export default class CircleSliderContainer extends Component {
  render() {
    return (
      <Container style={stylesCircle.container}>
        <Button
          block
          style={stylesCircle.button}
          iconLeft
          onPress={() => this.props.showChart()}>
          <Text style={stylesCircle.text}>Chart</Text>
          <Icon name='arrow-forward'/>
        </Button>
        <CircleSlider value={90}/>
        <Container style={stylesCircle.containerInner}>
          <Button block style={stylesCircle.button} iconLeft>
            <Text>Set temperature</Text>
          </Button>
        </Container>
        <Button
          block
          style={stylesCircle.button}
          iconLeft
          onPress={() => this.props.goBack()}>
          <Icon name='arrow-back'/>
          <Text>Back</Text>
        </Button>
      </Container>
    )
  }
}