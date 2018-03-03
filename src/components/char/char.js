import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { StockLine } from 'react-native-pathjs-charts';

export default class StockLineChartBasic extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `StockLine - Basic`,
  });
  render() {
    let data = [
      [{
        "x": 0,
        "y": 30
      }, {
        "x": 1,
        "y": 25
      }, {
        "x": 2,
        "y": 25
      }, {
        "x": 3,
        "y": 39
      }, {
        "x": 4,
        "y": 40
      }, {
        "x": 5,
        "y": 40
      }, {
        "x": 6,
        "y": 20
      }, {
        "x": 7,
        "y": 28
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
        duration: 200
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
            <View style={stylesChar.container}>
                <Text style={stylesChar.textC}>°C</Text>
                <StockLine data={data} options={options} xKey='x' yKey='y' />
            </View>
                <Text style={stylesChar.textDay}>Day</Text>
      </Container>
    )
  }
}

const stylesChar = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop:50,
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
    marginBottom:50,
    marginLeft:50, 
    fontSize:25, 
    fontWeight: 'bold'
  }
});
