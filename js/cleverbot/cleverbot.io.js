if (!window.jQuery) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
}
const cleverbotIO = function (user, key) {
    this.base_url = "https://cleverbot.io/1.0/";
    this.user = user;
    this.key = key;
	this.setNick = function (nick) {
		this.nick = nick;
	}
    this.create = function (callback) {
        $.post(this.base_url + "create", {
            user: this.user,
            key: this.key,
            nick: this.nick
        }, function (data) {
            if (typeof data != "object") {
                data = JSON.parse(data);
            }
            
            if (data.status == "success") {
                this.nick = data.nick;
                callback(false, this.nick);
            }
            if (data.status == "Error: reference name already exists") {
                callback(false, this.nick);
            }
            else {
                console.log(data.status);
                callback(true, data.status);
            }
        });
    }
    this.ask = function (input, callback) {
        $.post(this.base_url + "ask", {
            user: this.user,
            key: this.key,
            nick: this.nick,
            text: input
        }, function (data) {
            if (typeof data != "object") {
                data = JSON.parse(data);
            }
            if (data.status == "success") {
                callback(false, data.response);
            }
            else {
                console.log(data.status);
                callback(true, data.status);
            }
        });
    }

}
if (typeof cleverbot == "undefined") {
    var cleverbot = cleverbotIO;
}
