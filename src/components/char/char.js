import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Icon } from 'native-base';
import { StockLine } from 'react-native-pathjs-charts';
import events from 'events';
const Influx = require('influxdb-nodejs');

export default class StockLineChartBasic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        values: [],
        isReady: false
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `StockLine - Basic`,
  });

  getTempFromHome(){
    events.EventEmitter.defaultMaxListeners = 0;

    const client = new Influx('http://18.221.12.219:8086/Home');
    let lastValue;
    let valuesArray;
    const reader = client.query(this.props.room);
    
    reader.addField('Temperature');
    reader.then(data => {
    length = data.results[0].series[0].values.length;
    for(i = 1; i < 8; i++){
      valuesArray = data.results[0].series[0].values[length-i];
      this.state.values.push(parseFloat(valuesArray[1]));
      if (i == 7){
        this.setState({isReady : true})
      }
    }
    });
  }

  componentDidMount(){
    this.getTempFromHome();
  }

  render() {
    if(this.state.isReady == true){
    let data = [
      [{
        "x": 0,
        "y": this.state.values[6]
      }, {
        "x": 1,
        "y": this.state.values[5]
      }, {
        "x": 2,
        "y": this.state.values[4]
      }, {
        "x": 3,
        "y": this.state.values[3]
      }, {
        "x": 4,
        "y": this.state.values[2]
      }, {
        "x": 5,
        "y": this.state.values[1]
      }, {
        "x": 6,
        "y": this.state.values[0]
      }, {
        "x": 7,
        "y": 20
      }]
    ]
    let options = {
      width: 280,
      height: 280, 
      color: '#C60000',
      margin: {
        top: 10,
        left: 35,
        bottom: 30,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 10000
      },
      axisX: {
        showAxis: true,
        showLines: false,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 15,
          fontWeight: true,
          fill: '#000000'
        }
      },
      axisY: {
        showAxis: true,
        showLines: false,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 15,
          fontWeight: true,
          fill: '#000000'
        }
      }
    }

    return (
      <Container style={stylesChar.containerPrimary}>
              <Button
              block
              style={stylesChar.button}
              iconLeft
              onPress={() => this.props.goBack()}>
                <Icon name='arrow-back'/>
                <Text style={stylesChar.buttonText}>  Naspäť</Text>
            </Button>
                <Text style={stylesChar.textDay}>Priebeh teplôt za posledných</Text>
                <Text style={stylesChar.textDaySmall}>7 hodín</Text>
            <View style={stylesChar.container}>
                <Text style={stylesChar.textC}>°C</Text>
                <StockLine data={data} options={options} xKey='x' yKey='y' />
            </View>
      </Container>
    )
    
  } else if (this.state.isReady == false) {
    return (
    <Container style={stylesChar.containerPrimary}>
            <View style={stylesChar.container}>
                <Text style={stylesChar.textC}>Spracovávam...</Text>
            </View>
    </Container>
    )
  }
}
}

const stylesChar = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop:0,
  },
  buttonText:{
    fontSize: 20,
    color: 'white'
  },
  button: {
    backgroundColor: '#F16E60'
  },
  containerPrimary: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textC: {
    fontSize:20, 
    fontWeight: 'bold'
  },
  textDay: {
    marginTop: 10,
    marginBottom:2,
    marginLeft:50, 
    fontSize:25, 
    fontWeight: 'bold'
  },
  textDaySmall: {
    marginLeft:50, 
    fontSize:25, 
    fontWeight: 'bold'
  }
});
