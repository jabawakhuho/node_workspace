/*
node.js에서 개발자가 객체를 정의할수있는데, 
특히 node.js에서는 저장된 파일을 모듈이라고 한다.
*/
exports.getRandom=function(n){
	return parseInt(Math.random()*n);
}

exports.getExtend=function(path){
	//파일의 확장자를 반환해주는 메서드!!
	var filename = path.substring(path.lastIndexOf("\\")+1,path.length);
	return filename.split(".")[1];

}