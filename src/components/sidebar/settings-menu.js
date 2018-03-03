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
                            <Title>Options</Title>
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
                                <Icon name='ios-notifications-outline'/>
                            </Left>
                            <Body>
                                <Text>Notofications</Text>
                            </Body>
                            <Right>
                                <Switch value={false}/>
                            </Right>
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
    }
});