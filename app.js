

var VK = require('vksdk');
var http = require('http');

var vk = new VK({
  'appId'     : 5521121,
  'appSecret' : 'HMZ5oqScKVBd73vC7tDM',
  'language'  : 'ru'
});



// Setup server access token for server API methods


var access_token = '19f8e44c6acd767ef14d0842e55c34bf1c80b4b7542ee581e234a9dc78bfc46b72fd893919f5e6f39361a';
vk.setToken(access_token);

// Turn on requests with access tokens
vk.setSecureRequests(true);



var test_get = {};

vk.request('messages.getLongPollServer', {'use_ssl': 0, 'need_pts': 0}, function(_o) {
  console.log("vk.request: messages.get \n");
  console.log(_o);
  test_get = _o;
  httpRequest(test_get);


});

function httpRequest(test_get) {

  var server = test_get.response.server;


  slash = server.indexOf("/");
  input_host = server.substring(0, slash);
  input_patch = server.substring(slash);

  console.log(slash);
  console.log(input_host);
  console.log(input_patch);

  var options = {
    host: input_host,
    path: input_patch+'?act=a_check&key={'+ test_get.response.key + '}&ts={' + test_get.response.ts + '}&wait=25&mode=2'
    //test_get.response.server+'?act=a_check&key={' + test_get.response.key + '}&ts={' + test_get.response.ts + '}&wait=25&mode=2'
  };


  http.request(options, callback).end();

};

function callback(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

