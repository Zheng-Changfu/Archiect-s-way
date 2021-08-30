# Nginx

## 1. Nginx 特点

- 高并发高性能
- 可扩展性好
- 高可靠性
- 热部署
- 开源许可证

## 2. Nginx 应用场景

- 静态资源服务器
- 反向代理服务
- API 接口服务

## 3. Nginx 架构

### 3.1 Nginx 工作流程

![](/assets/nginx架构图.png)

1. Nginx 在启动后，会有一个`master`进程和多个相互独立的`worker`进程
2. 接收来自外界的信号后，会向各个`worker`进程发送信号，每个进程都有可能来处理这个连接
3. `master`进程能监控`worker`进程的运行状态,当`worker`进程退出后(异常情况下),会自动启动新的`worker`进程

> worker 进程数量：一般会设置成机器(服务器)`cpu`核数,因为更多的`worker`数量，只会导致`worker`之间相互竞争`cpu`,从而带来不必要的上下文切换
>
> 使用多进程模式,不仅能提供并发率，而且`worker`之间相互独立，一个`worker`进程挂了不会影响到其他的`worker`进程

### 3.2 IO 多路复用

### 3.3 CPU 亲和

> 把 CPU 内核和 Nginx 的工作进程绑定在一起，让每个`worker`进程固定在一个 CPU 上执行，从而减少 CPU 的切换并提高缓存命中率，提供性能

![](/assets/nginx-cpu亲和.png)

### 3.4 sendfile

> sendfile:零拷贝传输模式

- 非 sendfile 模式

  ![](/assets/nginx-no-sendfile.png)

  1. 客户端发送请求，请求资源
  2. 网卡告诉 nginx 去处理资源
  3. nginx 告诉内核，去读取资源
  4. 内核会去读取硬盘中的资源
  5. 读取到的资源会放到内核的缓冲区中
  6. 内核将缓冲区中的资源放到 nginx 的缓冲区中
  7. nginx 将资源放到网卡的缓冲区中
  8. 网卡将资源返回给客户端

- sendfile 模式

  ![](/assets/nginx-sendfile.png)

  1. 客户端发送请求，请求资源
  2. 网卡告诉 nginx 去处理资源
  3. nginx 告诉内核，去读取资源
  4. 内核会去读取硬盘中的资源
  5. 读取到的资源会放到内核的缓冲区中
  6. 内核将缓冲区中的资源直接放到网卡的缓冲区中
  7. 网卡将资源返回给客户端

## 4. Nginx 配置文件

| 路径                           | 用途                     |
| ------------------------------ | ------------------------ |
| /etc/nginx/nginx.conf          | 核心配置文件             |
| /etc/nginx/conf.d/default.conf | 默认 http 服务器配置文件 |

> 一个 main 内部有一个 http
> 一个 http 下可以配置多个 server
> 一个 server 下可以配置多个 location

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
	# 在nginx访问日志中可查看详细信息
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

## 5. Nginx 请求-Flow

![](/assets/nginx-request-flow.png)

1. 客户端发送请求，请求资源
2. nginx 读取请求行、请求头、请求体
3. 分析请求地址要使用哪个 server 配置块
4. 分析请求地址命中某一个 location，重写或读取配置
5. 进行访问控制，限制每个 IP 的并发数
6. 进行权限认证判断
7. 生成内容，内容生成方式
   1. 直接返回的内容
   2. 读取硬盘文件的内容
   3. 反向代理拿到的内容
8. 进行响应过滤(gzip 压缩等)
9. 生成访问、会话日志
10. 返回内容给客户端

## 6. Nginx 的相关命令

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

## 7. 三次握手四次挥手过程

![](/assets/http-ss.png)

## 8. Nginx 访问日志

| 路径                      | 描述     |
| ------------------------- | -------- |
| /var/log/nginx/access.log | 访问日志 |
| /var/log/nginx/error.log  | 错误日志 |

### 8.1 log_format 解释

