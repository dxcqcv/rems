define("css.min!app/../../css/xmgl",[],function(){}),define("app/xmgl",["require","jquery","css!../../css/xmgl"],function(e){var t=e("jquery"),n=e("css!../../css/xmgl");(function(){})()}),function(e){var t=document,n="appendChild",r="styleSheet",i=t.createElement("style");i.type="text/css",t.getElementsByTagName("head")[0][n](i),i[r]?i[r].cssText=e:i[n](t.createTextNode(e))}(".xmgl-wrapper{text-align:center;overflow:hidden}");