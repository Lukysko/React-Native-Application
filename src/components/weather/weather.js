import React, {Component} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
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

export default class Weather extends Component {
    componentDidMount(){
        this.getWeather();
    }
    
    getWeather() {
        return fetch('http://apidev.accuweather.com/locations/v1/search?q=nitra&apikey=hoArfRosT1215')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson[0].Key);
            //https://dataservice.accuweather.com/forecasts/v1/daily/1day/299645?apikey=IG5JdmG1s1QsO6imprmF8GFl278ygt07&language=sk-sk&details=false&metric=true
            fetch('https://dataservice.accuweather.com/forecasts/v1/daily/1day/' + responseJson[0].Key + '?apikey=IG5JdmG1s1QsO6imprmF8GFl278ygt07&language=sk-sk&details=false&metric=true')
            .then((response) => response.json())
            .then((responseJson) => { 
                console.log(responseJson);
            })
          })
          .catch((error) => {
            console.error(error);
          });
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
                        <Title>Weather</Title>
                    </Body>
                </Header>
                <Container style={stylesWeather.container}>
                    <Item rounded>
                        <Icon name='md-home'/>
                        <Input placeholder='City'/>
                        <Right>
                            <Icon name='ios-search' style={stylesWeather.iconSearch}/>
                        </Right>
                    </Item>
                    <Image
                        source={require('../../assets/img/weather.png')}
                        style={stylesWeather.image}/>
                    <Text style={stylesWeather.text}>26°C/10°C</Text>
                    <Text style={stylesWeather.text}>Rainfall: 20%</Text>
                    <Text style={stylesWeather.text}>Blaaaa</Text>
                </Container>
            </Container>
        );
    }
}

const stylesWeather = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: 'bold'
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