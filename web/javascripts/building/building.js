var YU = YAHOO.util;
YU.Event.onDOMReady((building=new Building()).init,building,true);

//*********************************************

function Building(){

    GlobalFunc.call(this);

    this.playerid = "id";

    this.url = this.Gbuildingurl;
    this.connect = null;

    this.playerHtml = null;
    this.rooms = new Array();
    this.selectedroom = null;
    this.glassDiv = new glassDiv();
    this.exit = new exitBuilding(this);

    this.connection = false;

    this.tryConnectionTimes = 0; //counter for try times

    this.init = function(){
        this.playerHtml = YU.Dom.get(this.playerid);
        this.setRooms();
        this.initState();
        this.exit.init();
        this.setWindowEvent();
    //YU.Event.on(window, 'unload', this.abortConnect, this, true);
    }

    this.initState = function(){
        var roomid = this.getGlobalCurrentRoomId();
        if(roomid != -1){
            this.rooms[roomid].initState();
        }else{
            this.longpoll();
        }
    }

    this.setRooms = function(){
        var i = 0,r;
        while(true){
            r = new Room(i, this);
            if(r.getHtml() != null){
                this.rooms[i] = r;
                this.rooms[i].setEvent();
            }else{
                break;
            }
            i++;
        }
    }

    this.displayGlassDiv = function(h){
        this.glassDiv.display(h);
    }
    
    this.hideGlassDiv = function(){
        this.glassDiv.hide();
    }

    this.getSelectedRoom = function(){
        return this.selectedroom;
    }

    this.getRoom = function(id){
        return this.rooms[id];
    }

    this.setSelectedRoom = function(sr){
        this.selectedroom = sr;
    }

    this.setPlayersHtmls = function(){
        try {
            var roomsid = this.getGlobalRoomsPlayers();
            var i = 0;
            while(i < this.rooms.length){
                this.rooms[i].setPlayerHtml(roomsid[i]);
                i++;
            }
        }
        catch (e) {
            alert("Invalid room player data");
        }
    }

    this.resetSelectedRoom = function(){
        if(this.selectedroom != null){
            this.selectedroom.setEvent();
            this.selectedroom.recover();
        }
    }

    this.postExitBuilding = function(){
        if(this.connection == true){
            var para = "?exit=true";
            YU.Connect.asyncRequest('POST', this.url + para, new exitPostCallBack(this));
        }else{
            setTimeout(this.postLastStep(),100);
        }
    }

    function exitPostCallBack(xitar){
        this.xitar = xitar;
        this.timeout = 6000;

        this.success = function(ob){}

        this.failure = function(ob){
            alert("Can't connect to server for exit the building in POST request.");
        }
    }

    this.longpoll = function(){
        this.createConnect('GET', this.url, new pollingCallBack(this)); //new pollingCallBack(this)
    }

    function pollingCallBack(building){
        this.building = building;
        
            timeout: this.building.GlobalAjaxTimeOut;   //a little larger then in server comet reponse timeout

        this.success = function(ob){
            this.building.setConnection(false);
            GlobalBuildingTryConnectionTimes = 0;
            
            var st = ob.responseText;
            if(st != ""){
                if(st != "error"){
                    if(st != "i"){
                        globalInit.setGlobalInitValue(st);
                        this.building.setPlayersHtmls();
                        this.building.hideGlassDiv();
                    }
                    this.building.longpoll();
                }else{
                    this.building.refreshWindow();
                }
            }
        };

        this.failure = function(ob){
            if(this.building.tryConnectionTimes <= this.building.GconnectionTryTimes){
                this.building.tryConnectionTimes++;
                this.building.longpoll();
            }else{
                alert("Can't connect to server for building state.");
            }
        }
    }

    function exitBuilding(xitar){
        this.xitar = xitar;
        this.html = null;

        this.init = function(){
            this.html = YU.Dom.get(this.xitar.Gexitdiv);

            YU.Event.on(this.html, 'click', this.onClick, this, true);

        }

        this.onClick = function(){
            this.xitar.postExitBuilding();
        }
    }
}

