/*
Nodejs는 완제품이 아니다!! 따라서 서버를 내가 직접 코드로 작성해야한다.
하지만, Nodejs자체의 문법 및 내장,외부 모듈들을 이용하면 서버구축은 상당히 쉬워진다.
*/

//내부 모듈중 http모듈 가져오기!!! 모듈(객체+메서드)
var http=require("http");

//파일의 내용을 읽어들일 수있는 내부모듈
var fs=require("fs");

//서버 객체 생성
var server=http.createServer(function(request,response){
	//서버는 이미 W3C가 정해놓은 형식에 맞춰서 Client에게 응답해야 하므로 아래와 같은 코드가 작성되어야한다.
	response.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});

	//Client의 request에 따른 응답(end())가 발생하여야함.
	/*if(request.url=="/green.html"){
		console.log("녹색");
	}else if(request.url=="/yellow.html"){
		console.log("노랑");
	}
	*/
	console.log(request.url);
	var data;
	if(request.url!="/favicon.ico"){
		data = fs.readFileSync("."+ request.url,"utf8");
	}
	//end()메서드는 document.write처럼 클라이언트가 받게될 문자열 컨텐츠를 넣을수있다. 
	response.end(data);

});

//서버 가동
server.listen(8383, function(){
	console.log("server is running at 8383....");
});