/*
node.js가 자바스크립트이기는 하나, 기존 자바스크립트에는 없는 기능들이 있다.
그중 전역변수와 전역함수를 학습하자!!!
__filename :현재 실행하고있는 파일의 완전한(full) 경로
__dirname :  현제 실행하고있는 파일의 디렉토리 경로

*/

console.log("__filename 은 "+__filename);
console.log("__dirname 은 "+__dirname); //디렉토리 풀 경로

/*
__filename을 이용한 경로에서 파일명만 출력하세요.

파일명과 확장자를 분리하여 출력하시오.
*/

var path=__filename;

var filename= path.substring( path.lastIndexOf("\\")+1, path.length );
console.log("file명은 "+filename);

var n = filename.split(".");//"."을 기준으로 나누어진 string에 대한 n이라는 배열이 반환
console.log(n);
console.log(n[0]);
console.log(n[1]);