| 名称                  | 描述                     |
| --------------------- | ------------------------ |
| $remote_addr          | 客户端地址               |
| $remote_user          | 客户端用户名称           |
| $time_local           | 访问时间和时区           |
| $request              | 请求行                   |
| $status               | http 请求状态            |
| $body_bytes_sent      | 发送给客户端文件内容大小 |
| $http_referer         | 从哪个地址（来源）过来的 |
| $http_user_agent      | 用户发送请求时用的浏览器 |
| $http_x_forwarded_for | 记录代理过程             |

## 9. 实战 Nginx

## 9.1 压缩

| 名称              | 语法                      | 上下文               | 描述                               | code                              |
| ----------------- | ------------------------- | -------------------- | ---------------------------------- | --------------------------------- |
| gzip              | gizp on / off             | http,server,location | 压缩文件                           | gzip on;                          |
| gzip_static       | gzip_static on / off      | http,server,location | 先查找.gz 文件,节省 cpu 计算       | gzip_static on;                   |
| gzip_min_length   | gzip_min_length size      | http,server,location | 只压缩超过 size 大小的文件         | gzip_min_length 3k;               |
| gzip_comp_level   | gzip_comp_level [1-10]    | http,server,location | 压缩比例越高，文件被压缩的体积越小 | gzip_min_length 7;                |
| gzip_types        | gzip_types [content-type] | http,server,location | 要压缩的文件类型                   | gzip_types applicaton/javascript; |
| gzip_http_version | gzip_types [http-version] | http,server,location | 启用 gzip 压缩所需的 HTTP 最低版本 | gzip_http_version 1.1;            |

- nginx 配置

  ![](/assets/nginx-gzip-code.png)

- 包的体积 -> 压缩前

  ![](/assets/nginx-gzip-linux-off.png)

- 包的体积 -> 压缩后

  ![](/assets/nginx-gzip-linux-on.png)

- 网站资源包大小 -> 压缩前

  ![](/assets/nginx-gzip-off.png)

- 网站资源包大小 -> 压缩后

  ![](/assets/nginx-gzip-on.png)

### 9.2 内容替换

- nginx 配置

  ![](/assets/nginx-sub-filter-code.png)

- 配置后

  ![](/assets/nginx-sub-filter-result.png)

### 9.3 连接限制(暂不填写)

### 9.4 请求限制(暂不填写)

### 9.5 访问控制(暂不填写)

### 9.6 跨域

- nginx 配置

  ![](/assets/nginx-request-cross-code.png)

- nginx 配置前

  ![](/assets/nginx-html-request-code.png)

  ![](/assets/nginx-html-request-cross.png)

- nginx 配置后

  ![](/assets/nginx-html-request-result.png)

### 9.7 防盗链

- 防止网站资源被盗用
- 保证信息安全
- 防止流量过量
- 需要区别哪些请求是非正常的用户请求
- 使用`http_refer`防盗链

<table>
	<tr>
      <th>变量名</th>
	  <th>参数</th>
      <th>描述</th>
    </tr>
    <tr>
     <td rowspan="5">valid_referers</td>
     <td></td>
     <td>定义白名单列表</td>   
    </tr>
    <tr>
     <td>none</td>
     <td>没有refer来源</td>
    </tr>
    <tr>
     <td>blocked</td>
     <td>被防火墙过滤标记过的请求,非正式HTTP请求</td>
    </tr>
    <tr>
     <td>IP</td>
     <td>特定的IP地址</td>
    </tr>
    <tr>
     <td>server_names</td>	
     <td>指定的服务名称(域名)</td>
    </tr>
    <tr>
     <td>$invalid_referer</td>
     <td></td>
     <td>是否通过,0代表通过,1代表不通过</td>
    </tr>
</table>

- nginx 配置

  ![](/assets/nginx-referer-off.png)

- curl -v -e "1.15.51.4" tb-c.chengxiaohui.com/logo.jpg

- curl -v -e "http://www.baidu.com" tb-c.chengxiaohui.com/logo.jpg

  ![](/assets/nginx-referer-on.png)

## 10. 正向代理

> 代理客户端，服务端不知道实际发起请求的客户端

![](/assets/nginx-positive-proxy.png)

- 小明想访问 google，直接访问访问不到
- 通过一个代理服务器，代理服务器去访问 google 可以访问到
- 访问到的资源在通过代理服务器转发给小明
- 小明就可以看到 google 的内容了

