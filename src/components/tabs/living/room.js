import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, RefreshControl} from 'react-native';
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

export default class Room extends Component {
    constructor(props) {
        super(props)
        this.openCircle = this
            .openCircle
            .bind(this);
        this.setLight = this
            .setLight
            .bind(this);
        this.setBlinds = this
            .setBlinds
            .bind(this);
        this.getValuesFromHome = this
            .getValuesFromHome
            .bind(this);
        this.callUptade = this
            .callUptade
            .bind(this);
        this.state = {
            showCircle: false,
            showChart: false,
            setTemeprature: 0,
            currentTemeprature: 0,
            currentHumidity: 0,
            setLigth: '',
            setBlinds: '',
            showLight: false,
            showBlind: false,
            isRefreshing: false
        }
    }

    openCircle = () => {
        this.setState({showCircle: true});
    };

    goBack = () => {
        this.setState({showCircle: false});
        this.setState({showChart: false});
        this.callUptade();
    };

    showChart = () => {
        this.setState({showChart: true});
    };

    componentDidMount() {
        this.callUptade();
    }

    callUptade = () => {
    this.getValueFromUser();
    this.getValuesFromHome();
    }

    getValuesFromHome = () => {
        events.EventEmitter.defaultMaxListeners = 0;

        const client = new Influx('http://18.221.12.219:8086/Home');
        let lastValue;
        let valuesArray;
        const reader = client.query(this.props.room);
        
        reader.addField('Temperature','Humidity');
        reader.then(data => {
        lastValue = data.results[0].series[0].values.length,
        valuesArray = data.results[0].series[0].values[lastValue-1],
        this.setState({currentHumidity : valuesArray[1]}),
        this.setState({currentTemeprature : valuesArray[2]})
        });
      }

      getValueFromUser(){
        events.EventEmitter.defaultMaxListeners = 0;

        const client = new Influx('http://18.221.12.219:8086/UserWish');
        let lastValue;
        let valuesArray;
        const reader = client.query(this.props.room);
        
        reader.addField('Temperature','Blinds','Light');
        reader.then(data => {
        lastValue = data.results[0].series[0].values.length,
        valuesArray = data.results[0].series[0].values[lastValue-1],
        this.setState({setTemeprature : valuesArray[3]})

        if(Number(valuesArray[1]) == 0){
            this.setState({setBlinds : "odtiahnuté"}),
            this.setState({showBlind : false})
        }else{
            this.setState({setBlinds : "zatiahnuté"}),
            this.setState({showBlind : true})
        }
        if(Number(valuesArray[2]) == 0){
            this.setState({setLigth : "vypnuté"})
            this.setState({showLight : false})
        }else{
            this.setState({setLigth : "zapnuté"})
            this.setState({showLight : true})
        }
        });
      }

      setLight(){
        const client = new Influx('http://18.221.12.219:8086/UserWish');
        let lightTemp;
        let lightValue;
        let blindsTemp;

        if(this.state.showLight == true) {
            lightTemp = false;
            lightValue = 0;
            this.setState({showLight : false});
            this.setState({setLigth : "vypnuté"});
        }else if(this.state.showLight == false){
            LightTemp = true;
            lightValue = 1;
            this.setState({showLight : true});
            this.setState({setLigth : "zapnuté"});
        }

        if(this.state.Blinds){
            blindsTemp = 1
        }else{
            blindsTemp = 0
        }

        client.write(this.props.room)
        .field({
          Temperature: this.state.setTemeprature,
          Light: lightValue,
          Blinds: blindsTemp
        })
        .then(() => console.log('Write point success'))
      }

