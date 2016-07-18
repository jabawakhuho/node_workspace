/*
내장 모듈중 url 모듈을 학습한다.
URL : 자원의 위치!! Uniformed Resouce locator
*/
var url=require("url");

//특정 데이터로부터 의미있는 데이터를 추출하는 과정을 파싱이라한다.
//url 샛체의 parse 메서드는, 지정한 url 정보에 대해 해석후 json형태의 객체를 반환해준다.
var obj=url.parse("http://news.naver.com/main/read.nhn?mode=LPOD&mid=sec&oid=001&aid=0008548583&isYeonhapFlash=Y");
console.log(obj);
