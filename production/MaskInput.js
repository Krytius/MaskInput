/**
 * MaskInput
 * @version: 1.0.0
 * Copyright (c) 2014 Elvis Ferreira Coelho http://elviscoelho.net
 * @author: Elvis Ferreira Coelho
 * Date criation: 05/02/2014
 */
function MaskInput(a,b){var c=a,d=b,e=function(){{var a=f(),b=g(a);h(a,b)}},f=function(){var a=c.length;d.maxLength=a;for(var b=[],e=0;a>e;e++)b.push(k(c[e]));return b},g=function(a){for(var b=a.length,d=[],e=0;b>e;e++)a[e].test(1)||a[e].test("A")||a[e].test("a")||d.push({pos:e,"char":c[e]});return d},h=function(a,b){for(var c=d.value,e=d.value,f=e.length,g=(a.length,b.length),h=0;f>h;h++)for(var k=0;g>k;k++)h===b[k].pos&&e[h]!==b[k].char&&(c=j(b[k].pos,c,b[k].char));for(var h=0;h<c.length;h++){var l=a[h].test(c[h]);l||(c=i(h,c))}d.value=c},i=function(a,b){return b=b.slice(0,a)},j=function(a,b,c){return b.slice(0,a)+c+b.slice(a)},k=function(a){for(var b=a.length,c="",d=1,e="",f=0;b>f;f++)c===a[f]?d++:(d>1?e+="{"+d+"})":1!==d||"A"!==c&&"a"!==c&&"?"!==c&&"9"!==c?1===d&&"*"===c&&(e+="+)"):e+=")",c=a[f],e+="9"===c?"([0-9]":"A"===c?"([A-Z]":"a"===c?"([a-z]":"?"===c?"([A-Za-z]":"*"===c?"([A-Za-z0-9]":" "===c?"\\s":"\\"+c,d=1),f===b-1&&d>1?e+="{"+d+"})":f!==b-1||"A"!==c&&"a"!==c&&"?"!==c&&"9"!==c||1!==d?f===b-1&&1===d&&"*"===c&&(e+="+)"):e+=")";return new RegExp("^"+e+"$")};e()}