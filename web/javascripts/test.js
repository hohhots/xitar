function XitarTest(){
    GlobalFunc.call(this);

    if(!this.checkCreatedObj("XitarTest", 1)){
        return;
    }

    this.testdiv     = "nm114_test";
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

        YU.Dom.getElementsBy(function(el){
            return true;
        },"body")[0].appendChild(this.html);
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