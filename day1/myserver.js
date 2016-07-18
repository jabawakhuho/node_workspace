/*
원격지의 브라주져들이 내 컴퓨터를 접속할수있도록 웹서버를 구축한다.
서버 구축을 위해서는 내장모듈중 http모듈을 사용해야한다.
*/

var http=require("http");
var fs=require("fs");
//http 모듈에 createServer()메서드를 호출하면, server객체를 반환해준다.
var server=http.createServer(function(request,response){
	//client의 브라우져에 보내게 될 요청헤더 정보 구성..
	//200 웹서버가 요청을 성공적으로 처리했다는 응답결과 코드(web표준)
	response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});

	//클라이언트에게 응답하기전에 fileSystem을 이용하여, html문서를 읽어드리자!!
	var data=fs.readFileSync("regist_form.html","utf8");

	response.end(data);

});

//서버 가동
server.listen(9999, function(){
	console.log("server가 9999th port에서 실행중입니다.");
});