## 11. 反向代理

> 代理服务端，客户端不知道实际提供服务的服务端

![](/assets/nginx-reverse-proxy.png)

- 小明在写代码的过程中写了很多接口
- 这些接口的前缀都是某一个域名或 IP 地址
- 实际上这些接口里面一部分接口来自 a 服务器，一部分接口来自 b 服务器的，还有一部分接口来自 c 服务器的
- 但是小明是不知道的，小明只需要把接口地址写成代理的服务器地址就可以访问到 a、b、c 三台服务器返回的接口内容了
- 实际上是通过代理服务器去转发到不同的 a、b、c 三台服务器上，响应到的内容通过代理服务器转发给小明的

### 11.1 相关变量

| 变量名                | 变量值                 | 描述                                     |
| --------------------- | ---------------------- | ---------------------------------------- |
| proxy_pass            | 要被代理到的服务器地址 | 要被代理到的服务器地址                   |
| proxy_redirect        | 重定向地址             | 重定向地址                               |
| proxy_set_header      | 要传递的信息           | 会将信息传递给应用服务器(代理到的服务器) |
| proxy_connect_timeout | 时间(秒)               | 默认超时时间                             |
| proxy_send_timeout    | 时间(秒)               | 发送超时时间                             |
| proxy_read_timeout    | 时间(秒)               | 读取超时时间                             |
|                       | $http_host             | 请求头信息                               |
|                       | $remote_addr           | 真实 IP 信息                             |

### 11.2 proxy_pass 注意点

```bash
# 1.`proxy_pass`后的url最后加上/就是绝对根路径，location中匹配的路径部分不走代理,也就是说会被替换掉
location /a/ {
    proxy_pass http://127.0.0.1/b/;
}
请求http://example.com/a/test.html 会被代理到http://127.0.0.1/b/test.html

# 2.`proxy_pass`后的url最后没有/就是相对路径，location中匹配的路径部分会走代理,也就是说会保留
location /a/ {
    proxy_pass http://127.0.0.1;
}

请求http://example/a/test.html 会被代理到http://127.0.0.1/a/test.html

# 3.在proxy_pass前面用了rewrite，这种情况下，proxy_pass是无效的
location /getName/ {
  rewrite    /getName/([^/]+) /users?name=$1 break;
  proxy_pass http://127.0.0.1;
}
```

### 11.3 反向代理实战

```bash
# 1.创建目录
mkdir /data/proxy-server

# 2.进入目录
cd /data/proxy-server

# 3.创建并编辑文件
vi 3000.js

# 4.文件内代码
const http = require('http')
const server = http.createServer((req, res) => {
 console.log(req.headers)
 res.end('3000')
})
server.listen(3000)

# 5.下载node
wget https://nodejs.org/dist/v14.17.5/node-v14.17.5-linux-x64.tar.xz

# 6.解压
tar -xvf node-v14.17.5-linux-x64.tar.xz

# 7.设置环境变量
vi ~/.bashrc

# 8.环境变量文件内配置
# /root/node-v14.17.5-linux-x64/bin为安装路径目录
export PATH=$PATH:/root/node-v14.17.5-linux-x64/bin

# 9.刷新环境变量
source ~/.bashrc

# 10.检测安装是否成功
node -v

# 11.启动node服务
node 3000.js

# 12.nginx配置
server_name  tb-c.chengxiaohui.com;
location ~ ^/api {
  proxy_pass http://localhost:3000; # 代理到的目标服务器地址
  proxy_set_header HOST $http_host; # 向后传递请求头信息
  proxy_set_header X-Real-IP $remote_addr; # 想后传递真实ip
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 向后传递代理过程
}

# 13.发送请求
curl tb-c.chengxiaohui.com/api

# 14.结果
'3000'

# 15.打印req.headers结果
{
  host: 'tb-c.chengxiaohui.com', # node服务中获取的域名地址
  'x-real-ip': '1.15.51.4', # node服务中获取到的真实ip地址
  'x-forwarded-for': '1.15.51.4', # 记录代理过程的所有ip
  connection: 'close',
  'user-agent': 'curl/7.29.0',
  accept: '*/*'
}
```

