FROM alpine:latest

MAINTAINER  Alex s <alexander.s@gmail.com>

WORKDIR "/opt"

ADD .docker_build/iHaveARabbit /opt/bin/iHaveARabbit
ADD ./js /opt/jd
ADD ./resources /opt/resources

CMD ["/opt/bin/iHaveARabbit"]
