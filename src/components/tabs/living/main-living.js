import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Left,
    Right,
    Icon
} from 'native-base';
import StockLineChartBasic from '../../char/char';
import CircleSliderContainer from '../../temperature-circle/circle-slider-container';
import events from 'events';
const Influx = require('influxdb-nodejs');

export default class LivingCard extends Component {
    constructor(props) {
        super(props)
        this.openCircle = this
            .openCircle
            .bind(this);
        this.state = {
            showCircle: false,
            showChart: false,
            setTemeprature: 0,
            currentTemeprature: 0,
            currentHumidity: 0
        }
    }

    openCircle = () => {
        this.setState({showCircle: true});
    };

    goBack = () => {
        this.setState({showCircle: false});
    };

    showChart = () => {
        this.setState({showChart: true});
    };

    componentDidMount() {
        this.timer = setInterval(()=> this.getValuesFromHome(), 5000);
        /*
        const client2 = new Influx('http://18.221.12.219:8086/Home');
        client2.write('LivingRoom')
        .field({
          Temperature: 12,
          Humidity: 37,
        })
        .then(() => console.log('write point success'))
        */
      }

    getValuesFromHome() {
        events.EventEmitter.defaultMaxListeners = 0;

        const client = new Influx('http://18.221.12.219:8086/Home');
        let lastValue;
        let valuesArray;
        
        const reader = client.query('LivingRoom');
        
        reader.addField('Temperature','Humidity');
        reader.then(data => {
        lastValue = data.results[0].series[0].values.length,
        valuesArray = data.results[0].series[0].values[lastValue-1],

        console.log("humudity " + valuesArray[1]),
        this.setState({currentHumidity : valuesArray[1]}),

        console.log("temperature " + valuesArray[2]),
        this.setState({currentTemeprature : valuesArray[2]})
        });
      }


    render() {
        if (this.state.showCircle === false) {
            return (
                <Container>
                    <Card>
                        <CardItem style={stylesCardOne.cardItem} button onPress={this.openCircle}>
                            <Left>
                                <Text style={stylesMain.textSet}>Set temperature {this.state.setTemeprature} °C </Text>
                            </Left>
                            <Body>
                                <Text style={stylesMain.textCurrent}>Current temperature {this.state.currentTemeprature} °C</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-thermometer" style={stylesMain.icon}/>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={stylesCardTwo.cardItem}>
                            <Left>
                                <Icon Icon name="md-close-circle" style={stylesMain.icon}/>
                            </Left>
                            <Body>
                                <Text style={stylesMain.textCurrentHum}>Current humidity {this.state.currentHumidity} %</Text>
                            </Body>
                            <Right>
                                <Icon name="md-umbrella" style={stylesMain.icon}/>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={stylesCardThree.cardItem}>
                            <Left>
                                <Icon Icon name="md-bulb" style={stylesMain.icon}/>
                            </Left>
                            <Body>
                                <Text style={stylesMain.textCurrentOtherFromUser}>Light on</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-bulb-outline" style={stylesMain.icon}/>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={stylesCardFour.cardItem}>
                            <Left>
                                <Icon Icon name="logo-windows" style={stylesMain.icon}/>
                            </Left>
                            <Body>
                                <Text style={stylesMain.textCurrentOtherFromUser}>Louver on</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-map" style={stylesMain.iconRotate}/>
                            </Right>
                        </CardItem>
                    </Card>
                </Container>
            )
        } else if (this.state.showCircle === true) {
            if (this.state.showChart === true) {
                return (<StockLineChartBasic/>)
            } else {
                return (<CircleSliderContainer
                    goBack={this
                    .goBack
                    .bind(this)}
                    showChart={this
                    .showChart
                    .bind(this)}/>)
            }
        }
    }
}

const stylesMain = StyleSheet.create({
    textSet: {
        color: '#000000',
        paddingLeft: 15,
        fontWeight: 'bold'
    },
    cardItem: {
        height: 100,
        backgroundColor: '#EE4E3C'
    },
    textCurrent: {
        color: '#ffffff',
        paddingLeft: 25,
        paddingTop: 8.5,
        fontWeight: 'bold'
    },
    textCurrentHum: {
        color: '#ffffff',
        paddingLeft: 20,
        paddingTop: 8.5,
        fontWeight: 'bold'
    },
    textCurrentOtherFromUser: {
        color: '#000000',
        paddingLeft: 20,
        fontSize: 32,
        fontWeight: 'bold'
    },
    icon: {
        fontSize: 90,
        color: '#ffffff'
    },
    iconRotate: {
        fontSize: 90,
        color: '#ffffff',
        transform: [{ rotate: '90deg'}]
    }
});

const stylesCardOne = StyleSheet.create({
    cardItem: {
        height: 100,
        backgroundColor: '#EE4E3C'
    }
});

const stylesCardTwo = StyleSheet.create({
    cardItem: {
        height: 100,
        backgroundColor: '#4B8DF1'
    }
});

const stylesCardThree = StyleSheet.create({
    cardItem: {
        height: 100,
        backgroundColor: '#F99D22'
    }
});

const stylesCardFour = StyleSheet.create({
    cardItem: {
        height: 100,
        backgroundColor: '#86C451'
    }
});
