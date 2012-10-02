var request = require("request"),
    logger = require("winston");

var twitch_url = "https://api.twitch.tv/kraken";

TwitchClient = function(config) {
  try {
    this.client_id = config.client_id;
    this.username = config.username;
    this.password = config.password;
    this.scope = config.scope;
    
  } catch(err) {
    logger.warn("Please remember to set your client_id!");
  }

  return this;
};

TwitchClient.prototype.auth = function authenticate() {
  var url = "https://api.twitch.tv/kraken/oauth2/token";

  logger.warn("Still being implemented");

  request.post({
    url: twitch_url + "/auth2/token",
    form: {
      client_id: this.client_id,
      username: this.username,
      password: this.password,
      scope: this.scope
    }
  }, function(err, response, body) {
    console.log(response.request);

  });
};

TwitchClient.prototype.games = function retrieveGames(params, callback) {
  if (!callback || typeof callback != 'function') return false;
  
  var self = this;
  
  request.get({
    url: twitch_url + "/games/top",
    qs: params
  }, function(err, response, body) {
    body = JSON.parse(body);
    var games = body.top;
    if (callback) callback.call(self, null, games, body);
  });
};

TwitchClient.prototype.channels = function retrieveChannels(params, callback) {
  if (!callback || typeof callback != 'function') return false;
  if (typeof params.channel == 'undefined' || !params.channel) return false;

  var self = this;

  request.get({
    url: twitch_url + "/channels/" + params.channel
  }, function(err, response, body) {
    body = JSON.parse(body);
    if (callback) callback.call(self, null, body);
  });
};

TwitchClient.prototype.users = function retrieveUserInformation(params, callback) {
  if (!callback || typeof callback != 'function') return false;
  if (typeof params.user == 'undefined' || !params.user) return false;

  var self = this;
  
  request.get({
    url: twitch_url + "/users/" + params.user
  }, function(err, response, body) {
    body = JSON.parse(body);
    if (callback) callback.call(self, null, body);
  });
};

module.exports = TwitchClient;
