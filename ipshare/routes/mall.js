var router = require('express').Router();
var OAuth = require('wechat-oauth');
var client = new OAuth('wx70e60ce8ecb61f2d','d60ac20a0730da51aa0ffe7d0241b63c');
var request = require('request');

function isphone(agent)
{
  if(/AppleWebKit.*Mobile/i.test(agent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(agent)))
    return true;
  else
    return false;
}

router.use('/index', function(req, res) {

  if(req.headers['user-agent'].indexOf('MicroMessenger')!=-1)
  {
    var rurl= client.getAuthorizeURL('http://ipshare.leanapp.cn/mall/getopenid', '123', 'snsapi_base');
    res.redirect(rurl);
  }else if(isphone(req.headers['user-agent'])){
    res.render('index_m', {
      currentTime: new Date(),
      myname:'longxing'
    });
  }else{
    res.render('index', {
      currentTime: new Date(),
      myname:'longxing'
    });
  }

});

router.use('/getopenid', function(req, res) {
  if(req.query.code)
  {
    client.getAccessToken(req.query.code, function (err, result) {
        //var accessToken = result.data.access_token;
        var openid= result.data.openid;
        console.log('openid:'+openid);
        res.render('index_m', {
          currentTime: new Date(),
          myname:'longxing',
          openid:openid
        });
    });
  }

});


router.use('/shop', function(req, res) {
  if(isphone(req.headers['user-agent'])){
    res.render('shop_m', {
      currentTime: new Date(),
      myname:'longxing'
    });
  }
  else {
    res.render('shop', {
      currentTime: new Date(),
      myname:'longxing'
    });
  }
});

router.use('/code', function(req, res) {
  if(isphone(req.headers['user-agent'])){
    res.render('code_m', {
      currentTime: new Date(),
      myname:'longxing'
    });
  }
  else {
    res.render('code', {
      currentTime: new Date(),
      myname:'longxing'
    });
  }
});

router.use('/agreement', function(req, res) {
  res.render('agreement', {
    currentTime: new Date(),
    myname:'longxing'
  });
});
router.use('/product', function(req, res) {
  res.render('product', {
    currentTime: new Date(),
    myname:'longxing'
  });
});
router.use('/privacy', function(req, res) {
  res.render('privacy', {
    currentTime: new Date(),
    myname:'longxing'
  });
});
router.use('/order', function(req, res) {
  res.render('order', {
    currentTime: new Date(),
    myname:'longxing'
  });
});
router.use('/mlogin', function(req, res) {
  res.render('login_m', {
    currentTime: new Date(),
    myname:'longxing'
  });
});
router.use('/mreg', function(req, res) {
  res.render('reg_m', {
    currentTime: new Date(),
    myname:'longxing'
  });
});

module.exports = router;
