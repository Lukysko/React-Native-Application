import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
    Header,
    Left,
    Button,
    Icon,
    Right,
    Body,
    Title,
    Container,
    Tab,
    Tabs,
    ScrollableTab,
    Content,
    Item,
    Input
} from 'native-base';

import Image from 'react-native-remote-svg';

var sunny = require('../../assets/img/sunny.svg');
var rain = require('../../assets/img/rain.svg');
var snow = require('../../assets/img/snow.svg');
var night = require('../../assets/img/night.svg');

export default class Weather extends Component {
    constructor(props) {
        super(props)
        this.search = this
            .search
            .bind(this);
        this.state = {
            headlineText: '',
            max: '',
            min: '',
            dayForec: '',
            nihgtForec: '',
            city: '',
            numberWheater: 0,
            picture: sunny
        }
    }

    search(){
        this.getWeather(this.state.city);
    }

    setPicture(number){
        var time = (new Date()).getHours();
        if((number <= 6 && number == 30 && time < 20 ) || (number == 32)){
            this.setState({picture: sunny});
        }else if((number > 6 && number <= 19 && time < 20) || number == 31){
            this.setState({picture: rain});
        }
        else if(number > 19 && number <= 30 && time < 20){
            this.setState({picture: snow});
        } else if(number < 45 && number > 30 || time >= 20) {
            this.setState({picture: night});
        }
    }
    
    getWeather(city) {
        return fetch('http://apidev.accuweather.com/locations/v1/search?q='+ city +'&apikey=hoArfRosT1215')
          .then((response) => response.json())
          .then((responseJson) => {
            try{
                 //https://dataservice.accuweather.com/forecasts/v1/daily/1day/299645?apikey=IG5JdmG1s1QsO6imprmF8GFl278ygt07&language=sk-sk&details=false&metric=true
                fetch('https://dataservice.accuweather.com/forecasts/v1/daily/1day/' + responseJson[0].Key + '?apikey=IG5JdmG1s1QsO6imprmF8GFl278ygt07&language=sk-sk&details=false&metric=true')
                .then((response) => response.json())
                .then((responseJson) => { 
                console.log(responseJson.DailyForecasts[0].Day.Icon);
                this.setState({headlineText: responseJson.Headline.Text});
                this.setState({max: responseJson.DailyForecasts[0].Temperature.Maximum.Value + '°C /'});
                this.setState({min: responseJson.DailyForecasts[0].Temperature.Minimum.Value + '°C'});
                this.setState({dayForec: 'Deň: ' + responseJson.DailyForecasts[0].Night.IconPhrase});
                this.setState({nihgtForec:'Noc: ' + responseJson.DailyForecasts[0].Day.IconPhrase});
                this.setState({numberWheater: responseJson.DailyForecasts[0].Day.Icon});
                //https://apidev.accuweather.com/developers/weatherIcons
                this.setPicture(responseJson.DailyForecasts[0].Day.Icon);
            })
            }
            catch (error) {
                this.setState({headlineText: 'Mesto nenájdené !'});
                this.setState({max: ''});
                this.setState({min: ''});
                this.setState({dayForec: ''});
                this.setState({nihgtForec: ''});
            }
          })
    }

    render() {
        return (
            <Container>
                <Header style={stylesWeather.header}>
                    <Left>
                        <Button transparent onPress={() => this.props.closeWeather()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Počasie</Title>
                    </Body>
                </Header>
                <Container style={stylesWeather.container}>
                    <Item rounded>
                        <Icon name='md-home'/>
                        <Input placeholder='Mesto' onChangeText={(city) => this.setState({city})}/>
                        <Right>
                            <Icon name='ios-search' style={stylesWeather.iconSearch} onPress={this.search}/>
                        </Right>
                    </Item>
                    <Image
                        source={this.state.picture}
                        style={stylesWeather.image}/>
                    <Text style={stylesWeather.text}>{this.state.dayForec}</Text>
                    <Text style={stylesWeather.text}>{this.state.nihgtForec}</Text>
                    <Text style={stylesWeather.text}>{this.state.max} {this.state.min}</Text>
                    <Text style={stylesWeather.text}>{this.state.headlineText}</Text>
                </Container>
            </Container>
        );
    }
}

const stylesWeather = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    header: {
        backgroundColor: '#2C353A'
    },
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center'
    },
    image: {
        flex: 1,
        alignItems: 'center'
    },
    iconSearch: {
        paddingRight: 15
    }
});