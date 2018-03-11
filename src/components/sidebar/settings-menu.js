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

export default class SettingsMenu extends Component {
    render() {
        return (
            <Container>
                <Header style={styleSettingsMenu.header}>
                    <Left>
                        <Button transparent>
                            <Title>Info</Title>
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent onPress={() => this.props.hideOptions()}>
                            <Icon name="md-construct" style={styleSettingsMenu.iconSettings}/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List>
                        <ListItem icon>
                            <Left>
                                <Icon name='logo-github'/>
                            </Left>
                            <Body>
                                <Text style={styleSettingsMenu.textSet}>Lukysko/React-Native-Application</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name='ios-mail'/>
                            </Left>
                            <Body>
                                <Text style={styleSettingsMenu.textSet}>lukas.beno.dev@gmail.com</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name='logo-linkedin'/>
                            </Left>
                            <Body>
                                <Text style={styleSettingsMenu.textSet}>linkedin.com/in/lukas-beno-developer</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

const styleSettingsMenu = StyleSheet.create({
    header: {
        backgroundColor: '#2C353A'
    },
    iconSettings: {
        color: 'white'
    },
    textSet: {
        color: '#000000',
        fontSize: 14
    },
});