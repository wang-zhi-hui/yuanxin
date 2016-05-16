'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions
    } = React;
var ActionBar = require('../../control/ActionBar');
var ConfigUtil = require('../../utils/ConfigUtil');
var StyleUtil=require('../../utils/StyleUtil');
var RegisterAgreement = React.createClass({
    render(){
        var actionBar = {
            actionName: ConfigUtil.InnerText.registerAgreement,
            isDefaultBack: this.props.jumpPop
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBar} />
                <ScrollView style={styles.main}>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}您使用远薪平台服务前，应当仔细阅读《远薪平台注册协议》(以下简称《注册协议》)的全部内容，尤其是涉及您重大权益的加粗部分的文字。请您审慎阅读并选择接受或不接受本协议。如果您不接受本协议的任何条款，您应立即停止注册程序或立即停止登录或使用远薪平台，并且远薪平台无需为您因此所遭受的任何损失承担责任。如您对协议有任何疑问，应向平台客服人员进行咨询。除非您接受本协议所有条款，否则您无权使用平台于本协议项下所提供的服务。
                        {'\n'}{'\n'}{'\t'}您在用户注册页面点击“同意以下协议并注册”按钮后，即视为您已阅读、理解并同意本协议的全部内容，本协议即在您与远薪平台之间产生法律效力，成为对双方均具有约束力的法律文件。您承诺接受并遵守本协议的约定，届时您不应以未阅读本协议的内容或者未获得平台对您问询的解答等理由，主张本协议无效，或要求撤销本协议。
                        {'\n'}{'\n'}{'\t'}远薪平台（以下简称“平台”）包括远薪客户端、远薪移动办公、远薪商家端三个子平台，所有者是北京我家众创电子商务有限公司（以下简称“我家众创公司”）,远薪平台服务指远薪平台基于PC端、微信端及客户端提供的相关服务。
                        为保护注册用户合法权益，规范注册用户行为，维护平台秩序，特拟定本协议。
                    </Text>
                    <Text style={styles.main_1} allowFontScaling={false}>第一条 协议主体</Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}本协议由平台所有者及其关联公司与注册使用平台用户（以下简称“用户”）共同遵守，注册用户包括用户、商家及合伙人等一切在平台上进行注册的主体。
                    </Text>
                    <Text style={styles.main_1} allowFontScaling={false}>第二条 协议生效和适用范围</Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}1.本协议内容包括协议正文以及平台已经发布的或将来可能发布的各类规则、操作流程。所有规则为本协议不可分割的一部分，与协议正文具有同等的法律效力。
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}2.当用户在注册页面点击“同意以下协议并注册”按钮后，即表示已阅读、理解并同意遵守本协议的全部约定内容。
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}3.平台有权根据需要修改本协议或各类规则、操作流程，如本协议有任何变更，平台有义务在PC端及客户端以公示形式通知，但无需征得用户的事先同意。修改后的协议及规则一经公示即生效，成为本协议的一部分。如用户继续登录或使用平台的，即视为已阅读、理解并接受修改后的协议。
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}4.用户应该按照本协议约定行使权利并履行义务。如不能接受本协议的约定，包括但不限于不能接受修订后的协议及各类规则，则应立即停止登录或使用平台提供的任何服务。如用户继续使用服务，则表示同意、理解并接受本协议及各类规则的约定。
                    </Text>
                    <Text style={styles.main_1} allowFontScaling={false}>第三条 定义和说明
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>3.1定义</Text>
                    <Text style={styles.main_2} allowFontScaling={false}>
                        {'\t'}项目信息：指开发商通过平台发布的房地产开发项目的信息，包括但不限于项目的所在地、预估价格区间、产品细节、产权说明等信息。
                        {'\t'}用户：指完成平台注册程序，获得可以登陆平台系统权限的正式.
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}用户：指完成平台注册程序，获得可以登陆平台系统权限的正式注册用户。用户注册需通过实名认证，提交与证件保持一致的姓名、身份证号，以及本人手机号。
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}中国：指中华人民共和国, 为本协议之目的, 不包括香港、澳门和台湾。
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}法律：指中国有权机关颁布的法律、法规、规章或其他任何规范性文件。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>3.2说明
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}1.除非本协议有任何相反用词表述：
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}任何当事方应被解释为包括他们各自的承继者和其所允许的受让人和被转让人；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}凡提及一份交易文件或任何其他协议或文书，应指经不时修订或更新的该份交易文件或其他协议或文书；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}凡提及法律规定应指被修订或更新的规定；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}凡提及一天中的某个时间应指北京时间。
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}2.章节、条款及附件的标题仅为参考便利之用。
                    </Text>
                    <Text style={styles.main_1} allowFontScaling={false}>第四条 平台服务
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>4.1服务内容
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}平台服务内容主要包括发布项目信息、提供交易管理服务、提供用户服务等，平台服务的具体内容由平台方根据实际情况自行决定并提供。除非本协议另有其它明示规定，平台所推出的新产品、新功能、新服务，均受到本协议之规范。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>4.2服务费用
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}当用户使用平台服务时，平台有权向用户收取包括但不限于平台服务费、交易手续费等相关费用，具体收费标准及收费时间请参见平台网站上不时发布的平台费用信息或公告，平台保留单方面制定及调整平台费用的权利。用户在使用平台服务过程中可能需要向第三方(如支付机构等)支付一定的费用，具体收费标准可参见平台提示、由相关方自行约定或参见相关第三方网站相关介绍页面。
                    </Text>
                    <Text style={styles.main_1} allowFontScaling={false}>第五条 用户管理
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>5.1用户注册
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}申请注册成为平台用户的，应向平台提供真实、准确和完整的注册资料，如注册资料有任何变动，必须及时向平台提供并更新信息。一经注册成功，成为平台用户，用户将通过其注册手机号和相应的验证码登录并进一步使用平台提供的服务。每个用户应当对以其注册手机号在平台上进行的所有活动和事件承担全部责任。用户使用注册手机号登陆平台状态下进行的任何操作将视为用户本人的操作，一切后果由用户本人承担。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>5.2注册手机号、验证码
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}用户应妥善保管其在平台登陆时使用的注册手机号和验证码。用户将对其注册手机号和验证码的安全承担全部责任。用户不应将其注册手机号和验证码转让或出借予他人使用。如用户发现其注册手机号和/或验证码遭他人非法使用或存在安全漏洞的情况，应立即通知平台。因黑客行为或用户的保管疏忽导致注册手机号和/或验证码遭他人非法使用，平台不承担任何责任。用户若发现任何非法使用其平台登陆的注册手机号和/或验证码或存在安全漏洞的情况，应立即通知平台并采取措施以减少不必要的损失。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>5.3 用户注销
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}如用户通过平台达成的交易项下全部权利和义务均已履行完毕，并决定注销其用户资格，在清偿所有应付款项(包括但不限于违约金、服务费等)之后，可以向平台方申请注销用户资格，并经平台审核同意后可正式注销。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>5.4 用户资格暂停、中断或终止
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}平台有权基于自身合理判断，在其认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止向用户提供本协议项下的全部或部分服务，并在其后的合理时间内通知用户，且无需对用户或任何第三方承担任何责任。前述情形包括但不限于：
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}1)平台合理地认为用户所提供的资料不具有真实性、有效性或完整性；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}2)平台发现异常交易或有疑义或有违法之虞时；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}3)平台合理地认为用户涉嫌洗钱、套现、传销、冒用注册手机号等情形；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}4)平台合理地认为用户已经违反本协议中规定的各类规则及精神；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}5)用户在使用平台收费服务时未按规定向平台支付相应服务费用；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}6)第三人冒用或盗用用户的注册手机号和验证码，或其他任何未经用户合法授权的情形；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}7)用户违反中国法律、法规或其他规范性文件；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}8)平台基于交易安全等原因，根据其合理判断的其他情形。
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}9)用户资格的暂停、中断或终止不代表用户责任的终止，用户仍应对其使用平台服务期间的行为承担可能的违约或损害赔偿责任，同时平台仍可保有用户的相关信息。
                    </Text>
                    <Text style={styles.main_1}allowFontScaling={false}>第六章权利及义务
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>6.1 用户权利
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}1.所有平台注册用户均享有同等的项目信息知悉权、参与权；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}2.用户的所有注册信息均受平台的合理保护，不因平台原因被非法泄露或利用；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}3.所有注册用户享有向平台提出意见、建议及进行投诉的权利。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>6.2 用户义务
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}1.用户不得利用平台服务从事侵害他人权益或违法之行为，违反者应负由之产生的一切法律责任。上述行为包括但不限于：
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}1)发表或传播任何损害国家利益、社会公共利益或涉及国家安全的信息资料或言论，或发起、参与任何洗钱类项目；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}2)利用平台从事窃取商业秘密、窃取个人信息等违法犯罪活动；未经平台书面许可，通过本协议约定方式之外的途径进入平台或平台计算机信息网络系统，或者使用本协议约定范围外平台或平台计算机信息网络的资源或服务；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}3)违反诚实信用原则进行不正当竞争，扰乱平台交易正常秩序的行为；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}4)发布涉嫌侵犯他人名誉权、隐私权、知识产权或其它合法权益的及其他涉嫌违法或违反本协议的信息的行为；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}5)对平台上的任何数据作商业性利用，包括但不限于在未经平台事先书面同意的情况下，以复制、传播等任何方式使用平台展示资料的行为；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}6)使用任何装置、软件或例行程序干预或试图干预平台的正常运作或正在平台上进行的任何交易、活动或将导致不合理的庞大数据负载加诸平台网络设备的行为；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}7)违反依法律或约定所应负之保密义务的行为；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}8)冒用他人名义使用平台服务的行为；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}9)提供赌博资讯或以任何方式引诱他人参与赌博的行为；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}10)涉嫌洗钱、套现或进行传销活动的行为；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}2.用户承诺并保证其在平台上的所有活动均代表其真实意思且由其独立审慎而决定，并且用户理解其在平台上的所有活动所产生风险和损失均由其自身承担，平台对此不作任何担保或承担任何责任。用户无权要求平台对其面临的风险和遭受的损失进行任何保证或赔偿。用户须对自己在使用平台服务过程中的行为承担法律责任。用户承担法律责任的形式包括但不限于：对受到侵害者（包括但不限于平台及平台其他注册用户）进行赔偿，以及在平台首先承担了因用户行为导致的行政处罚或侵权损害赔偿责任后，用户应给予平台等额的赔偿。
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}用户通过任何平台提供的服务上传、存储、发布（通过电子邮件或任何其它方式传送）的文本、文件、图像、照片、视频、声音、音乐、其他创作作品或任何其他材料（以下统称“内容”），均由用户作为内容提供者承担责任。平台仅作为提供存储空间和展示机会的第三方平台，不对该等内容的正确性、完整性或品质做出任何保证，亦不对由其产生的任何损失或损害承担任何责任。
                    </Text>
                    <Text style={styles.main_1} allowFontScaling={false}>第七章 责任范围及限制
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>7.1 风险免责
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}用户了解并认可，任何通过平台进行的交易并不能避免以下风险的产生，平台不能也没有义务为如下风险负责：
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}1)宏观经济风险：因宏观经济形势变化可能引起的价格等方面的异常波动风险；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}> {'\t'}2)政策风险：因有关法律、法规及相关政策、规则发生变化可能引起的价格等方面的异常波动风险
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}3)违约风险：交易方无力或无意愿按时足额履约风险;
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}4)利率风险：因市场利率变化而导致用户购买或持有的产品的实际收益受影响的风险；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}5)信息风险：对交易各方发布的即使尽谨慎义务仍无法控制、辨别其真实性的信息，我家众创无需承担任何由此引起的损失；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}6)因不可抗力因素导致的风险。
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}以上条款并不能揭示用户通过平台进行交易的全部风险及市场的全部情形。用户在做出交易决策前，应全面了解相关交易，谨慎决策，并自行承担全部风险。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>7.2 服务中断或故障免责
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}用户同意，基于互联网服务的特殊性，平台不担保服务不会中断，也不担保服务的及时性和/或安全性。系统因相关状况无法正常运作，使平台用户无法使用任何平台服务或使用任何平台服务时受到任何影响时，平台对平台用户或第三方不负任何责任，前述状况包括但不限于：
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}1)平台系统停机维护期间；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}2)计算机病毒侵入或发作；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}3)计算机系统遭到破坏、瘫痪或无法正常使用；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}4)电信部门技术调整；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}5)因政府管制而造成的网络暂时性关闭；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}6)电信设备出现故障不能进行数据传输的；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}7)由于黑客攻击、网络供应商技术调整或故障、网站升级、银行方面的问题等原因而造成的平台服务中断或延迟；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}8)因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成平台系统障碍不能开展业务的；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}9)其他不可归责于平台的情形。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>7.3 建议或咨询免责
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}用户自平台及平台工作人员或经由平台服务取得的建议或资讯，无论其为书面或口头，均不构成平台对平台服务的任何保证。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>7.4 第三方过错免责
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}在任何情况下，对于用户使用平台服务过程中涉及由第三方提供相关服务的责任应由该第三方承担，平台不承担责任，该等情形包括但不限于：
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}1)因银行、支付机构等第三方未按照您和/或平台的指令进行操作引起的任何损失或责任；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}2)因银行、支付机构等第三方原因导致资金未能及时到账或未能到账引起的任何损失或责任；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}3)因银行、支付机构等第三方对交易限额或次数等方面的限制而引起的任何损失或责任；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}4)因其他第三方的行为或原因导致的任何损失或责任。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>7.5 用户过错免责
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}因用户自身的原因导致的任何损失或责任，由用户自行负责，平台不承担责任，该等情形包括但不限于：
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}1)用户未按照本协议或平台不时公布的任何规则进行操作导致的任何损失或责任；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}2) 因用户使用的银行卡的原因导致的损失或责任，包括用户使用未经认证的银行卡或使用非用户本人的银行卡或使用信用卡，用户的银行卡被冻结、挂失等导致的任何损失或责任；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}3)用户向平台发送的指令信息不明确、或存在歧义、不完整等导致的任何损失或责任；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}4)因用户的决策失误、操作不当、遗忘或泄露注册手机号和验证码、注册手机号和验证码被他人破解、用户使用的计算机系统被第三方侵入、用户委托他人代理交易时他人恶意或不当操作而造成的损失；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}5)其他因用户的原因导致的任何损失或责任。
                    </Text>
                    <Text style={styles.main_1} allowFontScaling={false}>第八章 隐私保护及授权条款
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>8.1 信息保护及披露
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}平台采用行业标准惯例以保护用户的资料。用户因履行本协议向平台提供的个人信息，未经用户同意，平台不会出售或免费共享给第三方，但以下情况除外：
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}1)提供独立服务且仅要求服务相关的必要信息的供应商，如印刷厂、邮递公司等；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}2)具有合法调阅信息权限并从合法渠道调阅信息的政府部门或其他机构，如公安机关、法院；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}3)受让平台相关权利义务的实体；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}4)经用户或用户授权代表同意的第三方；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}5)本协议约定的其他情况。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>8.2 数据库分析利用
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}在不透露用户的隐私资料的前提下，平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>8.3 用户授权
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}用户同意平台使用关于用户的相关资料(包括但不限于平台持有的有关用户的档案中的资料、平台从用户目前及以前在平台上的活动所获取的其他资料以及平台通过其他方式自行收集的资料)以解决争议、对纠纷进行调停。
                    </Text>
                    <Text style={styles.main_1} allowFontScaling={false}>第九章 知识产权保护
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>9.1 保护范围
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}平台上的所有内容，包括但不限于著作、图片、档案、资讯、资料、平台架构、平台画面的安排、网页设计，均由平台或其他权利人依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>9.2 保护要求
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}非经平台方或其他权利人书面同意，用户不得：
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}1)擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表平台程序或内容；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}2)下载(除了页面缓存)或修改平台或其任何部分；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}3)以任何商业目的对平台或其任何部分进行复制、复印、仿造、出售、转售、访问、或以其他方式加以利用。
                    </Text>
                    <Text style={styles.main_1} allowFontScaling={false}>第十章 通知
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>10.1 通知方式
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}平台可通过平台公告、电子邮件、手机短信、无线通讯装置等电子方式或常规的信件传递等方式进行本协议项下的通知。您的通讯地址和联系方式为用户在平台上所登记之最新的联系方式。用户应在平台上维持并更新您的通讯地址和联系方式，确保其为真实、最新、有效及完整。若用户提供任何错误、虚假、过时或不完整的通讯地址和联系方式，由此产生的任何直接或间接的任何支出或损失由用户自行承担。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>10.2 通知送达
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}下列情形视为通知送达：
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\n'}{'\t'}1)通过平台公告、电子邮件、手机短信、无线通讯装置等电子方式进行本协议项下的通知，该等通知于通过远薪平台发送之日为有效送达；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}2)专人递送的通知，在专人递送之交付日为有效送达；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>3)以挂号信(付清邮资)发出的通知，在寄出(以邮戳为凭)后的第4日为有效送达；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}4)以特快专递(付清邮资)发出的通知，在寄出(以邮戳为凭)后的第3日为有效送达；
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}5)以传真发出的通知，在传真发出时视为送达。
                    </Text>
                    <Text style={styles.main_1} allowFontScaling={false}>第十一章 杂项条款
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>11.1 平台规则
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}本协议内容包括但不限于协议正文条款及平台已经发布的或将来可能发布的各类规则，所有条款和规则为协议不可分割的一部分，与协议正文具有同等法律效力。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>11.2 保密
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}未经另一方事先书面同意，任何一方不得将与本协议以及本协议项下交易和涉及另一方的任何信息向任何人士披露，但平台因业务需要所享有的信息知情权除外。本条不限制当事方根据适用法律、法规和有权机关的要求，就与本协议项下交易有关信息进行披露。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>11.3 部分无效
                    </Text>
                    <Text style={styles.main_2} allowFontScaling={false}>{'\t'}本协议的任何规定在任何司法管辖地是或成为不合法、无效或不可执行不应影响其他规定的合法性、有效性或可执行性，且任何规定在任何司法管辖地是或成为不合法、无效或不可执行不应影响该规定在任何其他司法管辖地的合法性、有效性或可执行性。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>11.4 不可抗力
                    </Text>
                    <Text style={styles.main_2}	allowFontScaling={false}>{'\t'}本协议任一方因不可抗力的发生而未能履行或延迟履行本协议，但已经采取适当措施避免损失扩大，及时通知相对方，并在不可抗力发生后15个工作日内向本协议其他方提供事故详情和有效证明，则该未能履行或延迟履行其义务的一方将不承担本协议项下的违约责任。不可抗力发生后，协议各方应通过友好协商，尽最大可能继续执行本协议。
                    </Text>
                    <Text style={styles.main_11}	allowFontScaling={false}>11.5 法律适用
                    </Text>
                    <Text style={styles.main_2}	allowFontScaling={false}>{'\t'}本协议的订立、效力、解释、履行及争议的解决均适用中华人民共和国法律。
                    </Text>
                    <Text style={styles.main_11}	allowFontScaling={false}>11.6 争议解决
                    </Text>
                    <Text style={styles.main_2}	allowFontScaling={false}>{'\t'}凡由本协议引起的或与本协议有关的争议和纠纷，各方应优先协商解决。不能协商或协商不能达成一致的，任何一方均应向北京我家众创电子商务有限公司住所地人民法院起诉。如法律对管辖权有特别规定的，依照法律规定选择管辖法院。
                    </Text>
                    <Text style={styles.main_2}	allowFontScaling={false}>{'\n'}{'\t'}用户在此同意并授权平台采用包括但不限于协商、仲裁或诉讼等方式，以其名义并代表其处理其在使用平台服务过程中与第三方(如商家等)之间产生的任何争议和纠纷，但该等授权并不会导致用户原有权利的灭失。
                    </Text>
                    <Text style={styles.main_11} allowFontScaling={false}>11.7 备案
                    </Text>
                    <Text style={styles.main_2}	allowFontScaling={false}>{'\t'}本协议已经平台备案，协议内容以经备案的协议版本为准,平台对本协议内容具有最终解释权。
                    </Text>
                    <View style={{height:50}}></View>
                </ScrollView>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        height: Dimensions.get('window').height - 64
    },
    main_1:{
        fontSize:13,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:15,
        marginBottom:15,

    },
    main_11:{
        fontSize:13,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:10,
    },
    main_2:{
        fontSize:11,

    }
});
module.exports = RegisterAgreement;