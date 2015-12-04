Meteor.methods({
  multiSendMessage: function(list, content) {
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
        "msgtype": "text",
        "text": {
          "content": user.profile.nickname + "同学，" + content
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
  multiSendNews: function(list, content) {
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
              "description": content.description,
              "url": content.url,
              "picurl": content.picurl
            },
            // {
            //   "title":"Happy Day",
            //   "description":"Is Really A Happy Day",
            //   "url":"URL",
            //   "picurl":"PIC_URL"
            // }
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
