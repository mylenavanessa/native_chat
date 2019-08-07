import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import * as Actions from './store/dispatchers';
import startFirebase from '../../services/firebase'
import moment from 'moment'


// import { Container } from './styles';

class Chat extends Component {
  state = {
    message: ''
  }

  componentDidMount() {
     startFirebase()
     this.props.dispatchWatchMessages()
  }

  sendMessage () {
    const { message } = this.state
    this.props.dispatchSendMessage(message)
    this.setState({ message: ''})
  }

  render() {
    const { message } = this.state
    const { data } = this.props.messages
    return(
      <View style={styles.container}>
        <View>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) =>
            <Text>{item.message}</Text>
            }
          />
        </View>
        <View style={styles.align}>
          <TextInput
            style={{height: 40, borderColor: 'black', borderWidth: 2, width: '50%'}}
            onChangeText={(message) => this.setState({message})}
            value={message}
            placeholder= 'Digite sua mensagem'  
          />
          <Button
            title='Send'
            onPress={() => this.sendMessage()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '10%'
  },
  align: {
    flexDirection: 'row'
  }
});

const mapStateToProps = state => ({
  messages: state.messages,
});

const mapDispatchToProps = {...Actions};

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
