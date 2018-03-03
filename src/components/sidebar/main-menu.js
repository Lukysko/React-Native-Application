import React, {Component} from 'react';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Switch,
    Title,
    Button
} from 'native-base';
import {StyleSheet} from 'react-native';

export default class MainMenu extends Component {
    render() {
        return (
            <Container>
                <Header style={styleMainrMenu.header}>
                    <Left>
                        <Title>Menu</Title>
                    </Left>
                    <Right>
                        <Button transparent onPress={() => this.props.showOptions()}>
                            <Icon name="md-settings" style={styleMainrMenu.iconSettings}/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List>
                        <ListItem icon>
                            <Left>
                                <Icon name="ios-bulb"/>
                            </Left>
                            <Body>
                                <Text>Light</Text>
                            </Body>
                            <Right>
                                <Switch value={true}/>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name='ios-thermometer'/>
                            </Left>
                            <Body>
                                <Text>Heating</Text>
                            </Body>
                            <Right>
                                <Text>Off</Text>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="bluetooth"/>
                            </Left>
                            <Body>
                                <Text>Bluetooth</Text>
                            </Body>
                            <Right>
                                <Text>On</Text>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

const styleMainrMenu = StyleSheet.create({
    header: {
        backgroundColor: '#2C353A'
    },
    iconSettings: {
        color: 'white'
    }
});