function xhr(type, url, asyn, data, callback) {
    var xhr = new XMLHttpRequest(); //xhr.readyState == 0
    xhr.cb = callback;
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            console.log(xhr.status);
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                console.log("Success");
                //console.log(xhr.responseText);
                this.cb(JSON.parse(xhr.responseText));
            } else {
                console.log("Fail");
                this.cb(-1);
            }
        }
    }
    xhr.open(type, url, asyn); //xhr.readyState == 1
    xhr.send(data); //xhr.readyState == 4
}