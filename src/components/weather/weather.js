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