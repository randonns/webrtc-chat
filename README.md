# WebRTC Chat

## 디렉토리 구조

| 디렉토리명 | 설명                                 |
| ---------- | ------------------------------------ |
| docker     | 개발 환경을 구축하기 위한 Dockerfile |
| server     | Signaling 서버                       |
| client     | Web 클라이언트                       |

## 개발 환경 구축

개발을 위한 가상 환경을 구축하기 위해 Docker Desktop을 사용합니다.

- https://www.docker.com/products/docker-desktop

## 개발 환경 기동

프로젝트 루트 디렉토리(docker-compose.yml 파일이 존재하는)에서 다음 명령을 실행하면 컨테이너들이 실행됩니다.

```
$ docker compose up -d
```

최초로 실행하는 경우라면, 필요한 이미지들을 다운로드받고 만들어내는 과정들이 자동으로 이루어지므로 시간이 다소 걸릴 수 있습니다.

실행되는 컨테이너들은 다음과 같습니다. (실제 컨테이너명은 프로젝트 루트 디렉토리의 이름에 따라 달라질 수 있습니다.)

> proxy는 호스트의 80 포트와 8080 포트를 사용합니다. 해당 포트가 이미 사용중인지 확인해 주세요.

| 컨테이너명 | 역할                                                                      |
| ---------- | ------------------------------------------------------------------------- |
| server     | Signaling 서버 개발용 컨테이너. 소스 코드가 수정되면 자동으로 반영됩니다. |
| client     | Web 화면 개발용 컨테이너. 소스 코드가 수정되면 자동으로 반영됩니다.       |
| proxy      | 브라우저로부터 오는 요청을 경로에 따라 client/server로 분배합니다.        |

컨테이너가 정상적으로 실행되었는지 다음 명령으로 확인할 수 있습니다.

```
$ docker ps
```

## 개발 환경 사용

모든 컨테이너가 기동되고 나면 아래 주소들을 사용할 수 있습니다.

- http://localhost

## 개발 환경 종료

컨테이너들을 모두 종료하기 위해서는 다음 명령을 실행합니다.

```
$ docker compose stop
```

혹은 다음 명령으로 컨테이너들을 모두 종료하고 삭제할 수도 있습니다.

```
$ docker compose down
```

## 개발 환경 접근

특정 컨테이너 내부에 bash 셸을 이용해 접근하기 위해서는 다음 명령을 실행합니다.

```
$ docker exec -it [컨테이너명 or 컨테이너ID] bash
```

## 로그 조회

특정 컨테이너의 로그를 확인하기 위해서는 다음 명령을 실행합니다.

```
$ docker logs [컨테이너명 or 컨테이너ID] -f
```
