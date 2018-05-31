var cc = function() {
    // private variables and functions
    var exRate = 0,
        url = "https://openexchangerates.org/api/latest.json?app_id=eac7657326664018818b4bc397b32cba&base=USD";

    // initialization
    xhr("get", url, false, null, function(r) {
        exRate = r.rates;
    });

    // public methods and attributes
    return {
        //获取汇率
        getRate: function(){
            return exRate;
        },
        //自定义汇率
        userRate: function(uRate) {
            for(var cname in uRate){
                exRate[cname] = uRate[cname];
            }
        },
        //汇率转换
        converter: function(cfrom, cto, mfrom) {
            var rfrom = 0,
                rto = 0;
            for (var cname in exRate) {
                if (cfrom == cname) {
                    rfrom = exRate[cname];
                }
                if (cto == cname) {
                    rto = exRate[cname];
                }
                //找到两个汇率，直接返回结果
                if(rfrom && rto){
                    return mfrom / rfrom * rto;
                }
            }
            //未找到对应汇率，则返回未找到的国家
            if(rfrom || rto){
                return (rfrom || rto) ? (rfrom ? cto : cfrom) : (cfrom + ", " + cto);
            }
        }
    };
}();