function Room(id, building){

    GlobalFunc.call(this);

    this.id = id;
    this.building = building;
    this.idname = "room";
    this.url = this.Groomurl + "/" + this.id;

    this.html = YU.Dom.get(this.idname + this.id);
    this.num = new RoomNum(this.id, this);
    this.player = new Player(this.id, this);
    this.desks = new Array();

    this.initState = function(){
        this.setDesks();
        this.mouseOver();
        this.setClickState();

        var posi = this.playerInDesk();
        if(posi != -1){
            this.desks[posi].initState();
        }else{
            this.longpoll();
        }
    }
    
    this.getId = function(){
        return this.id;
    }

    this.getBuilding = function(){
        return this.building;
    }

    this.getDesk = function(id){
        return this.desks[id];
    }

    this.setEvent = function(){
        YU.Event.on(this.html, 'mouseover', this.mouseOver, this, true);
        YU.Event.on(this.html, 'mouseout', this.mouseOut, this, true);
        YU.Event.on(this.html, 'click', this.mouseClick, this, true);
    }

    this.removeEvent = function(){
        YU.Event.removeListener(this.html, 'mouseover', this.mouseOver);
        YU.Event.removeListener(this.html, 'mouseout', this.mouseOut);
        YU.Event.removeListener(this.html, 'click', this.mouseClick);
    }

    this.mouseOver = function(ev){
        this.player.mouseOver();
        this.num.mouseOver();
    }

    this.mouseOut = function(ev){
        this.player.mouseOut();
        this.num.mouseOut();
    }

    this.mouseClick = function(ev){
        this.building.displayGlassDiv(this.html);
        this.setClickState();
        this.longpoll();
    }

    this.recover = function(){
        this.player.recover();
        this.num.recover();
    }

    this.setClickState = function(){
        this.removeEvent();

        this.player.mouseClick();
        this.num.mouseClick();

        this.building.resetSelectedRoom();
        this.building.setSelectedRoom(this);
    }

    this.setPlayerHtml = function(id){
        this.player.setHtml(id);
    }

    this.setDesks = function(){
        var desksHtml = YU.Dom.get(this.Gdeskid);
        YU.Dom.setStyle(desksHtml, 'visibility', 'visible');
        var ds = this.getGlobalDesks();

        var deskHtml = "";
        for(var i = 0; i < ds.length; i++){
            deskHtml = deskHtml + "<div id=\"desk" + i + "\" class=\"desk\"><div id=\"" + i + "c1\" class=\"chair\"></div><div id=\"table" + i + "\" class=\"table\"><div><div>" + (i + 1) +"</div></div></div><div id=\"" + i + "c2\" class=\"chair\" ></div></div>"
        }
        desksHtml.innerHTML = deskHtml + "<div style=\"clear:both\" />";

        for(i = 0; i < ds.length; i++){
            this.desks[i] = new Desk(i, ds[i],this);
            this.desks[i].init();
        }

    }
    
    this.longpoll = function(){
        this.building.createConnect('GET', this.url, new pollingCallBack(this));
    }

    function pollingCallBack(room){
        this.room = room;

            timeout: this.room.GlobalAjaxTimeOut;   //a little larger then in server comet reponse timeout

        this.success = function(ob){
            this.room.getBuilding().setConnection(false);
            GlobalBuildingTryConnectionTimes = 0;

            var st = ob.responseText;
            if(st != ""){
                if(st != "error"){
                    if(st != "i"){
                        globalInit.setGlobalInitValue(st);
                        this.room.building.setPlayersHtmls();
                        this.room.deleteConfirmHtml();
                        this.room.setDesks();
                        this.room.building.hideGlassDiv();
                    }
                    this.room.longpoll();
                }else{
                    this.room.building.refreshWindow();
                }
            }
        }

        this.failure = function(ob){
            if(this.room.getBuilding().tryConnectionTimes <= this.room.GconnectionTryTimes){
                this.room.getBuilding().tryConnectionTimes++;
                this.room.longpoll();
            }else{
                alert("Can't connect to server for room state.");
            }
        }
    }

    //this.setEvent();  //must placed after all other event function

    function RoomNum(id, room){

        this.id = id;
        this.room = room;
        this.idname = "room_num";
        this.html = YU.Dom.get(this.idname + this.id);
        this.origclass = "room_num";
        this.overclass = "room_num_over";
        this.clickclass = "room_num_click";

        this.mouseOver = function(){
            YU.Dom.addClass(this.html, this.overclass);
        }

        this.mouseOut = function(){
            YU.Dom.removeClass(this.html, this.overclass);
            YU.Dom.addClass(this.html, this.origclass);
        }

        this.mouseClick = function(){
            YU.Dom.addClass(this.html, this.clickclass);
        }

        this.recover = function(){
            YU.Dom.removeClass(this.html, this.overclass);
            YU.Dom.removeClass(this.html, this.clickclass);
            YU.Dom.addClass(this.html, this.origclass);
        }

        this.setHtml = function(id){
            this.html.innerHTML = id;
        }
    }

    function Player(id, room){
        RoomNum.call(this);

        this.id = id;
        this.room = room;
        this.idname = "players";
        this.html = YU.Dom.get(this.idname + this.id);
        this.origclass = "players";
        this.overclass = "players_over";
        this.clickclass = "players_click";
    }
}

