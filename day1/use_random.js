/*
외부에 필요한 모듈을 사용하기 위해서는 require 함수안에 필요한 모듈명을 명시하면 된다.
해당 모듈폴더에 index로 해놓아야만 자동적으로 인식이 된다.
--- 모듈과 다른 js파일들의 구분이 힘들므로 폴더를 생성하여 모듈을 관리 한다.

*/
var mm = require("./mymodule");

//
function test(){
	var r=mm.getRandom(5);
	console.log("5에 대한 랜덤값 : "+r);

	setTimeout(function(){
		test();
	},500);
}
//test.png의 확장자명 받기//현 파일의 확장자명
var x = mm.getExtend("test.png");
console.log(x);
//현 파일의 확장자명
console.log(mm.getExtend(__filename));
test();