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
import events from 'events';
const Influx = require('influxdb-nodejs');

export default class MainMenu extends Component {
    constructor(props) {
        super(props)
        this.setHouseLight = this
            .setHouseLight
            .bind(this);
        this.setHouseIrrigation = this
            .setHouseIrrigation
            .bind(this);
        this.setHouseGate = this
            .setHouseGate
            .bind(this);
        this.state = {
            houseLight: false,
            houseGate: false,
            houseIrrigation: false,
            textLight: '',
            textGate: '',
            textIrrigation: ''
        }
    }

    setHouseLight(){            
        const client = new Influx('http://18.221.12.219:8086/UserWish');
        let lightValue;

        if(this.state.houseLight == true) {
            lightValue = 0;
            this.setState({houseLight : false});
            this.setState({textLight : 'Vypnuté'});
        }else if(this.state.houseLight == false){
            lightValue = 1;
            this.setState({houseLight : true});
            this.setState({textLight : 'Zapnuté'});
        }

        client.write('Lighting')
        .field({
          SwitchOn: lightValue
        })
        .then(() => console.log('Write point success'))
    }

    setHouseGate(){
        const client = new Influx('http://18.221.12.219:8086/UserWish');
        let gateValue;

        if(this.state.houseGate == true) {
            gateValue = 0;
            this.setState({houseGate : false});
            this.setState({textGate : 'Zatvorená'});
        }else if(this.state.houseGate == false){
            gateValue = 1;
            this.setState({houseGate : true});
            this.setState({textGate : 'Otvorená'});
        }

        client.write('Gate')
        .field({
          Open: gateValue
        })
        .then(() => console.log('Write point success'))
    }

    setHouseIrrigation(){
        const client = new Influx('http://18.221.12.219:8086/UserWish');
        let irrigationValue;

        if(this.state.houseIrrigation == true) {
            irrigationValue = 0;
            this.setState({houseIrrigation : false});
            this.setState({textIrrigation : 'Vypnuté'});
        }else if(this.state.houseIrrigation == false){
            irrigationValue = 1;
            this.setState({houseIrrigation : true});
            this.setState({textIrrigation : 'Zapnuté'});
        }

        client.write('Irrigation')
        .field({
          SwitchOn: irrigationValue
        })
        .then(() => console.log('Write point success'))
    }

    getHouseIrrigation(){
        events.EventEmitter.defaultMaxListeners = 0;

        const client = new Influx('http://18.221.12.219:8086/UserWish');
        let lastValue;
        let valuesArray;
        const reader = client.query('Irrigation');
        
        reader.addField('SwitchOn');
        reader.then(data => {
        lastValue = data.results[0].series[0].values.length,
        valuesArray = data.results[0].series[0].values[lastValue-1]
        if(Number(valuesArray[1]) == 1){
            this.setState({houseIrrigation : true});
            this.setState({textIrrigation : 'Zapnuté'});
        }else if(Number(valuesArray[1]) == 0){
            this.setState({houseIrrigation : false});
            this.setState({textIrrigation : 'Vypnuté'});
        }
        });
    }

    getHouseLight(){
        events.EventEmitter.defaultMaxListeners = 0;

        const client = new Influx('http://18.221.12.219:8086/UserWish');
        let lastValue;
        let valuesArray;
        const reader = client.query('Lighting');
        
        reader.addField('SwitchOn');
        reader.then(data => {
        lastValue = data.results[0].series[0].values.length,
        valuesArray = data.results[0].series[0].values[lastValue-1]
        if(Number(valuesArray[1]) == 1){
            this.setState({houseLight : true});
            this.setState({textLight : 'Zapnuté'});
        }else if(Number(valuesArray[1]) == 0){
            this.setState({houseLight : false});
            this.setState({textLight : 'Vypnuté'});
        }
        });
    }

    getHouseGate(){
        events.EventEmitter.defaultMaxListeners = 0;

        const client = new Influx('http://18.221.12.219:8086/UserWish');
        let lastValue;
        let valuesArray;
        const reader = client.query('Gate');
        
        reader.addField('Open');
        reader.then(data => {
        lastValue = data.results[0].series[0].values.length,
        valuesArray = data.results[0].series[0].values[lastValue-1]
        if(Number(valuesArray[1]) == 1){
            this.setState({houseGate : true});
            this.setState({textGate : 'Otvorená'});
        }else if(Number(valuesArray[1]) == 0){
            this.setState({houseGate : false});
            this.setState({textGate : 'Zatvorená'});
        }
        });
    }

    componentWillMount(){
        this.getHouseLight();
        this.getHouseIrrigation();
        this.getHouseGate();
    }
    

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
                                <Text>Osvetlenie domu</Text>
                            </Body>
                            <Right>
                                <Text>{this.state.textLight}</Text>
                                <Switch value={this.state.houseLight} onValueChange={this.setHouseLight}/>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name='ios-water'/>
                            </Left>
                            <Body>
                                <Text>Zavlažovanie</Text>
                            </Body>
                            <Right>
                            <Text>{this.state.textIrrigation}</Text>
                                <Switch value={this.state.houseIrrigation} onValueChange={this.setHouseIrrigation}/>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="ios-car"/>
                            </Left>
                            <Body>
                                <Text>Brána</Text>
                            </Body>
                            <Right>
                            <Text>{this.state.textGate}</Text>
                                <Switch value={this.state.houseGate} onValueChange={this.setHouseGate}/>
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