function Desk(id, players, room){
    GlobalFunc.call(this);

    this.id = id;
    this.players = players;
    this.room = room;
    this.url = this.Gdeskurl + "/" + this.room.getId()  + "d" + this.id;

    this.idname = "desk";

    this.html = YU.Dom.get(this.idname + this.id);
    this.childrenHtml = YU.Dom.getChildren(this.html);

    this.chair1 = null;
    this.chair2 = null;
    this.confirm = null;
    this.table = new Table(this);

    this.origclass = "desk";
    this.overclass = "desk_over";
    this.unclickclass = "desk_unclick";

    this.init = function(){
        var pid = this.getGlobalPlayerId();

        if(this.players[0] == pid){
            this.chair1 = new Chair(0, this.players[1], this);
            this.chair2 = new Chair(2, this.players[0], this);
            if((this.players[0] != -1) && (this.players[1] != -1)){
                this.confirm = new Confirm(this);
                this.confirm.init();
            }
        }else{
            this.chair1 = new Chair(0, this.players[0], this);
            this.chair2 = new Chair(2, this.players[1], this);
        }

        this.setEvent();
    }

    this.initState = function(){
        this.longpoll();
    }

    this.setEvent = function(){
        var playerid = this.chair2.getPlayerId();
        if(playerid == -1){
            YU.Event.on(this.html, 'mouseover', this.mouseOver, this, true);
            YU.Event.on(this.html, 'mouseout', this.mouseOut, this, true);
            YU.Event.on(this.html, 'click', this.mouseClick, this, true);
        }else{
            YU.Dom.addClass(this.html, this.unclickclass);
            this.chair1.setUnclickState();
            this.chair2.setUnclickState();
        }
    }

    this.mouseOver = function(){
        YU.Dom.addClass(this.html, this.overclass);
        this.chair1.mouseOver(0);
        this.chair2.mouseOver(1);
    }

    this.mouseOut = function(){
        YU.Dom.removeClass(this.html, this.overclass);
        this.chair1.mouseOut(0);
        this.chair2.mouseOut(1);
    }

    this.mouseClick = function(ev){
        this.room.getBuilding().displayGlassDiv(this.html);
        this.longpoll();
    }

    this.getId = function(){
        return this.id;
    }

    this.getPlayers = function(){
        return this.players;
    }

    this.getRoom = function(){
        return this.room;
    }

    this.getChair1 = function(){
        return this.chair1;
    }

    this.getTable = function(){
        return this.table;
    }

    this.recover = function(){
        YU.Dom.removeClass(this.html, this.overclass);
        YU.Dom.removeClass(this.html, this.clickclass);
        YU.Dom.addClass(this.html, this.origclass);
    }

    this.confirmUser = function(confirm){
        var para = "?confirmuser=" + confirm;
        this.connect(para);
    }

    this.connect = function(para){
        if(this.room.getBuilding().connection == true){
            YU.Connect.asyncRequest('POST', this.url + para, new postCallBack(this));
        }else{
            setTimeout(this.connect(),100);
        }
    }

    function postCallBack(desk){
        this.desk = desk;

            timeout: this.GlobalAjaxTimeOut;   //a little larger then in server comet reponse timeout

        this.success = function(ob){}

        this.failure = function(ob){
            alert("Can't connect to server for desk state in POST request.");
        }
    }

    this.longpoll = function(){
        this.room.getBuilding().createConnect('GET', this.url, new pollingCallBack(this));
    }

    function pollingCallBack(desk){
        this.desk = desk;

            timeout: this.desk.GlobalAjaxTimeOut;   //a little larger then in server comet reponse timeout

        this.success = function(ob){
            GlobalConnectedState = false;
            GlobalBuildingTryConnectionTimes = 0

            var st = ob.responseText;
            if(st != ""){
                if((st != "error") && (st != "refresh")){
                    if(st != "i"){
                        globalInit.setGlobalInitValue(st);
                        var r = this.desk.getRoom();
                        r.getBuilding().setPlayersHtmls();
                        r.deleteConfirmHtml();
                        r.setDesks();
                        r.getBuilding().hideGlassDiv();
                    }
                    var posi = this.desk.playerInDesk();
                    if(posi != -1){
                        this.desk.longpoll();
                    }else{
                        this.desk.getRoom().longpoll();
                    }
                }else{
                    this.desk.getRoom().getBuilding().refreshWindow();
                }
            }
        }

        this.failure = function(ob){
            if(this.desk.getRoom().getBuilding().tryConnectionTimes <= this.desk.GlobalBuildingTryConnectionTimes){
                this.desk.getRoom().getBuilding().tryConnectionTimes++;
                this.desk.getRoom().longpoll();
            }else{
                alert("Can't connect to server for desk state.");
            }
        }
    }

    function Chair(id, playerid, desk){
        GlobalFunc.call(this);

        this.id = id;
        this.desk = desk;
        this.playerId = playerid;

        this.html = this.desk.childrenHtml[this.id];
        if(this.playerId != -1){
            this.html.innerHTML = this.playerId;
        }
        
        this.origclass = "chair";
        this.selectmyclass = "chair_selectMy";
        this.selectotherclass = "chair_selectOther";
        this.unselectotherclass = "chair_unselectOther";

        this.getPlayerId = function(){
            return this.playerId;
        }

        this.setSelectedState = function(side){
            if(side == "my"){
                YU.Dom.addClass(this.html, this.selectmyclass);
            }
            if(side == "other"){
                YU.Dom.addClass(this.html, this.selectotherclass);
            }
        }

        this.setUnclickState = function(){
            if(this.playerId != this.getGlobalPlayerId()){
                YU.Dom.addClass(this.html, this.unselectotherclass);
            }
        }

        this.mouseOver = function(id){
            if(id == 0){
                this.setUnclickState();
            }
            if(id == 1){
                YU.Dom.addClass(this.html, this.selectmyclass);
            }
        }

        this.mouseOut = function(id){
            if(id == 0){
                YU.Dom.removeClass(this.html, this.unselectotherclass);
            }
            if(id == 1){
                YU.Dom.removeClass(this.html, this.selectmyclass);
            }
            
        }

        if(this.id == 2){
            if(this.playerId == -1){
            //this.setEvent();  //must placed after all other event function
            }else{
                if(this.playerId == this.getPlayerId()){
                    this.setSelectedState("my");
                }else{
                    this.setSelectedState("other");
                }
            }
        }else{
            if(this.playerId != -1){
                this.setSelectedState("other");
            }
        }
    }

    function Table(desk){
        GlobalFunc.call(this);
        
        this.desk = desk;

        this.html = this.desk.childrenHtml[1];

        this.origclass = "table";
        this.overclass = "table_over";
    }

    function Confirm(desk){
        GlobalFunc.call(this);

        this.id = this.Gconfirmid;
        this.desk = desk;

        this.origclass = "confirm";
        this.overclass = "confirm_over";

        this.html = null;
        this.agree = null;
        this.disagree = null;

        this.init = function(){
            this.setHtml();
            this.agree = new Agree(this);
            this.disagree = new Disagree(this);
            this.agree.init();
            this.disagree.init();
        }

        this.getDesk = function(){
            return this.desk;
        }

        this.setHtml = function(){
            if(this.inDocument(this.id)){
                alert(this.id + " div already exist! - Confirm");
            }
            try {
                var elp = document.createElement('<div id="' + this.id + '"></div>');
            }
            catch (e) {
                elp = document.createElement("div");
                elp.setAttribute("id", this.id);
            }

            this.html = elp;

            YU.Dom.getElementsBy(function(el){
                return true;
            },"body")[0].appendChild(elp);

            var thtml = this.desk.getTable().getHtml();
            YU.Dom.setXY(elp, YU.Dom.getXY(thtml));
            YU.Dom.setStyle(elp, "width", YU.Dom.getStyle(thtml, "width"));
        }

        function Agree(confirm){
            GlobalFunc.call(this);
        
            this.confirm = confirm;
            this.confirmState = this.Gyes;

            this.id = this.Gagreeid;
            this.html = null;

            this.origclass = "agree";
            this.overclass = "agree_over";

            this.init = function(){
                this.setHtml();
                this.setEvent();
            }

            this.setHtml = function(){
                if(this.inDocument(this.id)){
                    alert(this.id + " div already exist! - Confirm");
                }
                try {
                    var elp = document.createElement('<div id="' + this.id + '" class="' + this.id + '"></div>');
                }
                catch (e) {
                    elp = document.createElement("div");
                    elp.setAttribute("id", this.id);
                    elp.setAttribute("class", this.id);
                }
                this.confirm.getHtml().appendChild(elp);
                this.html = elp;
            }

            this.setEvent = function(){
                YU.Event.on(this.html, 'mouseover', this.mouseOver, this, true);
                YU.Event.on(this.html, 'mouseout', this.mouseOut, this, true);
                YU.Event.on(this.html, 'click', this.mouseClick, this, true);
            }

            this.mouseOver = function(ev){
                YU.Dom.addClass(this.html, this.overclass);
            }

            this.mouseOut = function(ev){
                YU.Dom.removeClass(this.html, this.overclass);
            }

            this.mouseClick = function(ev){
                this.confirm.getDesk().getRoom().getBuilding().displayGlassDiv(this.html);
                this.confirm.getDesk().confirmUser(this.confirmState);
            }
        }

        function Disagree(confirm){
            Agree.call(this);

            this.confirm = confirm;
            this.confirmState = this.Gno;
            this.id = this.Gdisagreeid;
            this.html = null;

            this.origclass = "disagree";
            this.overclass = "disagree_over";
            
        }
    }
}