var YU = YAHOO.util;
YU.Event.onDOMReady((nm=new NM114XitarDiv()).init,nm,true);

function NM114XitarDiv(){
    GlobalFunc.call(this);

    this.id = this.Gxitardiv;

    this.html = null;

    this.init = function(){
        if(YU.Dom.inDocument(YU.Dom.get(this.id))){
            alert("Wrong! already have xitar div with id " + this.id);
        }else{
            this.setHTML();
        }
    }

    this.setHTML = function(){ //must insert xitar div
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
        },"body")[0].appendChild(this.html);

        var board = '<table id="cpout"><tbody>' +
        '<tr>' +
        '<td><div id="m0"></div></td>' +
        '<td><div id="m1"></div></td>' +
        '<td><div id="m2"></div></td>' +
        '<td><div id="m3"></div></td>' +
        '<td><div id="m4"></div></td>' +
        '<td><div id="m5"></div></td>' +
        '<td><div id="m6"></div></td>' +
        '<td><div id="m7"></div></td>' +
        '<td><div id="m8"></div></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="num1"></td>' +
        '<td rowspan="8" colspan="8">' +
        '<table id="cpin" cellspacing="1">' +
        '<tbody>' +
        '<tr>' +
        '<td id="t56"></td>' +
        '<td id="t57"></td>' +
        '<td id="t58"></td>' +
        '<td id="t59"></td>' +
        '<td id="t60"></td>' +
        '<td id="t61"></td>' +
        '<td id="t62"></td>' +
        '<td id="t63"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="t48"></td>' +
        '<td id="t49"></td>' +
        '<td id="t50"></td>' +
        '<td id="t51"></td>' +
        '<td id="t52"></td>' +
        '<td id="t53"></td>' +
        '<td id="t54"></td>' +
        '<td id="t55"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="t40"></td>' +
        '<td id="t41"></td>' +
        '<td id="t42"></td>' +
        '<td id="t43"></td>' +
        '<td id="t44"></td>' +
        '<td id="t45"></td>' +
        '<td id="t46"></td>' +
        '<td id="t47"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="t32"></td>' +
        '<td id="t33"></td>' +
        '<td id="t34"></td>' +
        '<td id="t35"></td>' +
        '<td id="t36"></td>' +
        '<td id="t37"></td>' +
        '<td id="t38"></td>' +
        '<td id="t39"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="t24"></td>' +
        '<td id="t25"></td>' +
        '<td id="t26"></td>' +
        '<td id="t27"></td>' +
        '<td id="t28"></td>' +
        '<td id="t29"></td>' +
        '<td id="t30"></td>' +
        '<td id="t31"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="t16"></td>' +
        '<td id="t17"></td>' +
        '<td id="t18"></td>' +
        '<td id="t19"></td>' +
        '<td id="t20"></td>' +
        '<td id="t21"></td>' +
        '<td id="t22"></td>' +
        '<td id="t23"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="t8"></td>' +
        '<td id="t9"></td>' +
        '<td id="t10"></td>' +
        '<td id="t11"></td>' +
        '<td id="t12"></td>' +
        '<td id="t13"></td>' +
        '<td id="t14"></td>' +
        '<td id="t15"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="t0"></td>' +
        '<td id="t1"></td>' +
        '<td id="t2"></td>' +
        '<td id="t3"></td>' +
        '<td id="t4"></td>' +
        '<td id="t5"></td>' +
        '<td id="t6"></td>' +
        '<td id="t7"></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td id="num2"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="num3"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="num4"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="num5"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="num6"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="num7"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="num8"></td>' +
        '</tr>' +
        '</tbody></table>';

        this.html.innerHTML = board;
        this.setHtmlState();
    }

    this.setHtmlState = function(){
        this.setNumOrder();
        this.setCharOrder();

        var xitar = new Nm114Xitar(this);
        xitar.init();

        this.setStyle(this.html,"visibility","visible");

    }

    this.setNumOrder = function(){
        var el;
        var a = 9;
        var i = 1;
        for(i; i < a; i++){
            el = YU.Dom.get("num" + i);
            if(this.isFirstPlayer()){
                el.innerHTML = a - i;
            }else{
                el.innerHTML = i;
            }
        }
    }

    this.setCharOrder = function(){
        var el;
        var a = 9;
        var i = 1;
        for(i; i < a; i++){
            el = YU.Dom.get("m" + i);
            if(this.isFirstPlayer()){
                YU.Dom.addClass(el, "m" + i);
            }else{
                YU.Dom.addClass(el, "m" + (a - i));
            }
        }
    }
}

//******************************************************************************

