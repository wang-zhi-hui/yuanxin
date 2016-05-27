import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  WebView,
  View,
} from 'react-native'
import TouchRowControl from '../../control/TouchRowControl'
import ActionBar from '../../control/ActionBar'


export default class Rule extends Component{
  constructor(props) {
    super(props)
    this.state = {
      html: '正在获取...'
    }
  }
  componentWillMount() {
    let typeinData = {
      Code: params.Code
    }
    this.props.maskViewHandler(true)
    this.props.sendPostJSON({
      url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/LoadProtocolRuleInfo',
      body: JSON.stringify(typeinData),
      success: (response) => {
        this.props.maskViewHandler(false)
        console.log(response.message)
        let html = JSON.parse(response.message).data.Detail[0].Content
        this.setState({html: html})
      }
    })
  }
  render() {
    console.log(this.state.html)
    return (
      <View style={styles.container}>
        <ActionBar actionName={params.Name}  isDefaultBack={this.props.jumpPop} />
        <WebView
          source={{html: this.state.html}}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#FFFFFF'
  },
  showText: {
    fontSize: 16,
    lineHeight: 24,
    margin:10,
  }
})