## 12. 负载均衡

### 12.1 示意图

![](/assets/nginx-upsteam.png) 

### 12.2 说明

- 使用集群是网站解决高并发、海量数据问题的常用手段。
- 当一台服务器的处理能力、存储空间不足时，不要企图去换更强大的服务器，对大型网站而言，不管多么强大的服务器，都满足不了网站持续增长的业务需求。
- 这种情况下，更恰当的做法是增加一台服务器分担原有服务器的访问及存储压力。通过负载均衡调度服务器，将来自浏览器的访问请求分发到应用服务器集群中的任何一台服务器上，如果有更多的用户，就在集群中加入更多的应用服务器，使应用服务器的负载压力不再成为整个网站的瓶颈。

### 12.3 upstream

> nginx把请求转发到后台的一组`upstream`服务池

| 类型   | 种类             |
| ------ | ---------------- |
| 语法   | upstream name {} |
| 默认   | -                |
| 上下文 | http             |

```bash
upstream changfu {
  server 127.0.0.1:3000;
  server 127.0.0.1:4000;
  server 127.0.0.1:5000;
}
```

### 12.4 分配方式

| 类型               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| 轮询（默认）       | 每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除 |
| weight（加权轮询） | 指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况 |
| ip_hash            | 每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题 |
| least_conn         | 哪个机器上连接数少就分发给谁                                 |
| url_hash(第三方)   | 按访问的URL地址来分配 请求，每个URL都定向到同一个后端 服务器上(缓存) |
| fair(第三方)       | 按后端服务器的响应时间来分配请求，响应时间短的优先分配       |
| 自定义hash         | hash自定义key                                                |

```bash
# weight;
upstream changfu{
  server 127.0.0.1:3000 weight=1;
  server 127.0.0.1:4000 weight=2;
  server 127.0.0.1:5000 weight=3;
}

# ip_hash;
upstream changfu{
  ip_hash;
  server 127.0.0.1:3000;
}

# least_conn;
upstream changfu{
  least_conn;
  server 127.0.0.1:3000;
}

# url_hash;
upstream changfu{
  url_hash;
  server 127.0.0.1:3000;
}

# fair;
upstream changfu{
  fair;
  server 127.0.0.1:3000;
}

# 自定义hash;
upstream changfu{
  hash $request_uri; # 使用请求的url作为hash值
  server 127.0.0.1:3000;
}
```

### 12.5 后端服务器调试状态

| 状态         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| down         | 当前的服务器不参与负载均衡                                   |
| backup       | 当其它节点都无法使用时的备份的服务器                         |
| max_fails    | 允许请求失败的次数,到达最大次数就会休眠                      |
| fail_timeout | 经过max_fails失败后，服务暂停的时间,默认10秒                 |
| max_conns    | 限制每个server最大的接收的连接数,性能高的服务器可以连接数多一些 |

```bash
upstream changfu {
  server localhost:3000 down;
  server localhost:4000 backup;
  server localhost:5000 max_fails=1 fail_timeout=10s;
}
```

## 13. location

### 13.1 正则表达式

| 类型  | 描述                                            |
| ----- | ----------------------------------------------- |
| .     | 匹配除换行符之外的任意字符                      |
| ?     | 重复0次或1次                                    |
| +     | 重复1次或更多次                                 |
| *     | 重复零次或多次                                  |
| ^     | 匹配字符串的开始                                |
| $     | 匹配字符串的结束                                |
| {n}   | 重复n次                                         |
| {n,}  | 重复n次或更多次                                 |
| [abc] | 匹配单个字符a或者b或者c                         |
| a-z   | 匹配a-z小写字母的任意一个                       |
| \     | 转义字符                                        |
| ()    | 用于匹配括号之间的内容，可以通过$1、$2引用      |
| \w    | 包含大 小写字母数字和下划线 相当于([0-9a-zA-Z]) |
| ...   | 还有很多                                        |

### 13.2 语法规则