function Nm114Xitar(nm){
    GlobalFunc.call(this);

    this.parent = nm;
    this.imgURL = this.Gimagedir;
    this.url = this.Gxitarurl + "/" + globalInitValue.desk;

    this.testState = false;

    this.celldiv = 'cpin';
    this.boarddiv = 'board';
    this.glassboard = null;

    this.cells = [];
    this.exit = new exitDesk(this);

    this.players = globalInitValue.players;
    this.position = globalInitValue.position;

    this.tryConnectionTimes = 0; //counter for try times

    if(globalInitValue.steps != undefined){
        this.steps = globalInitValue.steps;
    }else{
        this.steps = [];
    }

    this.test = '';
    this.selectedCell = null; //selected cell

    this.connection = false;
    this.gameEndState = false;

    this.init = function(){
        if(this.testState){
            this.test = new XitarTest(this);
        }

        this.setCells();
        var currentPosition = this.mergePositionSteps();
        this.setChesses(currentPosition);
        this.initialize();
        this.setWindowEvent();
    //YU.Event.on(window, 'unload', this.abortConnect, this, true);
    }

    this.setCells = function(){
        for(var i=0;i<64;i++){
            if(this.cells[i] === undefined){
                this.cells[i] = new Cell(this, i);
                this.cells[i].setHTML();
            }
        }
    }

    this.mergePositionSteps = function(){
        var position = this.position;
        if(this.steps.length != 0){
            for(var i = 0; i < this.steps.length; i++){
                var step = this.steps[i];
                var fcid = step[0];
                var tcid = step[1];

                position = this.removeXitarInCell(position, tcid); //clear in this cell origin xitar
                position = this.changeCellOfXitar(position, fcid, tcid);//change xitar position
            }
        }

        return position;
    }

    this.removeXitarInCell = function(position,tcellid){
        var len = position.length;
        for(var j = 0; j < len; j++){
            var tp = position[j];
            if(tp[2] == tcellid){
                position.splice(j,1);
                return position;
            }
        }
        return position;
    }

    this.changeCellOfXitar = function(position, fcellid, tcellid){
        var len = position.length;
        for(var j = 0; j < len; j++){
            var tp = position[j];
            if(tp[2] == fcellid){
                var t = [tp[0], tp[1], tcellid];
                if(this.changeHooToBarsInMerge(tp[0], tp[1], tcellid)){
                    t = [tp[0], Bars.id, tcellid];
                }
                
                position.splice(j,1,t);
            }
        }
        return position;
    }

    this.setChesses = function(currentPosition){
        var len = currentPosition.length;
        var xs,xid,cell, tx; //xitar side; xitar id; cell id;temp chess
        for(var i=0;i<len;i++){
            xs = currentPosition[i][0];
            xid = currentPosition[i][1];
            cell = this.cells[currentPosition[i][2]];
            if (xid == Hasag.id) {
                tx = new Hasag(this, xs);
            }
            if (xid == Mori.id) {
                tx = new Mori(this, xs);
            }
            if (xid == Teme.id) {
                tx = new Teme(this, xs);
            }
            if (xid == Bars.id) {
                tx = new Bars(this, xs);
            }
            if (xid == Haan.id) {
                tx = new Haan(this, xs);
            }
            if (xid == Hoo.id) {
                tx = new Hoo(this, xs);
            }
            cell.setXitar(tx);
        }
    }

    this.initialize = function(){
        var player1 = YU.Dom.get(this.Gplayer1div);
        var player2 = YU.Dom.get(this.Gplayer2div);
        player1.innerHTML = this.players[0];
        player2.innerHTML = this.players[1];
        var h;
        if(globalInitValue.playerid == this.players[0]){
            h = player1;
        }else{
            h = player2;
        }
        this.setStyle(h,"border","1px #900 solid");

        if(this.isMyTurnToMove()){
            this.displayWait();
        }else{
            this.galssBoard();
        }

        if(globalInitValue.gameend == "true"){
            this.setGameEndState();
        }else{
            this.displayLastStep();
        }
        
        this.exit.init();

        this.longpoll();
    }

    this.getImgURL = function(){
        return this.imgURL;
    }

    this.getCell = function(id){
        if((id < 64) && (id > -1)){
            return this.cells[id];
        }
    }

    this.getCells = function(){
        return this.cells;
    }

    this.getSteps = function(){
        return this.steps;
    }

    this.getSelectedCell = function(){
        return this.selectedCell;
    }

    this.getBoardDiv = function(){
        return this.boarddiv;
    }

    this.getMyKingCell = function(){
        for(var i=0;i<64;i++){
            if(this.cells[i].hasXitar()){
                var x = this.cells[i].getXitar();
                if(x.isMyXitar() && (x.getId() == Haan.id)){
                    return this.cells[i];
                }
            }
        }
        alert("Wrong! Cannot found king chess in xitar board.");
    }

    this.setSelectedCell = function(cell){
        this.logger('NM114Xitar - setSelectedCell');

        this.selectedCell = cell;
    }

    this.isMyTurnToMove = function(){
        if(this.myTurnToMove != undefined){
            return this.myTurnToMove;
        }

        this.myTurnToMove = true;

        if(this.steps.length > 0){
            var side = this.getStepsLastChess().getSide();
            if(this.isFirstPlayer()){
                if(side == 1){
                    return true;
                }
            }else{
                if(side == 0){
                    return true;
                }
            }
        }else{
            if(this.isFirstPlayer()){
                return true;
            }
        }
        
        this.myTurnToMove = false;
        return false;
    }

    this.getStepsLastChess = function(){
        var t = this.steps[this.steps.length - 1];
        return this.cells[t[1]].getXitar();
    }

    this.displayLastStep = function(){
        if(this.steps.length != 0){
            this.hideLastStep(2);
            var t = this.steps[this.steps.length - 1];
            this.cells[t[0]].setSelected();
            this.cells[t[1]].setSelected();
        }
        this.gameEnd();
    }

    this.hideLastStep = function(s){ //hide at s position step from end
        if(this.steps.length >= s){
            var t = this.steps[this.steps.length - s];
            this.cells[t[0]].setUnselected();
            this.cells[t[1]].setUnselected();
        }
    }

    this.displayWait = function(){
        this.setStyle(YU.Dom.get(this.Gwaitdiv),"visibility","visible");
    }

    this.hideWait = function(){
        this.setStyle(YU.Dom.get(this.Gwaitdiv),"visibility","hidden");
    }

    this.logger = function(str){
        if(this.testState){
            this.test.display(str);
        }
    }

    this.clearLogger = function(){
        if(this.testState){
            this.test.clear();
        }
    }

    this.kingIsInSafe = function(){  
        var kingcell = this.getMyKingCell();
        for(var i=0;i<64;i++){
            if(this.cells[i].hasXitar() && !this.cells[i].getXitar().isMyXitar()){
                var x = this.cells[i].getXitar();
                if(x.moveToXitarRule(kingcell)){
                    return false;
                }
            }
        }
 
        return true;
    }

    this.kingServive = function(){
        for(var i=0;i<64;i++){
            if(this.cells[i].hasXitar() && this.cells[i].getXitar().isMyXitar()){
                for(var j=0;j<64;j++){
                    if(i != j){
                        if(!this.cells[j].hasXitar()){ //move to cell
                            if(this.cells[i].getXitar().moveToCellRule(this.cells[j])){
                                if(this.tempMoveXitar(this.cells[i].getXitar(), this.cells[j])){
                                    return true;
                                }
                            }
                        }
                        if(this.cells[j].hasXitar() && !this.cells[j].getXitar().isMyXitar()){ //move to eat chess
                            if(this.cells[i].getXitar().moveToXitarRule(this.cells[j])){
                                if(this.tempMoveXitar(this.cells[i].getXitar(), this.cells[j])){
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    this.tempMoveXitar = function(xitar, tcell){ //sure king is safe
        if(xitar.isMyXitar()){
            xitar.getCell().setTempXitar(null);
            tcell.setTempXitar(xitar);
            if(!this.kingIsInSafe()){
                xitar.getCell().removeTempXitar();
                tcell.removeTempXitar();

                return false;
            }
            xitar.getCell().removeTempXitar();
            tcell.removeTempXitar();
        }

        return true;
    }

    this.showInfo = function(){
        var st = "";
        for(var i = 0; i < this.cells.length; i++){
            if(this.cells[i].getXitar() != null){
                st += "cell - " + this.cells[i].getId() + ";chess - " + this.cells[i].getXitar().getId();
            }else{
                st += "cell - " + this.cells[i].getId() + ";";
            }
        }
        alert(st);
    }

    this.gameEnd = function(){
        if(!this.kingIsInSafe() && !this.kingServive()){
            this.setGameEndState();
            this.postEndGame();
        }
    }
    
    this.setGameEndState = function(){
        this.hideLastStep(1);
        for(var i=0;i<64;i++){
            var c = this.cells[i];
            if(c.hasXitar() && (c.getXitar().getId() == Haan.id)){
                c.setSelected();
            }
        }
        this.gameEndState = true;
        this.galssBoard();
    }

    this.setBeToCellsState = function(){
        this.logger('NM114CHESS - setBeToCellsState()');

        var len = this.cells.length;
        for(var i=0;i<len;i++){
            this.cells[i].setBeToCellState();
            if(this.cells[i].hasXitar()){
                this.cells[i].getXitar().resetSelectableState();
            }
        }
    }

    this.galssBoard = function(){
        this.logger('NM114XITAR - galssBoard()');

        var w = parseInt(this.getStyle(YU.Dom.get("c1"),"width"), 10) * 8 + 2 + 15 + "px";
        var style = "cursor:wait;border:1px #f00 solid;position:absolute;z-index:10;width:" + w + ";height:" + w + ";";
        try {
            var elp = document.createElement('<div style="' + style + '"');
        }
        catch (e) {
            elp = document.createElement("div");
            elp.setAttribute("style", style);
        }
        this.glassboard = elp;

        var ce = YU.Dom.get(this.celldiv);
        YU.Dom.insertBefore(elp,ce);

        this.hideWait();
    }

    this.clearGlassBoard = function(){
        this.logger('NM114XITAR - clearGlassBoard()');

        if(this.glassboard !== null){
            YU.Dom.getAncestorBy(this.glassboard).removeChild(this.glassboard);
            this.glassboard = null;
        }

        this.displayWait();
    }

    this.firstStep = function(fce,tce){
        this.logger('NM114XITAR - firstStep()');

        var fceid = fce.id;

        if(this.steps.length == 0){
            if((fceid != 11) && (fceid != 12) ){
                return false;
            }
            else{
                if((fceid == 11) || (fceid == 12)){
                    if((tce.getId() != (fceid+16))){
                        return false;
                    }
                }
            }
        }
        if(this.steps.length == 1){
            var ceid = this.cells[this.steps[0][1]].getId();

            if((ceid != (fceid - 24))){
                return false;
            }
        }

        return true;
    }

    this.appendStep = function(chessid, cellid){ //chess with id=chessid move to cell with id=cellid
        try{
            var laststep = this.steps[this.steps.length - 1];
            if((laststep[0] != chessid) || (laststep[1] != cellid)){
                this.steps[this.steps.length] = [chessid, cellid];
                this.resetXitarState();
                return true;
            }
        }catch(err){
            this.steps[0] = [chessid, cellid];
            this.resetXitarState();
            return true;
        }
        return false;
    }

    this.resetXitarState = function(){
        globalInitValue.steps = this.steps;
        this.myTurnToMove = undefined;
    }

    this.changeHooToBarsInMerge = function(xside, xitarid, tcellid){
        if(xitarid == Hoo.id){
            if(xside == this.GblackXitar){
                if((tcellid > 55) && (tcellid < 64)){
                    return true;
                }
            }else{
                if((tcellid > -1) && (tcellid < 8)){
                    return true;
                }
            }
        }
         
        return false;
    }

    this.changeHooToBars = function(che, cell){
        var x = che;
        if((che.getId() == Hoo.id) && this.hooInOppositeSite(che,cell)){
            x.removeHtml();
            x = new Bars(this, che.getSide());
        }
        return x;
    }

    this.hooInOppositeSite = function(che, cell){
        var cid = cell.getId();
        if(che.getSide() == this.GblackXitar){
            if((cid > 55) && (cid < 64)){
                return true;
            }
        }else{
            if((cid > -1) && (cid < 8)){
                return true;
            }
        }
        
        return false;
    }

    this.postLastStep = function(fcellid, tcellid){
        if(this.connection == true){
            var para = "?laststep=" + fcellid + "," + tcellid;
            YU.Connect.asyncRequest('POST', this.url + para, new postCallBack(this));
        }else{
            setTimeout(this.postLastStep(),100);
        }
    }

    this.postExitXitar = function(){
        if(this.connection == true){
            var para = "?exit=true";
            YU.Connect.asyncRequest('POST', this.url + para, new exitPostCallBack(this));
        }else{
            setTimeout(this.postExitXitar(),100);
        }
    }

    this.postEndGame = function(){
        if(this.connection == true){
            var para = "?gameend=true";
            YU.Connect.asyncRequest('POST', this.url + para, new exitPostCallBack(this));
        }else{
            setTimeout(this.postEndGame(),100);
        }
    }
    
    function exitPostCallBack(xitar){
        this.xitarBoard = xitar;
        this.timeout = 6000;

        this.success = function(ob){}

        this.failure = function(ob){
            alert("Can't connect to server for exit the xitar game end in POST request.");
        }
    }

    //this.login.refreshWindow();

    function postCallBack(xitar){
        this.xitarBoard = xitar;

            timeout: this.GlobalAjaxTimeOut;   //a little larger then in server comet reponse timeout

        this.success = function(ob){}

        this.failure = function(ob){
            alert("Can't connect to server for upload last step in POST request.");
        }
    }

    this.longpoll = function(){
        this.createConnect('GET', this.url, new pollingCallBack(this));
    }

    function pollingCallBack(xitar){
        this.xitarBoard = xitar;

            timeout: this.xitarBoard.GlobalAjaxTimeOut;   //a little larger then in server comet reponse timeout

        this.success = function(ob){
            GlobalConnectedState = false;
            GlobalBuildingTryConnectionTimes = 0;

            var st = ob.responseText;
            if(st != ""){
                if(st == "endgame"){
                    if(this.xitarBoard.gameEndState == false){
                        this.xitarBoard.setGameEndState();
                    }
                    this.xitarBoard.longpoll();
                }else{
                    if((st != "error") && (st != "refresh")){
                        if(st != "i"){ //not interrupt
                            globalInit.setGlobalPostValue(st);
                            var fcellid = globalInitValue.laststep[0];
                            var tcellid = globalInitValue.laststep[1];

                            this.xitarBoard.getCell(fcellid).getXitar().move(this.xitarBoard.getCell(tcellid));
                        }                   
                        this.xitarBoard.longpoll();
                    }else{
                        this.xitarBoard.refreshWindow();
                    }
                }
            }
        }

        this.failure = function(ob){
            if(this.xitarBoard.tryConnectionTimes <= this.xitarBoard.GlobalBuildingTryConnectionTimes){
                this.xitarBoard.tryConnectionTimes++;
                this.xitarBoard.longpoll();
            }else{
                alert("Can't connect to server for xitar state.");
            }
        }
    }

    function exitDesk(xitar){
        this.xitar = xitar;
        this.html = null;

        this.init = function(){
            this.html = YU.Dom.get(this.xitar.Gexitdiv);

            YU.Event.on(this.html, 'click', this.onClick, this, true);
            
        }

        this.onClick = function(){
            this.xitar.postExitXitar();
        }
    }
}

//******************************************************************************

function XitarTest(x){
    GlobalFunc.call(this);

    this.testdiv     = "nm114_test";
    this.parent = x;
    this.html = null;  //html test object

    this.setHTML = function(){ //must insert into panel div
        if(YU.Dom.inDocument(YU.Dom.get(this.testdiv))){
            alert("Wrong! already have test ID = " + this.testdiv);
        }

        try {
            var elp = document.createElement('<div id="' + this.testdiv + '" style="position:absolute;top:5px;right:5px;width:200px;background-color:#090;color:#fff;"></div>');
        }
        catch (e) {
            elp = document.createElement("div");
            elp.setAttribute("id", this.testdiv);
            elp.setAttribute("style", "position:absolute;top:5px;right:5px;width:200px;background-color:#090;color:#fff;");
        }
        this.html = elp;

        YU.Dom.insertBefore(elp,YU.Dom.get(this.parent.getBoardDiv()));
    };

    this.getHTML = function(){
        return this.html;
    };

    this.display = function(str){
        try{
            var val = this.html.innerHTML;
            this.html.innerHTML = val + '<br />' + str;
        }catch(e){}
    };

    this.clear = function(){
        try{
            this.html.innerHTML = '';
        }catch(e){}
    };

    this.setHTML();
}

//******************************************************************************

function Cell(nm, id){
    GlobalFunc.call(this);

    this.parent = nm;
    this.id = id;

    this.cellWord = 'c';
    this.html = '';
    this.xitar = null;
    this.tempXitar = null;

    //get function
    this.getId = function(){
        this.parent.logger('cell - this.getId()' + this.getName());
        return this.id;
    }

    this.getName = function(){
        return (this.cellWord+this.id);
    }

    this.getXitar = function(){
        this.parent.logger('cell - this.getXitar()' + this.getName());
        return this.xitar;
    }

    this.hasXitar = function(){
        this.parent.logger('cell - this.hasXitar()' + this.getName());
        if(this.xitar == null){
            return false;
        }return true;
    }

    this.getHtml = function(){
        this.parent.logger('cell - this.getHtml()' + this.getName());
        return this.html;
    }

    this.getSwitchBg = function(){
        var dd = YU.Dom.getStyle(YU.Dom.getAncestorBy(this.html),'background-image');
        if(dd.indexOf('w.jpg') > -1){
            return this.parent.getImgURL() + 'w';
        }
        return this.parent.getImgURL() + 'b';
    }

    //set function
    this.setXitar = function(xita){
        this.parent.logger('cell - setXitar()');

        if(this.xitar != null){
            this.xitar.removeHtml();
        }else{
            this.setUnselected();
            this.removeEvent();
        }

        var x = xita;
        if(x != null){
            x = this.parent.changeHooToBars(xita, this);
            x.setCell(this);
        }

        this.xitar = x;
    }

    this.setTempXitar = function(xita){
        this.tempXitar = this.xitar;
        this.xitar = xita;
    }

    this.removeTempXitar = function(){
        this.xitar = this.tempXitar;
        this.tempXitar = null;
    }
    
    this.setBeToCellState = function(){
        this.parent.logger('cell - setBeToCellState()' + this.getName());
        this.beToCellState = undefined;
    }

    this.setEvent = function(){
        this.parent.logger('cell - setEvent()' + this.getName());

        YU.Event.on(this.html, 'mouseover', this.onCell, this, true);
        YU.Event.on(this.html, 'mouseout', this.offCell, this, true);
        YU.Event.on(this.html, 'click', this.onClick, this, true);
    }

    this.removeEvent = function(){
        this.parent.logger('cell - removeEvent()' + this.getName());

        var cellname = this.getName();
        YU.Event.removeListener(cellname, 'mouseover');
        YU.Event.removeListener(cellname, 'mouseout');
        YU.Event.removeListener(cellname, 'click');
    }

    this.removeXitar = function(){
        this.parent.logger('cell - removeXitar()' + this.getName());

        this.xitar.setUnselected();

        this.xitar=null;

        this.setEvent();
    }

    this.onCell = function(e){
        this.parent.clearLogger('cell - onCell()' + this.getName());
        this.parent.logger('cell - onCell()');

        if(this.beToCell()){
            //this.setStyle(this.html, 'background', 'url(' + this.getSwitchBg() + '1.jpg)');
            this.setStyle(this.html, 'cursor', 'pointer');
            this.setStyle(this.html, 'cursor', 'hand');
        }
    }

    this.offCell = function(e){
        this.parent.logger('cell - offCell()' + this.getName());

        this.setStyle(this.getName(), 'cursor', 'default');
    }

    this.onClick = function(){
        this.parent.clearLogger();
        this.parent.logger('cell - onClick()' + this.getName());

        if(this.beToCell()){
            var sce = this.parent.getSelectedCell();

            sce.getXitar().move(this);
        }
    }

    this.setSelected = function(){
        this.parent.logger('cell - setSelected()' + this.getName());

        //this.setStyle(this.html, 'background', 'url(' + this.getSwitchBg() + '2.jpg)');
        this.setStyle(this.html, 'background', 'url(' + this.getSwitchBg() + '1.jpg)');
    }

    this.setUnselected = function(){
        this.parent.logger('cell - setUnselected()' + this.getName());

        //this.offCell();
        this.setStyle(this.html, 'background', '');
    }

    this.beToCell = function(){ //if this is the destination cell
        this.parent.logger('cell - beToCell()' + this.getName());

        if(this.beToCellState != undefined){
            return this.beToCellState;
        }

        this.beToCellState = false;
        try{
            var sch = this.parent.getSelectedCell().getXitar();
            if(sch !== null){
                if(sch.moveToCellRule(this)){
                    if(this.parent.tempMoveXitar(sch, this)){//sure king is safe
                        this.beToCellState = true;
                    }
                }
            }
        }catch(err){}

        return this.beToCellState;
    }

    this.setHTML = function(){
        this.parent.logger('cell - this.setHTML()' + this.getName());

        var tdh;
        if(this.isFirstPlayer()){
            tdh = YU.Dom.get("t" + this.id);
        }else{
            tdh = YU.Dom.get("t" + (63 - this.id));
        }
        
        var ids = this.getName();

        try {
            this.html = tdh.appendChild(document.createElement('<div id="' + ids + '"></div>'));
        }
        catch (e) {
            this.html = tdh.appendChild(document.createElement("div"));
            this.html.setAttribute("id", ids);
        }
        this.html.innerHTML=this.id;

        this.setEvent();

    }
}

//******************************************************************************

function Xitar(){
    GlobalFunc.call(this);

    this.chessword = 'chess';
    this.html=null;
    this.cell=null;

    this.getSide = function(){
        return this.side;
    }

    this.getName = function(){
        return this.chessword + this.getId();
    }

    this.getClass = function(){
        return this.side+"-" + this.getId();
    }

    this.getHtml = function(){
        this.parent.logger('xitar - this.getHtml()' + this.getClass() );
        return this.html;
    }

    this.getCell = function(){
        this.parent.logger('xitar - this.getCell()' + this.getClass() );
        return this.cell;
    }

    this.resetSelectableState = function(){
        this.parent.logger('xitar - resetSelectableState()' + this.getClass()  );

        this.selectableState = undefined;
    }

    this.setCell = function(cell){
        this.parent.logger('xitar - setCell()' + this.getClass() + ' ' + cell.getName());
        
        this.cell = cell;
        this.setHTML();
    }

    this.setEvent = function(restore){
        this.parent.logger('xitar - setEvent()' + this.getClass());

        YU.Event.on(this.html, 'mouseover', this.onXitar, this, true);
        YU.Event.on(this.html, 'mouseout', this.offXitar, this, true);
        if(restore !== true){
            YU.Event.on(this.html, 'click', this.onClick, this, true);
        }
    }

    this.removeEvent = function(){
        this.parent.logger('xitar - removeEvent()' + this.getClass());

        YU.Event.removeListener(this.html, 'mouseover');
        YU.Event.removeListener(this.html, 'mouseout');
    }

    this.removeHtml = function(){
        this.parent.logger('xitar - removeHtml()' + this.getClass());
        
        try{
            YU.Dom.getAncestorBy(this.html).removeChild(this.html);
        }catch(err){}
    }

    this.onXitar = function(e){
        this.parent.clearLogger();
        this.parent.logger('xitar - onXitar()' + this.getClass());

        if(this.selectable()){
            this.setStyle(this.html, 'cursor', 'pointer');
            this.setStyle(this.html, 'cursor', 'hand');
        //this.setStyle(this.cell.getHtml(), 'background', 'url(' + this.cell.getSwitchBg() + '1.jpg)');
        }
    }

    this.offXitar = function(e){
        this.parent.logger('xitar - offXitar()' + this.getClass());

        this.setStyle(this.html, 'cursor', 'default');
        this.cell.offCell();
    }

    this.onClick = function(){
        this.parent.clearLogger();
        this.parent.logger('xitar - onclick()' + this.getClass());

        if(this.selectable()){
            var sce= this.parent.getSelectedCell();
            if(sce == null){
                this.setSelected();
                return;
            }
            if(sce.getId() != this.cell.id){
                if(this.inGroup(sce.getXitar())){
                    this.restoreState(sce.getXitar());
                }
                else{
                    if(sce.getXitar().moveToXitarRule(this.cell)){
                        sce.getXitar().move(this.cell);
                    }
                }
                return;
            }
            else{
                this.restoreState(this);
            }
        }
    }

    this.setSelected = function(){
        this.parent.logger('xitar - setSelected()' + this.getClass());

        this.cell.setSelected(); //change selected cell display style
        this.removeEvent(); //chess remove event
        this.parent.setSelectedCell(this.cell); //set selected cell

        this.parent.setBeToCellsState();
    }

    this.setUnselected = function(){
        this.parent.logger('xitar - setUnselected()' + this.getClass());

        this.cell.setUnselected();
        this.removeEvent();
        this.setEvent(true);

        this.parent.setSelectedCell(null);

        this.parent.setBeToCellsState();
    }

    this.restoreState = function(che){
        this.parent.logger('xitar - restoreState()' + this.getClass() + che.getClass());

        che.setUnselected();
        if(che == this){
            this.onXitar();
        }
        else{
            this.setSelected();
        }
    }

    this.move = function(tcell){
        this.parent.logger('xitar - move()' );

        if(this.parent.appendStep(this.cell.id, tcell.getId())){
            this.parent.displayLastStep();

            if(this.isMyXitar()){
                this.offXitar();
                this.parent.galssBoard();
                this.parent.postLastStep(this.cell.getId(), tcell.getId());
            }

            var anim = new YU.Motion(this.html, {
                points: {
                    to: this.getXY(tcell.getName())
                }
            });
            var ff = this;
            anim.onComplete.subscribe(function(){
                if(!ff.isMyXitar()){
                    ff.parent.clearGlassBoard();
                }
                ff.cell.removeXitar();
                tcell.setXitar(ff);

                ff.parent.displayLastStep();
            });
            anim.animate();
        }
    }

    this.inGroup = function(che){
        this.parent.logger('xitar - inGroup()' );

        if(this.side == che.getSide()){
            return true;
        }
        return false;
    }
    
    this.selectable = function(){
        this.parent.logger('xitar - selectable()' + this.getClass() + ' ' + this.selectableStateCheck + ' ' + this.selectableState);

        if(this.selectableState != undefined){
            return this.selectableState;
        }
        
        this.selectableState = true;

        var scell = this.parent.getSelectedCell();

        if(scell == null){ //Don't have any selected chess
            if(this.isMyXitar() && this.parent.isMyTurnToMove() && this.existCellTo()){
                return true;
            }
        }
        else{ //have selected cell
            if(this.inGroup(scell.getXitar())){
                if(this.existCellTo()){
                    return true;
                }
            }
            else{
                if(this.haveCellTo(scell.getXitar())){
                    return true;
                }
            }
        }

        this.selectableState = false;
        return false;
    }

    this.isMyXitar = function(){
        if(this.isFirstPlayer()){
            if(this.side == 0){
                return true;
            }
        }else{
            if(this.side == 1){
                return true;
            }
        }
        return false;
    }

    this.existCellTo = function(){ //Check if exist the cells this chess can move to
        this.parent.logger('chess - existCellTo()' + this.getClass());

        var length = 18; //longest step in chess is mori (17),smallest is 1
        if(this.isMyXitar() && !this.parent.kingIsInSafe()){
            length = 64;
        }

        var tid = this.cell.getId();

        for(var i=1; i<length; i++){
            var cid = (tid + i);
            if(cid < 64){
                if(this.subExistCellTo(cid)){
                    return true;
                }
            }

            cid = (tid - i);
            if(cid > -1){
                if(this.subExistCellTo(cid)){
                    return true;
                }
            }
        }

        return false;
    }

    this.subExistCellTo = function(ceid){ //sub function of function existCellTo()
        this.parent.logger('xitar - subExistCellTo()' + this.getClass());

        var ce = this.parent.getCell(ceid);
        if(ce.hasXitar()){ //this cell has xitar
            if(!this.inGroup(ce.getXitar())){
                if(this.moveToXitarRule(ce)){
                    if(this.parent.tempMoveXitar(this, ce)){//sure king is safe
                        return true;
                    }
                }
            }
        }else{//this cell has no xitar
            if(this.parent.getSteps().length > 1){
                if(this.moveToCellRule(ce)){
                    if(this.parent.tempMoveXitar(this, ce)){//sure king is safe
                        return true;
                    }
                }
            }else{
                if(this.parent.firstStep(this.cell,ce)){
                    return true;
                }
            }
            
        }
        return false;
    }

    this.haveCellTo = function(sch){ //not finished yet
        this.parent.logger('xitar - this.haveCellTo()' + this.getClass() + ' ' + sch.getClass());

        try{
            if(!sch.inGroup(this) && sch.moveToXitarRule(this.cell)){
                if(this.parent.tempMoveXitar(sch, this.cell)){//sure king is safe
                    return true;
                }
            }
        }catch(err){
            alert("No selected xitar.");
        }
        return false;
    }

    this.setHTML = function(){
        this.parent.logger('xitar - this.setHTML()' + this.getClass());

        this.removeHtml();
        
        var cellhtml = this.cell.getHtml();

        var ids = this.getName();
        try {
            var elp = cellhtml.appendChild(document.createElement('<div class="' + ids + '"></div>'));
        }
        catch (e) {
            elp = cellhtml.appendChild(document.createElement("div"));
            elp.setAttribute("class", ids);
        }
        this.setStyle(elp, 'width', '60px');
        this.setStyle(elp, 'height', '60px');
        this.html = elp;

        this.displayIcon();
    }

    this.displayIcon = function(){
        this.parent.logger('xitar - displayIcon() - ' + this.getClass());

        var icon = this.icon1;
        if(this.side == 1){
            icon = this.icon2;
        }
        this.setStyle(this.html,'background','url('+icon+') 0 0 repeat')
        this.setEvent();
    }
}

function Hoo(nm, side){
    Xitar.call(this);

    this.parent = nm;
    this.side = side;
    
    this.icon1 = this.parent.getImgURL() + 'hoo1.gif';this.icon2= this.parent.getImgURL() + 'hoo2.gif';

    this.getId = function(){
        this.parent.logger('Hoo - getId()');
        return Hoo.id;
    }

    this.moveToCellRule = function(tcell){
        this.parent.logger('hoo - moveToCellRule()' + ' ' + tcell.getName());

        var fceid = this.cell.getId();
        var tceid = tcell.getId();

        var steps = this.parent.getSteps();
        if(steps.length == 0){
            if(this.side == 0){
                if((fceid+16) == tceid){
                    return true;
                }
            }
        }else{
            if(steps.length == 1){
                if(this.side == 1){
                    if((fceid-16) == tceid){
                        return true;
                    }
                }
            }else{
                var fidx = (fceid%8);
                var fidy = ((fceid-(fceid%8))/8)+1;
                var tidx = (tceid%8);
                var tidy = ((tceid-(tceid%8))/8)+1;

                if ( fidx == tidx) {
                    if((this.side == 0) && (fidy == (tidy - 1))){
                        return true;
                    }
                    if((this.side == 1) && (fidy == (tidy + 1))){
                        return true;
                    }
                }
            }
        }
        
        return false;
    }

    this.moveToXitarRule = function(tcell){
        this.parent.logger('hoo - moveToXitarRule()' + ' ' + tcell.getId());

        var fid = this.cell.getId();
        var tid = tcell.getId();

        var fidx = (fid%8);
        var fidy = ((fid-(fid%8))/8)+1;
        var tidx = (tid%8);
        var tidy = ((tid-(tid%8))/8)+1;

        if((fidx == (tidx + 1)) || (fidx == (tidx - 1))){
            if((this.side == 0) && (fidy == (tidy - 1))){
                return true;
            }
            if((this.side == 1) && (fidy == (tidy + 1))){
                return true;
            }
        }

        return false;
    }

}

function Hasag(nm, side){
    Xitar.call(this);

    this.parent = nm;
    this.side = side;
    
    this.icon1= this.parent.getImgURL() + 'hasag1.gif';this.icon2= this.parent.getImgURL() + 'hasag2.gif';

    this.getId = function(){
        this.parent.logger('hasag - getId()');
        return Hasag.id;
    }

    this.moveToCellRule = function(tcell){
        this.parent.logger('hasag - moveToCellRule()' + ' ' + tcell.getName());

        var fceid = this.cell.getId();
        var tceid = tcell.getId();
        var fidx = (fceid%8);
        var fidy = ((fceid-(fceid%8))/8)+1;
        var tidx = (tceid%8);
        var tidy = ((tceid-(tceid%8))/8)+1;
        if((fidx == tidx) || (fidy == tidy)){
            if(this.clear(tcell)){
                return true;
            }
        }
        return false;
    }

    this.moveToXitarRule = function(tcell){
        this.parent.logger('hasag - moveToXitarRule()' + ' ' + tcell.getName());

        return this.moveToCellRule(tcell);
    }

    this.clear = function(tcell){
        this.parent.logger('hasag - clear()' + ' ' + tcell.getName());

        var fid = this.cell.getId(); //3
        var tid = tcell.getId();      //19
        var d = fid - tid;

        var step = 1; //horizontal move
        if (d % 8 == 0) {
            step = 8;
        }
        if (d > 0) {
            step = -step;
        }

        var len = Math.abs(d/step);
        for (var i = 1; i < len; i++) {
            if (this.parent.getCell(fid + (step * i)).hasXitar()) {
                return false;
            }
        }

        return true;
    }
}

function Mori(nm, side){
    Xitar.call(this);

    this.parent = nm;
    this.side = side;
    
    this.icon1= this.parent.getImgURL() + 'mori1.gif';this.icon2= this.parent.getImgURL() + 'mori2.gif';

    this.getId = function(){
        this.parent.logger('Mori - getId()');
        return Mori.id;
    }

    this.moveToCellRule = function(tcell){
        this.parent.logger('mori - moveToCellRule()' + ' ' + tcell.getName());

        var fceid = this.cell.getId();
        var tceid = tcell.getId();
        var fidx = (fceid%8);
        var fidy = ((fceid-(fceid%8))/8)+1;
        var tidx = (tceid%8);
        var tidy = ((tceid-(tceid%8))/8)+1;
        if(((fidx == (tidx + 2)) || (fidx == (tidx - 2))) && ((fidy == (tidy + 1)) || (fidy == (tidy - 1)))){
            return true;
        }
        if(((fidy == (tidy + 2)) || (fidy == (tidy - 2))) && ((fidx == (tidx + 1)) || (fidx == (tidx - 1)))){
            return true;
        }
        
        return false;
    }

    this.moveToXitarRule = function(tcell){
        this.parent.logger('mori - moveToXitarRule()' + ' ' + tcell.getName());

        return this.moveToCellRule(tcell);
    }
}

function Teme(nm, side){
    Xitar.call(this);

    this.parent = nm;
    this.side = side;
    
    this.icon1= this.parent.getImgURL() + 'teme1.gif';this.icon2= this.parent.getImgURL() + 'teme2.gif';

    this.getId = function(){
        this.parent.logger('teme - getId()');
        return Teme.id;
    }

    this.moveToCellRule = function(tcell){
        this.parent.logger('teme - moveToCellRule()' +  ' ' + tcell.getName());

        var fid = this.cell.getId();
        var tid = tcell.getId();

        var fidx = (fid % 8);                    //x position
        var fidy = ((fid - (fid % 8)) / 8);   //y position
        var tidx = (tid % 8);                   //x position
        var tidy = ((tid - (tid % 8)) / 8);  //y position

        if ((fidx != tidx) || (fidy != tidy)) {
            if (Math.abs(fidx - tidx) == Math.abs(fidy - tidy)) {
                if (this.clear(tcell)) {
                    return true;
                }
            }
        }
        return false;
    }

    this.moveToXitarRule = function(tce){
        this.parent.logger('teme - moveToXitarRule()' + ' ' + tce.getName());

        return this.moveToCellRule(tce);
    }

    this.clear = function(tcell){
        this.parent.logger('teme - clear()' + ' ' + tcell.getName());

        var fid = this.cell.getId();
        var tid = tcell.getId();
        var d = fid - tid;

        var step = 7; //horizontal move
        if (d % 9 == 0) {
            step = 9;
        }
        if (d > 0) {
            step = -step;
        }

        var len = Math.abs(d / step);
        for (var i = 1; i < len; i++) {
            if (this.parent.getCell(fid + (step * i)).hasXitar()) {
                return false;
            }
        }

        return true;
    }
}

function Haan(nm, side){
    Xitar.call(this);

    this.parent = nm;
    this.side = side;

    this.icon1= this.parent.getImgURL() + 'han1.gif';this.icon2= this.parent.getImgURL() + 'han2.gif';

    this.getId = function(){
        this.parent.logger('haan - getId()');
        return Haan.id;
    }

    this.moveToCellRule = function(tcell){
        this.parent.logger('han - moveToCellRule()' + ' ' + tcell.getName());

        var fid = this.cell.getId();
        var tid = tcell.getId();

        var fidx = (fid % 8);                    //x position
        var fidy = ((fid - (fid % 8)) / 8);   //y position
        var tidx = (tid % 8);                   //x position
        var tidy = ((tid - (tid % 8)) / 8);  //y position
        if((fidx == tidx) && ((fidy == (tidy + 1)) || (fidy == (tidy - 1)))){
            return true;
        }
        if((fidy == tidy) && ((fidx == (tidx + 1)) || (fidx == (tidx - 1)))){
            return true;
        }
        if(((fidy == (tidy + 1)) || (fidy == (tidy - 1))) && ((fidx == (tidx + 1)) || (fidx == (tidx - 1)))){
            return true;
        }
        return false;
    }

    this.moveToXitarRule = function(tcell){
        this.parent.logger('han - moveToXitarRule()' + ' ' + tcell.getName());

        return this.moveToCellRule(tcell);
    }
}

function Bars(nm, side){
    Xitar.call(this);

    this.parent = nm;
    this.side = side;

    this.icon1= this.parent.getImgURL() + 'bars1.gif';this.icon2= this.parent.getImgURL() + 'bars2.gif';

    this.getId = function(){
        this.parent.logger('Bars - getId()');
        return Bars.id;
    }

    this.moveToCellRule = function(tcell){
        this.parent.logger('bars - moveToCellRule()' + ' ' + tcell.getName());

        var fid = this.cell.getId();
        var tid = tcell.getId();

        var fidx = (fid%8);
        var fidy = ((fid-(fid%8))/8)+1;
        var tidx = (tid%8);
        var tidy = ((tid-(tid%8))/8)+1;

        if ((fidx == tidx) || (fidy == tidy) || (Math.abs(fidx - tidx) == Math.abs(fidy - tidy))) {
            if (this.clear(tcell)) {
                return true;
            }
        }

        return false;
    }

    this.moveToXitarRule = function(tcell){
        this.parent.logger('bars - moveToXitarRule()' + ' ' + tcell.getName());

        return this.moveToCellRule(tcell);
    }

    this.clear = function(tcell){
        this.parent.logger('bars - clear()' + ' ' + tcell.getName());

        var fid = this.cell.getId();
        var tid = tcell.getId();

        var fidx = (fid%8);
        var fidy = ((fid-(fid%8))/8)+1;
        var tidx = (tid%8);
        var tidy = ((tid-(tid%8))/8)+1;

        var d = fid - tid;
        var step = 1; //horizontal move
        if((fidx != tidx) && (fidy != tidy)){
            if (d % 7 == 0) {
                step = 7;
            }
            if (d % 9 == 0) {
                step = 9;
            }
        }
        if((fidx == tidx) && (fidy != tidy)){
            step = 8;
        }
        if (d > 0) {
            step = -step;
        }

        var len = Math.abs(d/step);
        for (var i = 1; i < len; i++) {
            if (this.parent.getCell(fid + (step * i)).hasXitar()) {
                return false;
            }
        }
        
        return true;
    }
}

Hasag.id = 1;
Mori.id   = 2;
Teme.id = 3;
Haan.id  = 4;
Bars.id  = 5;
Hoo.id   = 6;

//******************************************************************************