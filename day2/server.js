/*
http 내장 모듈로만은 완전한 웹서버를 구축하기엔 너무나 부족하다.
따라서 express 모듈을 사용해보자!!
express모듈이란? 웹서버 구축에 필요한 기능들을 위해 http모듈에 추가시켜놓은 외부모듈...
(http의 업그레이드 모듈 but 두 모듈은 같이 사용한다.)

ejs 모듈을 이용하면 html문서 내에서 반복문 등의 
기초적인 자바 스크립트 프로그래밍 문법이 적용될수있다...
*/

var http=require("http");
var express=require("express");//외부 //외부 모듈은 해당 서버 경로에가서 npm install 모듈이름 을 하여 설치한후사용한다.
var fs=require("fs");
var mysql=require("mysql");//외부
var bodyParser=require("body-parser");//외부
var ejs=require("ejs");//외부

//express모듈로 부터 application 객체를 반환 생성한자..
var app=express();

app.use(bodyParser.json()); // JSON지원
app.use(bodyParser.urlencoded({ extended: true })); // form태그로 전송될 경우 이 속성을 지정해야함

//mysql 서버에 접속
var client=mysql.createConnection({
	"url":"localhost",
	"user": "root",
	"password":""
});
client.query("use iot"); //사용할 DB 선택 //query() : db명령어 입력시 사용하는 메서드

//게시물 목록보기 요청 처리
app.route("/list").get(function(request,response){

	//list.html 페이지를 읽어들인 결과를 page변수에 담음..
	var page=fs.readFileSync("./list.html","utf8");
	//응답전에 이미 데이터베이스에서 값을 불러온다
	client.query("select * from student",function(error, records){
		if(!error){
		//	console.log(records);
			response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			response.end(ejs.render(page,{dataList : records}));//
			//page를 랜더링 하면서 2번째 인수로 전달한 객체를 렌더링 대상이 되는 html에 전달해준다.
		}else{
			console.log("망함");
		}
	});

});

//application 객체란? 웹서버 역활을 담당할 객체..
//웹서버 역활이란? client의 요청에 의해서 응답하는 역활
/*
app.use(function(request,response){
	response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	response.end("express 모듈로 구축한 서버 응답");
});
*/

//app.use() 메서드 안에는 미들웨어라고 불리는 각종 express의 지원함수들이 자리잡을수있다.

// 라우팅 미들웨어를 사용해본다. : route란 방향을 잡는것을 말하고,
//nodejs에서는 원하는 페이지를 나오게 처리해준다..
//app.use(app.router);//라우팅시 함수()표시 하지 않는다.

//client가 get방식으로 요청을 시도하면 동작하게 될 메서드!!

//등록폼을 원하면... http://localhost:8383/regist_form
app.route("/regist_form").get(function(request,response){
	var data=fs.readFileSync("./regist_form.html","utf8");
	response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	response.end(data);

});

//Client가 등록을 원하면 ..post방식으로 요청할경우 서버에서는 post()메서드로 받아야한다.
app.route("/regist").post(function(request,response){
	//Client가 보낸 데이터를 받고
	
	var data=request.body; //json 형식으로 data를 받는다.{id: , pwd:, name:} //concole.log(request.body);

	var id=data.id;  // data는 객체형식의 json이므로 하위 data를 옆에와 같이 표현할수있다.
	var pwd=data.pwd; 
	var name=data.name; 

//	console.log("넘겨받은 id는"+id);
//	console.log("넘겨받은 pwd는"+pwd);
//	console.log("넘겨받은 name는"+name);
	//받은 데이터를 데이터베이스에 넣는다.
	//query문 수행후 두번째 인수인 익명함수가 작동한다. 개발자는 여기서 성공 실패 여부를 알려준다.
	client.query("insert into student (id,pwd,name) values ('"+id+"','"+pwd+"','"+name+"')", function(error,records,field){
		if(error){
			console.log("등록 실패입니다.");
		}else{
			console.log("등록 성공입니다.");
			//리스트 페이지에 대한 요청!!!
			//클라이언트의 브라우져로 하여금 지정한 url로 요청을 다시 시도하라는 명령.
			response.redirect("/list");
		}
	});

	
});
//상세보기가 요청되면
app.route("/detail/:id").get(function(request,response){
	var detail = fs.readFileSync("./detail.html","utf8");
	//데이터 베이스 연동되어 있어야 한다.
	//유저가 선택한 id를 get방식으로 넘겨 받았어야 한다.
	//console.log(request.params.id);


	client.query("select * from student where id='"+request.params.id+"'", function(error,records){

		if(!error){
			console.log(records);
			response.writeHead(200,{"Content-Type": "text/html;charset=utf-8"});
			response.end(ejs.render(detail, {obj:records }));
		}else{
			console.log("일치하는 데이터를 찾을수 없습니다.");
		}
	});

});
//삭제 요청 처리
app.route("/delete/:id").get(function(request,response){
	
	client.query("delete from student where id='"+request.params.id+"'", function(error,records){
		if(!error){
			response.redirect("/list");
		}else{
			console.log("삭제 실패");
		}
	});
});
//서버구동 시작!!
var server=http.createServer(app);

server.listen(8383,function(){
	console.log("server is running at 8383...");
});