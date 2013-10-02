var YU = YAHOO.util;
YU.Event.onDOMReady((login=new Login()).init,login,true);

//*********************************************

function Login(){

    GlobalFunc.call(this);

    this.loginUrl = this.Gloginurl;
    this.id = "login_input";
    this.passcode    = "passcode=";
    this.html = "";
    this.logincallback = new loginCallBack(this);

    this.init = function(){
        this.html = YU.Dom.get(this.id);
        this.html.focus();
        this.setEvent();
    }

    this.setEvent = function(){
        YU.Event.on(this.html, 'keyup', this.inputKeyUp, this, true);
    }

    this.inputKeyUp = function(key){
        var kcode = YU.Event.getCharCode(key);
        if((kcode == 13)){
            var value = this.html.value;
            if((value != null) && (!isNaN(value))){
                YU.Connect.asyncRequest('POST', this.loginUrl, this.logincallback, this.passcode + value);
            }else{
                this.html.value = "";
            }
        }
    }

    function loginCallBack(login){
        this.login = login;

        this.timeout = 6000;

        this.success = function(ob){
            this.login.refreshWindow();
        }

        this.failure = function(ob){
            alert("Can't check the password in server.");
        }
    }
};