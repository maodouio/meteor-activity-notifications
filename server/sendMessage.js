Meteor.methods({
  getActivityInfo: function(activityId){
    return Activities.findOne(activityId);
  },
  multiSendMessage: function(list, content) {
    var token = Meteor.call("accessToken");
    var url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + token;
      console.log('==================================userId_list>', list);

    _.map(list, function(userId) {
      console.log('==================================userId>', userId);
      var user = Meteor.users.findOne({_id: userId});
      var openid = "";
      if (user) {
        openid = user.openid;
      console.log('==================================openID>', openid);

      }
      console.log("====> sending Message to ", openid);
      var a = {
        "touser": openid,
        // "touser": "ogcWawd2oLZBkfxKtJ_5v0tVaH9Q",
        "msgtype": "text",
        "text": {
          // "content": user.profile.nickname + "同学，" + content
          "content": content
        }
      };
      console.log('==================================', a);
      HTTP.post(url, {
        data: a
      }, function(err, res) {
        if (err) {
          console.log("sendMessageToUser.error", err);
        }
        if (res) {
          console.log("sendMessageToUser.result", JSON.stringify(res, {
            indent: true
          }));
        }
      });
    });
  },
  multiSendNews: function(content) {
    // get all user list in database
    var list = [];
    var allUser = Meteor.users.find().fetch();
    _.map(allUser, function(e){
      if (e.profile.openid){
        list.push(e._id);
      }
    });

    var token = Meteor.call("accessToken");
    var url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + token;

    _.map(list, function(userId) {
      var user = Meteor.users.findOne({_id: userId});
      var openid = "";
      if (user) {
        openid = user.openid;
      }
      console.log("====> sending Message to ", openid);
      var a = {
        "touser": openid,
        "msgtype": "news",
        "news": {
          "articles": [
            {
              "title": content.title,
              "description": "",
              "url": content.url,
              "picurl": content.picurl
            },
            {
              "title":"时间：" + content.time + "\n地点：" + content.where + "\n",
              "description": "",
              "url": content.url,
              "picurl": ""
            }
          ]
        }
      };
      HTTP.post(url, {
        data: a
      }, function(err, res) {
        if (err) {
          console.log("sendMessageToUser.error", err);
        }
        if (res) {
          console.log("sendMessageToUser.result", JSON.stringify(res, {
            indent: true
          }));
        }
      });
    });
  },
});
