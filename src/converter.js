//获取汇率
var exRate;
//我的账户似乎没有权限设置基准汇率
//为url增加&base=CNY会返回403错误：请求不允许
//除了USD，测试了几个都不行：EUR，CHY，CHN
xhr("get", "https://openexchangerates.org/api/latest.json?app_id=eac7657326664018818b4bc397b32cba&base=USD", false, null, function(r) {
    exRate = r.rates;
});

//自定义汇率
function userRate(uRate) {
    for(var cname in uRate){
        exRate[cname] = uRate[cname];
    }
}

function converter(cfrom, cto, mfrom) {
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