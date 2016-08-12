var router = require('express').Router();
var fs = require('fs');
var WechatAPI = require('wechat-api');
var gtoken;
var api = new WechatAPI('wx70e60ce8ecb61f2d', 'd60ac20a0730da51aa0ffe7d0241b63c', function (callback) {
  // 传入一个获取全局token的方法
//  fs.readFile('access_token.txt', 'utf8', function (err, txt) {
  //  if (err) {return callback(err);}
    callback(null, gtoken);
  //});
}, function (token, callback) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  gtoken=token;
  //fs.writeFile('access_token.txt', JSON.stringify(token), callback);
});

function sendtemplate(openid,tid)
{
  // URL置空，则在发送后,点击模板消息会进入一个空白页面（ios）, 或无法点击（android）
  var url='http://ipshare.leanapp.cn/';
  var data = {
   "first": {
     "value":"活动通知！",
     "color":"#173177"
   },
   "keyword1":{
     "value":"明天即开始",
     "color":"#173177"
   },
   "keyword2": {
     "value":"不用多说吧",
     "color":"#173177"
   },
   "keyword3": {
     "value":"老地方",
     "color":"#173177"
   },
   "keyword4": {
     "value":"2014年9月22日",
     "color":"#173177"
   },
   "remark":{
     "value":"欢迎再次！",
     "color":"#173177"
   }
};
console.log('sendTemplate Msg:『'+openid+'』');
api.sendTemplate(openid, tid, url, data, function(err,result){
  if(err)
    console.log('sendTemplate err:『'+err+'』');
  if(result)
    console.log('sendTemplate result:『'+result+'』');
});
}

router.use('/send', function(req, res) {
  if(req.query.openid)
    sendtemplate(req.query.openid,'1RNgk6YomCwzf45J9eME7v3YkG4VLnWr5Lr9dav1lrI');
    res.send('发送成功');
});

module.exports = router;
