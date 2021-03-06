import React, {
  Component,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  View
} from 'react-native'
import ActionBar from '../../control/ActionBar'
import ButtonControl from '../../control/ButtonControl'
import Util from '../../utils/Util'
import Recommend from '../Recommend'
import AddRecomEdit from './AddRecomEdit'
import TransLandEdit from './TransLandEdit'
var typeinData = {}
export default class RecommendDesc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btn: null
    }
  }
  _submit() {
    typeinData.Code = paramsRecommendDesc.Code
    this.props.maskViewHandler(true)
    this.props.sendPostJSON({
      url: 'http://www.yuanxin2015.com/MobileBusiness/LandInfoService/api/LandInfo/UpdateLandInfoToLandDataBaseAndSeagull2DataBaseAboutCode',
      body: JSON.stringify(typeinData),
      success: (response) => {
        this.props.maskViewHandler(false)
        if (JSON.parse(response.message).status == 'SUCCESS') {
          Util.AlertMessage("保存成功")
          this.props.navigator.popToTop()
        } else {
          Util.AlertMessage("保存失败")
          this.props.navigator.popToTop()
        }
      }
    })
  }

  editFun() {
    if (paramsRecommendDesc.LandSourcesName == '招拍挂') {
      this.props.jumpPushPage(AddRecomEdit, 'addRecomEdit', paramsAddRecom={...paramsRecommendDesc})
    } else {
      this.props.jumpPushPage(TransLandEdit, 'transLandEdit', paramsTransLand={...paramsRecommendDesc})
    }
  }
  render() {
      console.log(paramsRecommendDesc)
    let actionBarProp = {
      actionName: '推荐详情',
      isDefaultBack: this.props.jumpPop
    }
    if (paramsRecommendDesc.StatusImageInfoCode == -2) {
      this.state.btn = <View style={styles.btnGroup}>
                              <ButtonControl
                                  userClick={this._submit.bind(this)}
                                  buttonStyle={styles.btnContainer}
                                  buttonTextStyle={styles.btnText}
                                  buttonText="提交"/>
                       </View>

      actionBarProp.actionBarRightProp = {
          text: '编辑',
          click: () => this.editFun()
      }
    }
    let address = paramsRecommendDesc.Province + '   ' + paramsRecommendDesc.City + '   '
    if (paramsRecommendDesc.County) {
      address += paramsRecommendDesc.County
    }
    let TransferFormName
    if (paramsRecommendDesc.TransferFormName) {
        TransferFormName = <View style={styles.bottomInfoText}>
            <Text allowFontScaling={false} style={styles.textLeftItem}>出让形式：</Text>
            <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.TransferFormName}</Text>
        </View>
    }
    let operationList = null
    if (paramsRecommendDesc.OperationList) {
      let lists = []
      for (let item of paramsRecommendDesc.OperationList) {
        lists.push(<Text style={styles.operateText}>{item}</Text>)
      }
      operationList =
      <View>
        <View style={styles.h3Container}>
          <Text allowFontScaling={false} style={styles.h3Text}>状态信息</Text>
        </View>
        <View style={styles.operate}>
          {lists}
        </View>

        <View style={styles.greyLine}></View>
      </View>
    }
    return (

      <View style={styles.container}>
        <ActionBar {...actionBarProp} />
        <View style={styles.imgContainer}>
          <View style={styles.topItem}>
            <Image source={{uri: paramsRecommendDesc.StatusImageInfo[0].CommitUrl}} style={styles.topImg} />
            <Text allowFontScaling={false} style={[styles.topText, {color: paramsRecommendDesc.StatusImageInfo[0].CommitColor}]}>{paramsRecommendDesc.StatusImageInfo[0].CommitName}</Text>
          </View>
          <View style={styles.topItem}>
            <Image source={{uri: paramsRecommendDesc.StatusImageInfo[0].AppraiseUrl}} style={styles.topImg} />
            <Text allowFontScaling={false} style={[styles.topText, {color: paramsRecommendDesc.StatusImageInfo[0].AppraiseColor}]}>{paramsRecommendDesc.StatusImageInfo[0].AppraiseName}</Text>
          </View>
          <View style={styles.topItem}>
            <Image source={{uri: paramsRecommendDesc.StatusImageInfo[0].ProtocolUrl}} style={styles.topImg} />
            <Text allowFontScaling={false} style={[styles.topText, {color: paramsRecommendDesc.StatusImageInfo[0].ProtocolColor}]}>{paramsRecommendDesc.StatusImageInfo[0].ProtocolName}</Text>
          </View>
          <View style={styles.topItem}>
            <Image source={{uri: paramsRecommendDesc.StatusImageInfo[0].CommisionUrl}} style={styles.topImg} />
            <Text allowFontScaling={false} style={[styles.topText, {color: paramsRecommendDesc.StatusImageInfo[0].CommisionColor}]}>{paramsRecommendDesc.StatusImageInfo[0].CommisionName}</Text>
          </View>
        </View>
        <View style={styles.greyLine}></View>
        <ScrollView style={styles.viewContainer} keyboardShouldPersistTaps={true}>
          {operationList}
          <View style={styles.infoTop}>
            <View style={styles.h3Container}>
              <Text allowFontScaling={false} style={styles.h3Text}>位置信息</Text>
            </View>
            <View style={styles.bottomInfo}>
              <View style={styles.bottomInfoText}>
                  <Text allowFontScaling={false} style={styles.textLeftItem}>土地来源：</Text>
                <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.LandSourcesName}</Text>
              </View>
              <View style={styles.bottomInfoText}>
                <Text allowFontScaling={false} style={styles.textLeftItem}>所在地区：</Text>
                <Text allowFontScaling={false} style={styles.textRightItem}>{address}</Text>
              </View>
              <View style={styles.bottomInfoText}>
                <Text allowFontScaling={false} style={styles.textLeftItem}>详细地址：</Text>
                <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.AddressDetail}</Text>
              </View>
            </View>
          </View>
          <View style={styles.greyLine}></View>
          <View style={styles.infoBottom}>
            <View style={styles.h3Container}>
              <Text allowFontScaling={false} style={styles.h3Text}>地块详情</Text>
            </View>
            <View style={styles.bottomContain}>
              <View style={styles.bottomInfo}>
                <View style={styles.bottomInfoText}>
                  <Text allowFontScaling={false} style={styles.textLeftItem}>四至：</Text>
                    <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.LandScope}</Text>
                </View>
                <View style={styles.bottomInfoText}>
                  <Text allowFontScaling={false} style={styles.textLeftItem}>用地性质：</Text>
                  <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.LandNatureName}</Text>
                </View>
                <View style={styles.bottomInfoText}>
                  <Text allowFontScaling={false} style={styles.textLeftItem}>规划建筑面积：</Text>
                  <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.PlanBuildAreas}m²</Text>
                </View>
                <View style={styles.bottomInfoText}>
                  <Text allowFontScaling={false} style={styles.textLeftItem}>建设用地面积：</Text>
                  <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.BuildLandAreas}m²</Text>
                </View>
                <View style={styles.bottomInfoText}>
                  <Text allowFontScaling={false} style={styles.textLeftItem}>绿化率：</Text>
                  <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.GreeninGate}%</Text>
                </View>
                <View style={styles.bottomInfoText}>
                  <Text allowFontScaling={false} style={styles.textLeftItem}>限高：</Text>
                  <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.HighLimit}m</Text>
                </View>
                <View style={styles.bottomInfoText}>
                  <Text allowFontScaling={false} style={styles.textLeftItem}>起始价：</Text>
                  <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.StartingPrice}万元</Text>
                </View>
                <View style={styles.bottomInfoText}>
                  <Text allowFontScaling={false} style={styles.textLeftItem}>通平情况：</Text>
                  <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.MunicipalSupporName}</Text>
                </View>
                  {TransferFormName}

                <View style={styles.bottomInfoText}>
                   <Text allowFontScaling={false} style={styles.textLeftItem}>拆迁情况：</Text>
                   <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.DemolitionSituationName}</Text>
                 </View>

                <View style={styles.bottomInfoText}>
                    <Text allowFontScaling={false} style={styles.textLeftItem}>推出时间：</Text>
                    <Text allowFontScaling={false} style={styles.textRightItem}>{paramsRecommendDesc.LaunchTime}</Text>
                </View>
              </View>
            </View>
          </View>
                {this.state.btn}
            <View style={styles.btnWhite}>
                <Text allowFontScaling={false} style={styles.btnadText}>
                    kdsfk
                </Text>
            </View>
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
   container: {
     height: Dimensions.get('window').height,
     backgroundColor: '#FFFFFF'
   },
   viewContainer: {
       backgroundColor:'#fff'
   },
   imgContainer: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     alignItems: 'center',
     margin:10,
   },
   topItem: {
     justifyContent: 'center',
     alignItems: 'center',
   },
   topImg: {
     width: 25,
     height: 25,
     marginBottom:10,
   },
    topText:{
        marginTop:10,
    },
   greyLine: {
     height: 10,
     backgroundColor: '#efeff4',
     alignSelf: 'stretch'
   },
   infoTop: {
     width: Dimensions.get('window').width,
     flexDirection: 'column'
   },
   operate: {
     padding: 10,
   },
   operateText: {
     color: "#3b3b3b",
     fontSize: 15,
   },
   h3Container: {
     borderBottomWidth: 1,
     borderBottomColor: '#ebebeb'
   },
   h3Text: {
     fontSize: 15,
     marginTop: 12,
     marginLeft: 10,
     marginBottom: 10,
     color: '#3b3b3b'
   },
   bottomInfo: {
     width: Dimensions.get('window').width,
   },
   bottomInfoText: {
     width: Dimensions.get('window').width,
     height:40,
     flexDirection: 'row',
     justifyContent:'center',
     borderBottomWidth:1,
     borderBottomColor:'#eaeaea',
   },
   textLeftItem: {
     flex:4,
     fontSize: 15,
     color: '#3b3b3b',
     marginLeft:10,
     height:18,
     justifyContent:'center',
     marginTop:10,

   },
   textRightItem: {
     flex:6,
     height:18,
     color: '#a7a7a7',
     fontSize: 15,
     justifyContent:'center',
     marginTop:10,

   },
    btnWhite:{
        height:22,
        flexDirection:'row',
        backgroundColor:'#fff'
    },
    btnadText:{
        height:22,
        color:'#fff',
        fontSize:15,
    },
    bottomView:{
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent:'center',
        height:40,
    },
   topState: {
     justifyContent: 'center',
     alignItems: 'center'
   },
   topText: {
     fontSize: 15,
   },
  bottomContain: {
    flexDirection: 'row',
  },
  nexBtn: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
  },
    btnContainer: {
        height:40,
        margin:10,
        marginTop:25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ff5001',
    },
    btnText:{
        justifyContent: 'center',
        alignItems: 'center',
        color:'#fff',
        fontSize:15,
    },
 })
