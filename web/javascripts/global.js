function GlobalFunc(){ //global required function

    this.Gjsurl    = "javascripts/";
    this.GYUIdir   = this.Gjsurl + "yui/";
    this.Gcssurl   = "css/";
    this.Gimagedir = "image/";

    this.Gcontexturl = "/xitar";
    this.Gloginurl   = this.Gcontexturl + "/login";
    this.Gbuildingurl   = this.Gcontexturl + "/building";
    this.Groomurl   = this.Gcontexturl + "/room";
    this.Gdeskurl   = this.Gcontexturl + "/desk";
    this.Gxitarurl   = this.Gcontexturl + "/xitar";

    this.GblackXitar = 0;
    this.GwhiteXitar = 1;

    this.Gyes = 1;
    this.Gno = 0;

    this.GlobalAjaxTimeOut = 33000;
    this.Gdeskid   = "desks";
    this.Gdeskhtml   = YU.Dom.get(this.Gdeskid);
    this.Gconfirmid   = "confirm";
    this.Gagreeid = "agree";
    this.Gdisagreeid = "disagree";

    this.Gplayer1div = "player1";
    this.Gplayer2div = "player2";
    this.Gwaitdiv = "wait";
    this.Gexitdiv = "exit";
    this.Gxitardiv = "nm114_xitar";

    this.GconnectionTryTimes = 5; //the times og try to connect with server;

    //yui functions for simple use
    this.getStyle = function(el,property){
        return YU.Dom.getStyle(el, property);
    }

    this.setStyle = function(el,property,value){
        YU.Dom.setStyle(el, property, value);
    }

    this.getXY = function(el){
        return YU.Dom.getXY(el);
    }

    this.setXY = function(origin, pos){
        YU.Dom.setXY(origin, pos);
    }

    //Common function
    this.getGlobalPlayerId = function(){
        return globalInitValue.playerid;
    }

    this.getGlobalCurrentRoomId = function(){
        return globalInitValue.currentroomid;
    }

    this.getGlobalRoomsPlayers = function(){
        return globalInitValue.roomsplayers;
    }

    this.getGlobalDesks = function(){
        return globalInitValue.desks;
    }

    this.getGlobalPlayers = function(){
        return globalInitValue.players;
    }

    this.getHtml = function(){
        return this.html;
    }

    this.setConnection = function(state){ //Boolean value
        this.connection = state;
    }

    this.refreshWindow = function(){
        window.location.reload();
    }
    
    this.inDocument = function(tid){ //tid = element id
        return YU.Dom.inDocument(tid);
    }

    this.deleteConfirmHtml = function(){
        var chtml = YU.Dom.get(this.Gconfirmid);
        if(chtml != null){
            YU.Dom.getAncestorBy(chtml).removeChild(chtml);
        }
    }

    this.playerInDesk = function(){
        var pos = -1;
        var desks = this.getGlobalDesks();
        var x,y,z;
        for(x in desks){
            y = desks[x];
            for(z in y){
                if(y[z] == this.getGlobalPlayerId()){
                    pos = x;
                }
            }
        }
        return pos;
    }

    this.isFirstPlayer = function(){
        var playerid = this.getGlobalPlayerId();
        var players = this.getGlobalPlayers();
        if(playerid == players[0]){
            return true;
        }
        return false;
    }

    this.createConnect = function(get, url, callback){
        this.abortConnect();
        this.connect = YU.Connect.asyncRequest(get, url + '?count=' +  + (new Date().getTime()), callback);
        this.setConnection(true);
    }

    this.abortConnect = function(){
        if(YU.Connect.isCallInProgress(this.connect)){
            YU.Connect.abort(this.connect);
        }

        this.connect = null;
        this.setConnection(false);
    }

    this.setWindowEvent = function(){
        YU.Event.on(window, 'unload', this.abortConnect, this, true);
    }
};

function globalInitFunc(){ //global init function
    this.setGlobalInitValue = function(val){
        globalInitValue = YAHOO.lang.JSON.parse(val);
    }

    this.setGlobalPostValue = function(val){
        var tval = YAHOO.lang.JSON.parse(val);
        if(tval.laststep != undefined){
            globalInitValue.laststep = tval.laststep;
        }
    }
};

function glassDiv(){ //hover on some page elements
    GlobalFunc.call(this);

    this.html = null;

    this.display = function(htmlt){
        if(this.html == null){
            //var w = parseInt(this.getStyle(YU.Dom.get("c1"),"width"), 10) * 8 + 9 + "px
            var h = YU.Dom.getDocumentHeight();
            var w = YU.Dom.getDocumentWidth();

            try {
                var elp = document.createElement('<div style="top:0;left:0;position:absolute;z-index:1000;cursor:wait;width:' + w + ';height:' + h + ';"></div>');
            }
            catch (e) {
                elp = document.createElement("div");
                elp.setAttribute("style", "top:0;left:0;position:absolute;z-index:1000;cursor:wait;width:" + w + ";height:" + h + ";");
            }
            this.html = elp;

            var node = YU.Dom.getAncestorByTagName(htmlt, "body");
            node = YU.Dom.getChildren(node);
            YU.Dom.insertBefore(elp,node[0]);

            this.setEvent();
        }else{
            this.setStyle(this.html, "display", "");
            this.setEvent();
        }
    }

    this.hide = function(){
        if(this.html !== null){
            this.setStyle(this.html, "display", "none");
            this.removeEvent();
        }
    }

    this.setEvent = function(){
        YU.Event.on(window, 'resize', this.windoResize, this, true);
        YU.Event.on(window, 'scroll', this.windowScroll, this, true);
    }

    this.removeEvent = function(){
        YU.Event.removeListener(window, 'resize', this.windoResize);
        YU.Event.removeListener(window, 'scroll', this.windowScroll);
    }

    this.windoResize = function(){
        var vh = YU.Dom.getViewportHeight();
        var st = YU.Dom.getDocumentScrollTop();
        YU.Dom.setStyle(this.html,"height", vh + st + 'px');
    }

    this.windowScroll = function(){
        var dh = YU.Dom.getDocumentHeight();
        YU.Dom.setStyle(this.html,"height", dh + 'px');

    }
};