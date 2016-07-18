/*
node.js의 내장 모듈중 query string내장 모듈을 학습한다.
*/
var query=require("querystring");

var result=query.parse("http://news.naver.com/main/read.nhn?mode=LPOD&mid=sec&oid=001&aid=0008548934&isYeonhapFlash=Y");

console.log(result);