- location仅匹配url,忽略参数

  ```bash
  # 以下url只会匹配 /user/get-users
  http://xxxxxx.com/user/get-users?name=1&age=2
  ```

- 前缀字符串

  ```bash
  # 常规
  location /api {}
  
  # 精确匹配 =
  location = /api {}
  
  # 匹配上后则不再进行正则表达式的匹配 ^~
  location ^~ /api {}
  ```

- 正则表达式

  ```bash
  # ~ 符号开启后，会将后面的路径作为正则去匹配
  location ~ /api/(\d+) {}
  
  # ~* 忽略大小写，会将后面的路径作为正则去匹配
  location ~* /API/(\d+) {}
  ```

### 13.3 匹配规则

- 等号类型`（=）`的优先级最高,一旦匹配成功，则不会查找其他匹配项
- `^~`类型表达式,一旦匹配成功,则不会查找其他匹配项
- 正则表达式`~`或`~*`的优先级次之,如果有多个`location`的正则能匹配的话，则使用最长的那个
- 常规字符串匹配类型按前缀匹配

![](/assets/nginx-match-rules.png) 

### 13.4 实战练习

```bash
# /etc/nginx/default.d
location ~ /T1/$ {
    return 200 '匹配到第一个正则表达式';
}
location ~* /T1/(\w+)$ {
    return 200 '匹配到最长的正则表达式';
}
location ^~ /T1/ {
    return 200 '停止后续的正则表达式匹配';
}
location  /T1/T2 {
    return 200 '最长的前缀表达式匹配';
}
location  /T1 {
    return 200 '前缀表达式匹配';
}
location = /T1 {
    return 200 '精确匹配';
}

# curl测试
/T1     # 精确匹配
/T1/    # 停止后续的正则表达式匹配
/T1/T2  # 匹配到最长的正则表达式
/T1/T2/ # 最长的前缀表达式匹配
/t1/T2  # 匹配到最长的正则表达式
```

## 14. rewrite

### 14.1 语法

| 类型   | 种类                             |
| ------ | -------------------------------- |
| 语法   | rewrite regex replacement [flag] |
| 默认   | -                                |
| 上下文 | server, location, if             |

### 14.2 语法中字段说明

| 字段        | 描述                           |
| ----------- | ------------------------------ |
| regex       | 正则表达式指的是要被改写的路径 |
| replacement | 目标要替换成哪个URL            |
| flag        | 标识                           |

```bash
# 所有的请求都会被重定向到/www/replace.html这个文件地址，并且不做后续处理，直接返回给客户端
rewrite ^(.*)$ /www/replace.html break;
```

### 14.3 flag字段说明

| flag      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| break     | 先匹配自己的location,然后生命周期会在当前的location结束,不再进行后续的匹配 |
| last      | 先匹配自己的location,然后通过rewrite规则新建一个请求再次请求服务端,重新走一遍所有的location配置 |
| redirect  | 返回302临时重定向,以后还会请求这个服务器                     |
| permanent | 返回301永久重定向,以后会直接请求永久重定向后的域名           |

### 14.4 作用

- 可以实现`url`重写和重定向
- 如果正则表达式`regexp`匹配到了请求的URL,这个URL会被后面的`replacement `替换
- `rewrite`的定向会根据他们在配置文件中出现的顺序依次执行
- 通过`flag`可以在终止定向后进一步的处理

### 14.5 用途

- URL页面跳转
- SEO优化（伪静态）
- 维护（后台维护、流量转发）
- 安全（伪静态）

### 14.6 实战练习

```bash
# /etc/nginx/default.d
location ~ ^/break {
    rewrite ^/break /test break;
    root /data/html;
}

location ~ ^/last {
    rewrite ^/last /test last;
}

location /test {
      default_type application/json;
      return 200 '{"code":0,"msg":"success"}';
}

location ~ ^/redirect {
 rewrite ^/redirect http://www.baidu.com redirect;
}

location ~ ^/permanent {
 rewrite ^/permanent http://www.baidu.com permanent;
}

# curl测试
curl http://1.15.51.4/break
curl http://1.15.51.4/last
curl http://1.15.51.4/redirect
curl http://1.15.51.4/permanent
```

