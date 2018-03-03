import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import LivingCard from '../tabs/living/main-living';
import Weather from '../weather/weather';
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
    ScrollableTab
} from 'native-base';

export default class AppHeader extends Component {
    constructor(props) {
        super(props)
        this.openWeather = this
            .openWeather
            .bind(this);
        this.state = {
            showWeather: false
        }
    }
    openWeather = () => {
        this.setState({showWeather: true});
    }
    closeWeather = () => {
        this.setState({showWeather: false});
    }

    createContent = (Card, Name) => {
        return (
            <Tab
                heading={Name}
                tabStyle={tabStyle.color}
                textStyle={tabStyle.colorText}
                activeTabStyle={tabStyle.color}>
                <Card/>
            </Tab>
        );
    }

    render() {
        if (this.state.showWeather === false) {
            return (
                <Container>
                    <Header style={stylesHeader.header}>
                        <Left>
                            <Button transparent onPress={() => this.props.openDrawer()}>
                                <Icon ios='ios-menu' android="md-menu" style={stylesHeader.iconMenu}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Dashboards</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={this.openWeather}>
                                <Icon name='ios-sunny'/>
                            </Button>
                        </Right>
                    </Header>
                    <Tabs
                        renderTabBar={() => <ScrollableTab/>}
                        tabBarUnderlineStyle={stylesHeader.mainTabs}>
                        {this.createContent(LivingCard, 'Living')}
                        {this.createContent(LivingCard, 'Kitchen')}
                        {this.createContent(LivingCard, 'Bathroom')}
                        {this.createContent(LivingCard, 'Bedroom')}
                        {this.createContent(LivingCard, 'Kids')}
                    </Tabs>
                </Container>
            );
        } else if (this.state.showWeather === true) {
            return (<Weather
                closeWeather={this
                .closeWeather
                .bind(this)}/>)
        }
    }
}

const stylesHeader = StyleSheet.create({
    iconMenu: {
        fontSize: 20,
        color: 'white'
    },
    header: {
        backgroundColor: '#2C353A'
    },
    mainTabs: {
        backgroundColor: '#ffffff'
    }
});

const tabStyle = {
    color: {
        backgroundColor: '#2C353A'
    },
    colorText: {
        color: '#ffffff'
    }
}
