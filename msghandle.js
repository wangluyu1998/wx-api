const formatMsg = require('./fmtwxmsg');

function help(){
    //字符串形式返回帮助信息，也可以是以读取文件的形式来返回
    return '你好，这是一个测试号，目前会原样返回用户输入的内容'
}

/**
 * @param {object} wxmsg 解析xml消息的对象
 * @param {object} retmsg 要返回的数据对象
 */

function userMsg(wxmsg,retmsg){
    //关键字自动回复
    if(wxmsg.MsgType == 'text'){
        switch(wxmsg.Content){
            case '帮助':
            case 'help':
            case '?':
                retmsg.msg=help();
                retmsg.msgtype='text';
                return formatMsg(retmsg);
            case 'about':
                retmsg.msgtype='text';
                retmsg.msg='我是这个测试号的开发者，如有问题，请发送至邮箱123456789@qq.com';
                return formatMsg(retmsg);
            case 'who':
                retmsg.msgtype='text';
                retmsg.msg='开发者信息——\n姓名:王陆宇\n学号:2017011945\n班级:2017级6班';
                return formatMsg(retmsg);
            case 'hello':
            case '你好':
                retmsg.msgtype='text';
                retmsg.msg='你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
                return formatMsg(retmsg);
            default:
                retmsg.msgtype='text';
                retmsg.msg=wxmsg.Content;
                return formatMsg(retmsg);
        }
    }
    //处理其他类型的消息
    switch(wxmsg.MsgType){
        case 'image':
        case 'voice':
            retmsg.msgtype = wxmsg.MsgType;
            retmsg.msg = wxmsg.MediaId;
            return formatMsg(retmsg);
        default:
            //retmsg.msgtype类型为空
            //格式化数据会返回default处的数据
            //提示用户该类型不被支持
            return formatMsg(retmsg);
    }
}

exports.help = help;
exports.userMsg = userMsg;

function eventMsg(wxmsg,retmsg){
    //把返回消息的类型设置成text
    retmsg.msgtype = 'text';

    switch(wxmsg.Event){
        case 'subscribe':
            retmsg.msg = '你好，这是一个测试号，尽管没什么用，但还是感谢您关注！'
            return formatMsg(retmsg);
        case 'unsubscribe':
            console.log(wxmsg.FromUserName,"取消关注");
            break;
        case 'CLICK':
            retmsg.msg = wxmsg.EventKey;
            return formatMsg(retmsg);
        case 'VIEW':
            console.log('用户浏览',wxmsg.EventKey);
            break;
        default:
            return '';
    }
    return '';
}

//后续还会加入事件消息支持
exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    if(wxmsg.MsgType == 'event'){
        return eventMsg(wxmsg,retmsg);
    }
    return userMsg(wxmsg, retmsg);
};