      setBlinds(){
        const client = new Influx('http://18.221.12.219:8086/UserWish');
        let blindsTemp;
        let blindValue;
        let lightTemp;
       
        if(this.state.showBlind == true) {
            blindsTemp = false;
            blindValue = 0;
            this.setState({showBlind : false});
            this.setState({setBlinds : "odtiahnuté"});
        }else if(this.state.showBlind == false){
            blindsTemp = true;
            blindValue = 1;
            this.setState({showBlind : true});
            this.setState({setBlinds : "zatiahnuté"});
        }

        if(this.state.Light){
            lightTemp = 1
        }else{
            lightTemp = 0
        }

        client.write(this.props.room)
        .field({
          Temperature: this.state.setTemeprature,
          Light: lightTemp,
          Blinds: blindValue
        })
        .then(() => console.log('Write point success'))
      }


    render() {
        if (this.state.showCircle === false) {
            return (
                <Content refreshControl={
                    <RefreshControl
                    style={{backgroundColor: '#E0FFFF'}}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.callUptade}
                    />}>
                    <Card>
                        <CardItem style={stylesCardOne.cardItem} button onPress={this.openCircle}>
                            <Left>
                                <Text style={stylesMain.textSet}>Žiadaná teplota {'\n'}{this.state.setTemeprature} °C </Text>
                            </Left>
                            <Body>
                                <Text style={stylesMain.textCurrent}>Aktuálna teplota {'\n'}{this.state.currentTemeprature} °C</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-thermometer" style={stylesMain.icon}/>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={stylesCardTwo.cardItem}>
                            <Left>
                                <Icon Icon name="md-close-circle" style={stylesMain.icon} button onPress={this.getValuesFromHome}/>
                            </Left>
                            <Body>
                                <Text style={stylesMain.textCurrentHum}>Aktuálna vľhkosť {this.state.currentHumidity} %</Text>
                            </Body>
                            <Right>
                                <Icon name="md-umbrella" style={stylesMain.icon}/>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={stylesCardThree.cardItem} button onPress={this.setLight}>
                        {this.state.showLight ? 
                            <Right>
                                <Icon Icon name="md-bulb" style={stylesMain.icon}/>
                            </Right>
                            :
                            <Right>
                                <Icon name="ios-bulb-outline" style={stylesMain.icon}/>
                            </Right>                           
                        }
                            <Body>
                                <Text style={stylesMain.textCurrentOtherFromUserLight}>Svetlo {this.state.setLigth}</Text>
                            </Body>
                            
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={stylesCardFour.cardItem} button onPress={this.setBlinds}>
                        {this.state.showBlind ?
                            <Right>
                                <Icon name="ios-map" style={stylesMain.iconRotate}/>
                            </Right>
                            :
                            <Right>
                                <Icon Icon name="logo-windows" style={stylesMain.icon}/>
                            </Right>
                        }
                            <Body>
                                <Text style={stylesMain.textCurrentOtherFromUser}>Žalúzie{'\n'}{this.state.setBlinds}</Text>
                            </Body>

                        </CardItem>
                    </Card>
                </Content>
            )
        } else if (this.state.showCircle === true) {
            if (this.state.showChart === true) {
                return (<StockLineChartBasic room={this.props.room} goBack={this
                    .goBack
                    .bind(this)}/>)
            } else {
                return (<CircleSliderContainer
                    setTemp = {this.state.setTemeprature} setBlind = {this.state.showBlind}  setLight = {this.state.showLight} room={this.props.room}
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
        paddingTop: 8.5,
        paddingLeft: 15,
        fontWeight: 'bold',
        fontSize: 19
    },
    cardItem: {
        height: 100,
        backgroundColor: '#EE4E3C'
    },
    textCurrent: {
        color: '#ffffff',
        paddingLeft: 25,
        paddingTop: 8.5,
        fontWeight: 'bold',
        fontSize: 19
    },
    textCurrentHum: {
        color: '#ffffff',
        paddingLeft: 0,
        paddingTop: 8.5,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textCurrentOtherFromUserLight: {
        paddingTop: 20,
        color: '#000000',
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textCurrentOtherFromUser: {
        paddingTop: 10,
        color: '#000000',
        paddingLeft: 20,
        fontSize: 20,
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
