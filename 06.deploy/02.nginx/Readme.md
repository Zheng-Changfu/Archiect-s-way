# Nginx

## 1. Nginx特点

- 高并发高性能
- 可扩展性好
- 高可靠性
- 热部署
- 开源许可证

## 2. Nginx应用场景

- 静态资源服务器
- 反向代理服务
- API接口服务

## 3. Nginx架构

### 3.1 Nginx工作流程

![](\assets\nginx架构图.png) 

1. Nginx在启动后，会有一个`master`进程和多个相互独立的`worker`进程
2. 接收来自外界的信号后，会向各个`worker`进程发送信号，每个进程都有可能来处理这个连接
3. `master`进程能监控`worker`进程的运行状态,当`worker`进程退出后(异常情况下),会自动启动新的`worker`进程

> worker进程数量：一般会设置成机器(服务器)`cpu`核数,因为更多的`worker`数量，只会导致`worker`之间相互竞争`cpu`,从而带来不必要的上下文切换
>
> 使用多进程模式,不仅能提供并发率，而且`worker`之间相互独立，一个`worker`进程挂了不会影响到其他的`worker`进程

### 3.2 IO多路复用

### 3.3 CPU亲和

> 把CPU内核和Nginx的工作进程绑定在一起，让每个`worker`进程固定在一个CPU上执行，从而减少CPU的切换并提高缓存命中率，提供性能

![](\assets\nginx-cpu亲和.png) 

### 3.4 sendfile

> sendfile:零拷贝传输模式

- 非sendfile模式

  ![](\assets\nginx-no-sendfile.png)  

  1. 客户端发送请求，请求资源
  2. 网卡告诉nginx去处理资源
  3. nginx告诉内核，去读取资源
  4. 内核会去读取硬盘中的资源
  5. 读取到的资源会放到内核的缓冲区中
  6. 内核将缓冲区中的资源放到nginx的缓冲区中
  7. nginx将资源放到网卡的缓冲区中
  8. 网卡将资源返回给客户端

- sendfile模式

  ![](\assets\nginx-sendfile.png) 

  1. 客户端发送请求，请求资源
  2. 网卡告诉nginx去处理资源
  3. nginx告诉内核，去读取资源
  4. 内核会去读取硬盘中的资源
  5. 读取到的资源会放到内核的缓冲区中
  6. 内核将缓冲区中的资源直接放到网卡的缓冲区中
  7. 网卡将资源返回给客户端

## 4. Nginx配置文件

| 路径                           | 用途                   |
| ------------------------------ | ---------------------- |
| /etc/nginx/nginx.conf          | 核心配置文件           |
| /etc/nginx/conf.d/default.conf | 默认http服务器配置文件 |

```bash
# /etc/nginx/nginx.conf文件
user nginx; # 设置nginx服务的系统使用用户
worker_processes auto; # nginx的工作进程数量，一般和服务器cpu核数相等
error_log /var/log/nginx/error.log; # 错误日志的输出位置
pid /run/nginx.pid; # nginx启动后进程id的输出位置

include /usr/share/nginx/modules/*.conf; # 包含

events {
    worker_connections 1024; # 每个进程允许的最大woker连接数
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"'; # 日志记录的格式

    access_log  /var/log/nginx/access.log  main; # 默认访问的日志

    sendfile            on; # 是否开启零拷贝模式
    tcp_nopush          on; # 是否开启懒发送模式,攒够一波数据包之后在发送
    tcp_nodelay         on; # 小的数据包不等待直接传输，实时传输
    keepalive_timeout   65; # 保持连接的超时时间，单位秒
    types_hash_max_size 4096; # 影响散列表的冲突率，值越大，就会消耗更多的内存，但散列key的冲突率会降低，检索速度就更快

    include             /etc/nginx/mime.types; # 文件类型和文件后缀的对应关系
    default_type        application/octet-stream; # 以上没有处理到的文件类型，默认为二进制类型

    include /etc/nginx/default.d/*.conf; # 包含/etc/nginx/default.d/目录下的所有子配置文件
    
    
	# 服务
	# 一个main内部有一个http
	# 一个http下可以配置多个server
	# 一个server下可以配置多个location
    server {
       listen       80; # nginx默认监听的端口号
       server_name  chengxiaohui.com; # 根据server_name来匹配地址，可以是域名,ip地址
       root         /usr/share/nginx/html; # nginx的静态文件根目录
       error_page 404 /404.html; # 当状态码为404时，返回404文件,/404.html === /usr/share/nginx/html/404.html
       
       # 匹配地址：完全匹配
       location = /404.html {
       	 charset utf-8; # 配置字符集
       }

       error_page 500 502 503 504 /50x.html; # 当状态码为500/502/503/504时，返回的文件,/50x.html === /usr/share/nginx/html/50x.html
       # 匹配地址: 完全匹配
       location = /50x.html {
       }
    }
}
```

# 5. Nginx请求-Flow

![](/assets/nginx-request-flow.png) 

1. 客户端发送请求，请求资源
2. nginx读取请求行、请求头、请求体
3. 分析请求地址要使用哪个server配置块
4. 分析请求地址命中某一个location，重写或读取配置
5. 进行访问控制，限制每个IP的并发数
6. 进行权限认证判断
7. 生成内容，内容生成方式
   1. 直接返回的内容
   2. 读取硬盘文件的内容
   3. 反向代理拿到的内容
8. 进行响应过滤(gzip压缩等)
9. 生成访问、会话日志
10. 返回内容给客户端

# 6. Nginx的相关命令

```bash
# 启动
systemctl start nginx.service

# 停止
systemctl stop nginx.service

# 重启,重新加载配置文件
systemctl reload nginx.service
nginx -s reload

# 重启，不重新加载配置文件
systemctl restart nginx.service

# 检测配置是否通过测试
nginx -t
```

