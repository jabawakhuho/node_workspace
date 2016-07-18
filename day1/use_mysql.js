/*
nodejs를 이용하면 javascript에서도 database연동 프로그래밍이 가능하다. (과거엔 불가능했다.)

내장모듈로 해결되지 않는 부분은 외부의 모듈을 추가하여 개발하면 된다.
이 방법이 nodejs가 위력을 발휘하는 이유다.
전 세계 개발자들이 지금 이 시점에도 새로운 모듈들을 개발하여 공개중이다.....
*/

var mysql=require("mysql");

//접속 시도!!!
var client=mysql.createConnection({
	"url":"localhost",
	"user":"root",
	"password":""
});

//사용할 DB선택!!
client.query("use iot");

//mysql DB의 student table에 1건 넣기
client.query("insert into student (id,pwd,name) value ('superman','1212','클락');");