 import React,{
 	AppRegistry,
 	Component,
 	StyleSheet,
 	View,
 	Text
 } from 'react-native'

class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOK: this.props.textState
    }
  }
  textStyle () {
    if (this.state.isOK == '1') {
      return styles.textOK
    }
    if (this.state.isOK == '0') {
      return styles.textNotOK
    }
    return styles.textDefault
  }
  render() {
    return (
      <View style={styles.cell}>
        <Text style={this.props.textColor}>
          {this.props.cellText}
        </Text>
      </View>
    );
  }
}

export default class ProcessNav extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
 	render(){
    if (this.props.status == 1) {
      return (
        <View style={styles.Ncontainer}>
   				<Cell cellText="确认位置信息" textColor={styles.textNotOK} />
          <View style={styles.cellBd}></View>
   				<Cell cellText="填写地块详情" textColor={styles.textDefault} />
          <View style={styles.cellBd}></View>
   				<Cell cellText="确认提交" textColor={styles.textDefault} />
   			</View>
   		)
    }
    if (this.props.status == 2) {
      return (
        <View style={styles.Ncontainer}>
   				<Cell cellText="确认位置信息" textColor={styles.textOK} />
          <View style={styles.cellBd}></View>
   				<Cell cellText="填写地块详情" textColor={styles.textNotOK} />
          <View style={styles.cellBd}></View>
   				<Cell cellText="确认提交" textColor={styles.textDefault} />
   			</View>
   		)
    }
    if (this.props.status == 3) {
      return (
        <View style={styles.Ncontainer}>
   				<Cell cellText="确认位置信息" textColor={styles.textOK} />
          <View style={styles.cellBd}></View>
   				<Cell cellText="填写地块详情" textColor={styles.textOK} />
          <View style={styles.cellBd}></View>
   				<Cell cellText="确认提交" textColor={styles.textOK} />
   			</View>
   		)
    }
 	}
 }

 const styles = StyleSheet.create({
   Ncontainer:{
     height: 40,
		flexDirection:'row',
        alignItems: 'center',
         alignSelf: 'stretch'
	},
	cell:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
	},
	cellBd:{
        width:1,
        height: 30,
		backgroundColor:'#efeff4',
	},
	textDefault:{
		fontSize:18,
		color:'#999'
	},
    textNotOK: {
        fontSize: 18,
        color: '#FF0000'
  },
    textOK: {
        fontSize: 18,
        color: '#00CC00'
  }
 })
