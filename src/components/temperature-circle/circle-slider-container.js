import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import CircleSlider from './circle-slider';
import {Button, Text, Icon, Container} from 'native-base';
import events from 'events';
const Influx = require('influxdb-nodejs');

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
  constructor(props) {
    super(props)
    this.writeTempToDb = this
        .writeTempToDb
        .bind(this);
    this.setValue = this
        .setValue
        .bind(this);
    this.state = {
        tempState: this.props.setTemp,
        lightState: this.props.setLight,
        blindState: this.props.setBlind,
        tempToSet: 0
    }
  }

  setValue(temp){
    this.state.tempToSet = temp;
  }

  writeTempToDb(){
    events.EventEmitter.defaultMaxListeners = 0;
    const client = new Influx('http://18.221.12.219:8086/UserWish');
    let tempLight, tempBlind;

    if(this.state.lightState == true){
      tempLight = 1 ;
    }else{
      tempLight = 0
    }

    if(this.state.blindState == true){
      tempBlind = 1 ;
    }else{
      tempBlind = 0
    }

    client.write(this.props.room)
          .field({
            Temperature: parseFloat(this.state.tempToSet),
            Light: tempLight,
            Blinds: tempBlind
          })
          .then(() => console.log('Write point success'))
          
  }
  render() {
    return (
      <Container style={stylesCircle.container}>
        <Button
          block
          style={stylesCircle.button}
          iconLeft
          onPress={() => this.props.showChart()}>
          <Text style={stylesCircle.text}>Graf</Text>
          <Icon name='arrow-forward'/>
        </Button>
        <CircleSlider value={Number(this.state.tempState)*10} setValue={this
          .setValue
          .bind(this)}/>
        <Container style={stylesCircle.containerInner}>
          <Button block style={stylesCircle.button} iconLeft onPress={this.writeTempToDb}>
            <Text>Nastav teplotu</Text>
          </Button>
        </Container>
        <Button
          block
          style={stylesCircle.button}
          iconLeft
          onPress={() => this.props.goBack()}>
          <Icon name='arrow-back'/>
          <Text>Naspäť</Text>
        </Button>
      </Container>
    )
  }
}