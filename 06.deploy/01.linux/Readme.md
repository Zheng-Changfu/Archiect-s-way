# Linux

## 1. Linux 常用目录

| 目录      | 说明                                |
| --------- | ----------------------------------- |
| /         | 根目录                              |
| /boot     | 启动目录                            |
| /dev      | 设备文件                            |
| /etc      | 配置文件                            |
| /home     | 普通用户的家目录                    |
| /lib      | 系统库保存目录                      |
| /mnt      | 移动设备挂载目录                    |
| /media    | 光盘挂载目录                        |
| /misc     | 磁带机挂载目录                      |
| /root     | 超级用户的家目录                    |
| /tmp      | 临时目录，可以操作                  |
| /proc     | 内存的挂载点,不能直接操作           |
| /sys      | 内存的挂载点,不能直接操作           |
| /var      | 变量                                |
| /bin      | 普通命令                            |
| /sbin     | 超级用户可以执行的命令              |
| /usr/bin  | 系统软件资源目录,普通用户的系统命令 |
| /usr/sbin | 系统软件资源目录,超级用户的系统命令 |

## 2. Linux 常用目录截图

![](\assets\dir-list.png)

## 3. Linux 命令格式

- 严格区分大小写
- 命令 [选项] [参数]
- 当有多个选项时，可以写在一起
- 一般参数有简写有完整写法,如 --a 和--all 等效

## 4. Linux 常用命令

## 5. 基本命令说明列表

<table>
	<tr>
	    <th>命令</th>
	    <th>选项</th>
	    <th>参数</th>  
	    <th>描述</th>  
	    <th>Code</th>  
	</tr>
  <tr>
    <td rowspan="2">history</td>
    <td></td>
    <td></td>
    <td>查看历史命令记录</td>
    <td></td>
  </tr>
  <tr>
    <td>-c</td>
    <td></td>
    <td>清空历史命令记录</td>
    <td></td>
  </tr>
	<tr >
	    <td rowspan="7">ls</td>
	    <td></td>
	    <td>[目录/文件名]</td>
	    <td>查询目录中的内容</td>
	    <td></td>
	</tr>
	<tr>
	    <td>-a</td>
	    <td>[目录/文件名]</td>
	    <td>显示所有文件，包括隐藏文件</td>
	    <td></td>
	</tr>
	<tr>
	    <td>-l</td>
	    <td>[目录/文件名]</td>
	    <td>显示详情信息，等同于  ll</td>
	    <td></td>
	</tr>
  <tr>
    <td colspan="5">
        drwxr-xr-x --> 文件类型和权限 <br>
        . --> ACL 权限<br>
        2 --> 硬链接引用计数<br>
        root --> 所有者<br>
        root --> 所属组<br>
        4096 --> 文件大小<br>
        Apr 11 2018 --> 最后修改时间<br>
        home --> 文件名<br>
      </td>
  </tr>
	<tr>
	    <td>-d</td>
	    <td>[目录/文件名]</td>
	    <td>查看目录本身的属性而非子文件</td>
	    <td></td>
	</tr>
	<tr>
  <td>-h</td>
	    <td>[目录/文件名]</td>
	    <td>人性化的方式显示文件大小</td>
	    <td></td>
	</tr>
	<tr>
	    <td>-i</td>
	    <td>[目录/文件名]</td>
	    <td>显示inode,也就是i节点,每个节点都有ID号</td>
	    <td></td>
	</tr>
	<tr >
	    <td rowspan="2">mkdir</td>
	    <td></td>
	    <td>目录名</td>
	    <td>创建目录</td>
	    <td></td>
	</tr>
  <tr >
	    <td>-p</td>
	    <td>目录名</td>
	    <td>递归创建目录</td>
	    <td></td>
	</tr>
  <tr >
	    <td rowspan="4">cd</td>
	    <td></td>
	    <td>目录名</td>
	    <td>切换到所在目录</td>
	    <td></td>
	</tr>
  <tr >
	    <td></td>
	    <td>~</td>
	    <td>切换到家目录</td>
	    <td></td>
	</tr>
  <tr >
	    <td></td>
	    <td>.</td>
	    <td>当前目录</td>
	    <td></td>
	</tr>
  <tr >
	    <td></td>
	    <td>..</td>
	    <td>上级目录</td>
	    <td></td>
	</tr>
  <tr >
	    <td colspan="5">
        1. 相对路径是参照当前所在目录<br />
        2. 绝对路径是从根目录开始<br />
        3. 按TAB键可以补全命令和目录
      </td>
	</tr>
 <tr >
	    <td>pwd</td>
	    <td></td>
	    <td></td>
	    <td>显示当前目录</td>
	    <td></td>
	</tr>
   <tr >
	    <td >rmdir</td>
	    <td></td>
	    <td>[目录名]</td>
	    <td>删除目录</td>
	    <td></td>
	</tr>
  <tr >
	    <td rowspan="3">rm</td>
	    <td>-r</td>
	    <td>[文件/目录名]</td>
	    <td>删除目录</td>
	    <td></td>
	</tr>
   <tr >
	    <td>-f</td>
	    <td>[文件/目录名]</td>
	    <td>强制删除</td>
	    <td></td>
	</tr>
   <tr >
	    <td>-rf</td>
	    <td>[文件/目录名]</td>
	    <td>递归强制删除所有目录</td>
	    <td></td>
	</tr>
  <tr >
	    <td rowspan="5">cp</td>
      <td></td>
	    <td>[源文件][目标位置]</td>
	    <td>复制文件到目标位置下</td>
	    <td></td>
	</tr>
  <tr >
      <td>-r</td>
	    <td>[源文件][目标位置]</td>
	    <td>复制目录,默认是复制文件</td>
	    <td></td>
	</tr>
  <tr >
      <td>-p</td>
	    <td>[源文件][目标位置]</td>
	    <td>连带文件属性复制</td>
	    <td></td>
	</tr>
  <tr >
      <td>-d</td>
	    <td>[源文件][目标位置]</td>
	    <td>若源文件是链接文件，则复制链接属性</td>
	    <td></td>
	</tr>
  <tr >
      <td>-a</td>
	    <td>[源文件][目标位置]</td>
	    <td>相当于-rpd</td>
	    <td></td>
	</tr>
  <tr >
      <td>mv</td>
      <td></td>
	    <td>[源文件/源目录][目标文件/目标目录]</td>
	    <td>移动(文件/目录)或重命名(文件/目录)</td>
	    <td>
        mv 1.txt 2.txt<br>
        mv 1.txt /tmp/
      </td>
	</tr>
  <tr >
      <td>ln</td>
      <td>-s</td>
	    <td>[源文件][目标文件]</td>
	    <td>创建软链接</td>
	    <td>ln -s /root/1.txt 1.ln.txt</td>
	</tr>
  <tr >
      <td colspan="5">
        1. 类似于windows的创建快捷方式<br>
        2. 软链接拥有自己的i节点和Block块，但是数据块中只保存源文件的文件名和i节点号,并没有实际的文件数据<br>
        3. 修改任意一个文件，另一个都会改变<br>
        4. 删除源文件，软链接不能使用<br>
        5. 软链接源文件必须写绝对路径
      </td>
	</tr>
  <tr >
      <td>whereis</td>
      <td></td>
	    <td>命令名称</td>
	    <td>查找命令名称所在的文件位置</td>
	    <td>whereis cd</td>
	</tr>
  <tr >
      <td>which</td>
      <td></td>
	    <td>命令名称</td>
	    <td>查找命令名称所在的文件位置</td>
	    <td>which ls</td>
	</tr>
  <tr >
      <td rowspan="2">echo</td>
      <td></td>
	    <td></td>
	    <td>打印，理解为console</td>
	    <td>echo hello world</td>
	</tr>
  <tr >
      <td></td>
	    <td>$PATH</td>
	    <td>打印环境变量的路径</td>
	    <td>echo $PATH</td>
	</tr>
  <tr >
      <td rowspan="7">find</td>
      <td>[搜索范围/搜索条件]</td>
	    <td>[名称]</td>
	    <td>查找文件</td>
	    <td>find / </td>
	</tr>
  <tr >
      <td>-name</td>
	    <td>[搜索范围/搜索条件]</td>
	    <td>按照名称进行查找</td>
	    <td>find /root -name 1.txt</td>
	</tr>
  <tr >
      <td>-i</td>
	    <td></td>
	    <td>忽略大小写查找</td>
	    <td>find /root -iname ABC.txt</td>
	</tr>
  <tr >
      <td>通配符 *</td>
	    <td></td>
	    <td>匹配任意内容</td>
	    <td>find /root *</td>
	</tr>
   <tr >
      <td>通配符 []</td>
	    <td></td>
	    <td>匹配[]中的任意一个字符</td>
	    <td>find /root -name ab[ecf].txt</td>
	</tr>
   <tr >
      <td>通配符 ?</td>
	    <td></td>
	    <td>匹配任意一个字符</td>
	    <td>find /root -name ab?.txt</td>
	</tr>
  <tr >
      <td>-user</td>
	    <td></td>
	    <td>按所属者用户进行搜索</td>
	    <td>find /root -user root</td>
	</tr>
  <tr >
      <td rowspan="3">grep</td>
      <td>[匹配条件]</td>
	    <td>[名称]</td>
	    <td>在文件当中匹配符合条件的字符串</td>
	    <td>grep helloworld 1.txt</td>
	</tr>
  <tr >
      <td>-i</td>
	    <td></td>
	    <td>忽略大小写进行查找</td>
	    <td>grep Helloworld -i 1.txt</td>
	</tr>
   <tr >
      <td>-v</td>
	    <td></td>
	    <td>排除指定字符串</td>
	    <td></td>
	</tr>
  <tr >
      <td >zip</td>
      <td>-r</td>
	    <td>[压缩后名称][压缩目录]</td>
	    <td>压缩目录</td>
	    <td>  
        压缩: zip -r a.zip a<br>
        解压: unzip a.zip
      </td>
	</tr>
  <tr >
      <td rowspan="3">gzip</td>
      <td></td>
	    <td>文件名称</td>
	    <td>压缩为.gz格式的压缩文件,源文件会消失</td>
	    <td>gzip 1.txt</td>
	</tr>
  <tr >
      <td>-c</td>
	    <td>源文件 > 压缩文件</td>
	    <td>压缩为.gz格式的压缩文件,源文件不会消失</td>
	    <td>gzip -c 1.txt > 1.txt.gz</td>
	</tr>
  <tr >
      <td>-r</td>
	    <td>目录</td>
	    <td>压缩目录下的所有子文件，但是不压缩目录</td>
	    <td>gzip -r xx</td>
	</tr>
  <tr >
      <td>gunzip</td>
      <td></td>
	    <td>压缩文件</td>
	    <td>解压缩文件，不保留压缩包</td>
	    <td>gunzip 1.txt.gz</td>
	</tr>
  <tr >
      <td rowspan="7">tar</td>
      <td>-c</td>
	    <td>打包</td>
	    <td>打包命令</td>
	    <td></td>
	</tr>
  <tr >
      <td>-v</td>
	    <td>显示打包过程</td>
	    <td>打包命令</td>
	    <td></td>
	</tr>
  <tr >
      <td>-f</td>
	    <td>指定打包后的文件名</td>
	    <td>打包命令</td>
	    <td></td>
	</tr>
  <tr >
      <td>-cvf</td>
	    <td>打包文件名 源文件</td>
	    <td>打包命令</td>
	    <td>tar -cvf 1.tar 1.txt</td>
	</tr>
   <tr >
      <td>-xvf</td>
	    <td>打包文件名</td>
	    <td>解包命令</td>
	    <td>tar -xvf 1.tar</td>
	</tr>
  <tr >
      <td>-zcvf</td>
	    <td>打包文件名 目录名/文件名</td>
	    <td>压缩为.tar.gz格式</td>
	    <td>tar -zcvf book.tar.gz book</td>
	</tr>
  <tr >
      <td>-zxvf</td>
	    <td>包名.tar.gz</td>
	    <td>解压.tar.gz格式包</td>
	    <td>tar -zxvf book.tar.gz</td>
	</tr>
  <tr >
      <td rowspan="3">shutdown</td>
      <td>-c</td>
	    <td></td>
	    <td>取消前一个关机命令</td>
	    <td>shutdown -c</td>
	</tr>
  <tr >
      <td>-r</td>
	    <td>时间</td>
	    <td>重启</td>
	    <td>shutdown -r 06:00</td>
	</tr>
  <tr >
      <td>-h</td>
	    <td></td>
	    <td>关机</td>
	    <td>shutdown -h</td>
	</tr>
  <tr >
      <td rowspan="2">init</td>
      <td>0</td>
	    <td></td>
	    <td>关机</td>
	    <td>init 0</td>
	</tr>
  <tr >
      <td>6</td>
	    <td></td>
	    <td>重启</td>
	    <td>init 6</td>
	</tr>
  <tr >
      <td>logout</td>
      <td></td>
	    <td></td>
	    <td>退出登录</td>
	    <td>logout</td>
	</tr>
  <tr >
      <td>w</td>
      <td></td>
	    <td></td>
	    <td>查看登录用户信息</td>
	    <td>w</td>
	</tr>
  <tr>
    <td colspan="5">
        USER --> 登录的用户名<br />
        TTY --> 登录的终端 tty1 本地终端 pts/0远程终端<br />
        FROM --> 登录的IP<br>
        LOGIN --> 登录时间<br>
        IDLE --> 用户闲置时间<br>
        JCPU --> 该终端所有进程占用的时间<br>
        PCPU --> 当前进程所占用的时间<br>
        WHAT --> 正在执行的命令<br>
      </td>
  </tr>
  <tr >
      <td>who</td>
      <td></td>
	    <td></td>
	    <td>查看登录用户信息</td>
	    <td>who</td>
	</tr>
  <tr>
    <td colspan="5">
        USER --> 登录的用户名<br>
        TTY --> 登录的终端 tty1 本地终端 pts/0远程终端<br>
        LOGIN --> 登录时间和登录的IP<br>
      </td>
  </tr>
  <tr >
      <td>last</td>
      <td></td>
	    <td></td>
	    <td>查看当前登录和过去登录的用户信息 默认读取 /var/log/wtmp 文件</td>
	    <td>last</td>
	</tr>
  <tr>
    <td colspan="5">
        用户名<br>
        登录终端<br>
        登录IP<br>
        登录时间<br>
        退出时间(在线时间)<br>
      </td>
  </tr>
  <tr >
      <td>lastlog</td>
      <td></td>
	    <td></td>
	    <td>查看所有用户的最后一次登录时间</td>
	    <td>lastlog</td>
	</tr>
  <tr>
    <td colspan="5">
        用户名<br>
        登录终端<br>
        登录IP<br>
        最后一次登录时间<br>
      </td>
  </tr>
</table>

## 6. Vi 常用命令列表

<table>
  <tr>
    <th>模式</th>
    <th>参数</th>
    <th>描述</th>  
    <th>Code</th>  
	</tr>
  <tr>
    <td>打开文件</td>
    <td>文件名</td>
    <td>编辑文件</td>
    <td>vi 1.txt</td>
  </tr>
  <tr>
    <td rowspan="3">底行模式</td>
    <td>:w</td>
    <td>把内容写入保存到硬盘中</td>
    <td></td>
  </tr>
  <tr>
    <td>:q</td>
    <td>退出当前Vi编辑器打开的文件</td>
    <td></td>
  </tr>
  <tr>
    <td>:wq!</td>
    <td>强制保存并退出</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="4">插入模式</td>
    <td>i</td>
    <td>在当前位置插入</td>
    <td></td>
  </tr>
  <tr>
    <td>a</td>
    <td>在当前光标的右边插入</td>
    <td></td>
  </tr>
  <tr>
    <td>A</td>
    <td>在当前光标的右行末插入</td>
    <td></td>
  </tr>
  <tr>
    <td>s</td>
    <td>删除当前光标位置并插入</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">删除</td>
    <td>x</td>
    <td>删除当前字符</td>
    <td></td>
  </tr>
  <tr>
    <td>dd</td>
    <td>删除光标所在行</td>
    <td></td>
  </tr>
  <tr>
    <td>撤销</td>
    <td>u</td>
    <td>撤销最后执行的一次命令</td>
    <td></td>
  </tr>
  <tr>
    <td>复制</td>
    <td>yy</td>
    <td>复制光标所在的行</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">粘贴</td>
    <td>p</td>
    <td>光标所在行的下方粘贴</td>
    <td></td>
  </tr>
  <tr>
    <td>P</td>
    <td>光标所在行的上方粘贴</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">搜索</td>
    <td>/</td>
    <td>输入/可以在当前文件中查找该字符串</td>
    <td>/const</td>
  </tr>
  <tr>
    <td>n</td>
    <td>查找下一个</td>
    <td></td>
  </tr>
   <tr>
    <td>Shift+N</td>
    <td>查找上一个</td>
    <td></td>
  </tr>
</table>

## 7. 用户和用户组

### 7.1 解释说明

> 用户: 使用操作系统的人都是用户
> 用户组: 具有相同系统权限的一组用户

### 7.2 用户组操作

```bash
# 1. 创建用户组
groupadd student

# 2. 查看用户组
cat /etc/group
cat /ect/group | grep student

# 3. 修改用户组名称
groupmod student -n stu

# 4. 修改用户组编号
groupmod -g 666 stu

# 5. 创建用户组并且指定编号
groupmod -g 888 teacher

# 6. 删除用户组
groupdel teacher
```

### 7.3 用户操作

```bash
# 1. 如果创建用户的时候没有指定用户组，系统会为他创建一个和用户名相同的用户组

# 2. 添加用户组
groupadd huihuizi

# 3. 创建用户
useradd -g huihuizi zhangsan
useradd -g huihuizi lisi

# 4. 查看用户
id zhangsan

# 5. 创建用户并指定家目录
useradd -d /home/huihuizi wangwu

# 6. 设置用户密码
passwd zhangsan
passwd lisi
passwd wangwu

# 7. 修改个人家目录
usermod -d /home/wangyu wangwu

# 8. 修改用户组
usermod -g changfu wangwu

# 9. 删除用户
userdel wangwu

# 10. 删除用户并删除对应的目录
userdel -r zhangsan

```

## 8. Shell 编程 - 变量

### 8.1 解释说明

- Shell 是一个命令行解释器，它为用户提供了一个向 Linux 内核发送请求以便于运行程序的界面系统级程序
- 用户可以用 Shell 来启动、挂起、停止或者编写一些程序
- Shell 还是一个功能相当强大的编程语言，易编写、易调试、灵活性较强
- Shell 是解释型语言，在 Shell 中可以直接调用 Linux 系统命令

### 8.2 变量

- 变量默认类型都是字符串
- 可以变化的量
- 必须以字母或者下划线开头，名字中间只能由字母、数字和下划线组成
- 变量名的长度不得超过 255 个字符
- 变量名在有效范围内必须是唯一的

### 8.3 变量的分类

- 字符串
- 整型
- 浮点型
- 日期型

### 8.4 用户自定义变量

- 变量的值是自己定义的
- 变量名不能为数字开头
- 等号左右两边不能有空格

```bash
# 定义变量
name=zcf
age=18

# 输出变量值
echo $变量名

# 值默认都是字符串
x=1
y=2
z=$x+$y
echo $z # 1+2

# 赋值的时候引用变量
m="$x"2
echo $m # 12
```

### 8.5 查看变量

```bash
# 查询系统中默认所有已经生效的变量，包括系统变量，也包括自定义变量
set | grep zcf
```

### 8.6 删除变量

```bash
unset xx
```

### 8.7 环境变量

- 环境变量是全局变量，而自定义变量是局部变量
- 自定义变量会在当前的 shell 中生效，而环境变量会在当前 shell 以及子 shell 中生效
- 环境变量主要保存的是和系统操作环境相关的数据
- 变量可以自定义，但是对系统生效的环境变量名和变量作用是固定的

```bash
# 自定义环境变量
export 变量名=变量值
export envName=prod

# 仅仅用来查看环境变量，而不看到本地变量
env | grep envName

# 系统系统变量
HOSTNAME -> 主机名 -> HOSTNAME=localhost
SHELL -> 当前的shell -> SHELL=/bin/bash
HISTSIZE -> 历史命令条数 -> HISTSIZE=1000
SSH_CLIENT -> 客户端IP -> SSH_CLIENT=192.168.1.1
USER -> 当前登录的用户 -> USER=root

echo $HOSTNAME
echo $SHELL
echo $HISTSIZE
echo $SSH_CLIENT
echo $USER
```

### 8.8 位置参数变量

```bash
# 写一个求和的shell脚本
#!/bin/bash
vi sum.sh

num1=$1
num2=$2
sum=$((num1+num2))
echo $sum

sh sum.sh 1 2

# 写一个循环输出的shell脚本
vi for.sh

#!/bin/bash
# "$@" 代表命令行中的所有参数
# "$#" 代表命令行中所有参数的个数
for i in "$@"
  do
    echo i=$i
  done

sh for.sh 1 2 3 4
```

### 8.9 预定义变量

- 是脚本中已经定义好的变量，变量名不能自定义，变量作用也是固定的

> $? : 最后一次执行命令的返回状态，0 代表正确执行，非 0 代表不正确执行
>
> $$ : 当前进程的进程号(PID)

```bash
echo $?
echo $$
```

## 9. Shell 编程 - read

| 选项 | 含义                                          |
| ---- | --------------------------------------------- |
| -p   | 提示信息，在等待 read 输入时，输出提示信息    |
| -t   | 等待用户输入的秒数                            |
| -n   | 字符数，read 命令只接受指定的字符数，就会执行 |
| -s   | 隐藏输入的数据，适用于机密信息的输入          |

```bash
# 写一个让用户输入名字、性别、密码并打印出来的Shell脚本

vi read.sh

#!/bin/bash
read -p '请输入你的名字:' -t 5 name
echo -e "\n"
read -p '请输入你的性别:' -n 1 gender
echo -e "\n"
read -p '请输入你的密码' -s password
echo -e "\n"
echo $name,$gender,$password

sh read.sh
```

## 10. Shell 编程 - 流程控制

### 10.1 按照文件类型进行判断

| 选项 | 描述                       |
| ---- | -------------------------- |
| -d   | 文件是否存在并且是目录     |
| -e   | 文件是否存在               |
| -f   | 文件是否存在并且是普通文件 |

```bash
# 编写一个判断文件是否存在的shell脚本
vi exist.sh

#!bin/bash
read -p "请输入文件路径" file
[ -e $file ] && echo 'yes' || echo 'no'

sh exist.sh

# 编写一个判断路径是文件还是目录的shell脚本
vi fileOrDir.sh

```

### 10.2 按照文件权限进行判断

| 选项 | 描述                               |
| ---- | ---------------------------------- |
| -r   | 文件是否存在，并且是否拥有读权限   |
| -w   | 文件是否存在，并且是否拥有写权限   |
| x    | 文件是否存在，并且是否拥有执行权限 |

```bash
echo read >> read.txt
echo write >> write.txt
echo execute >> execute.txt

chmod u+w wirte.txt
chmod u+x execute.txt

[ -r read.txt ] && echo "read yes" || echo "read no"

[ -w write.txt ] && echo "write yes" || echo "write no"

[ -x execute.txt ] && echo "execute yes" || echo "execute no"
```

### 10.3 两个整数间的比较

| 选项              | 描述                           |
| ----------------- | ------------------------------ |
| 整数 1 -eq 整数 2 | 判断整数 1 是否和整数 2 相等   |
| 整数 1 -ne 整数 2 | 判断整数 1 是否和整数 2 不相等 |
| 整数 1 -gt 整数 2 | 判断整数 1 是否大于整数 2      |
| 整数 1 -lt 整数 2 | 判断整数 1 是否小于整数 2      |
| 整数 1 -ge 整数 2 | 判断整数 1 是否大于等于整数 2  |
| 整数 1 -le 整数 2 | 判断整数 1 是否小于等于整数 2  |

```bash
[ 2 -eq 2 ] && echo "相等" || echo "不相等"
[ 1 -ne 2 ] && echo "不相等" || echo "相等"
[ 3 -gt 2 ] && echo "3大于2" || echo "no"
[ 2 -lt 3 ] && echo "2小于3" || echo "no"
[ 2 -ge 2 ] && echo "2大于等于2" || echo "no"
[ 2 -le 2 ] && echo "2小于等于2" || echo "no"
```

### 10.4 多重条件判断

| 选项             | 描述                |
| ---------------- | ------------------- |
| 判断 1 -a 判断 2 | 逻辑与(js 中&&)     |
| 判断 1 -o 判断 2 | 逻辑或(js 中\| \| ) |
| !判断            | 逻辑非(js 中!)      |

```bash
[ 2 -gt 1 -a 1 -lt 2 ] && echo "yes" || echo "no"
[ 2 -lt 1 -o 2 -gt 1 ] && echo "yes" || echo "no"
[ ! 3 -gt 2 ] && echo "yes" || echo "no"
```

### 10.5 单分支 if 语句

- if 语句使用`fi`结尾
- [条件判断式]就是使用`test`命令进行判断，所以中括号和条件判断式之间必须有空格
- then 后面跟符合条件之后执行的程序,可以放在[]之后，用`;`分隔,也可以换行不用`;`

```bash
# 基本语法
if [条件判断];then
  代码体
fi

if [条件判断]
then
  代码体
fi

# 实例
if [ 2 -gt 1 ];then echo bigger;fi

if [ 2 -gt 1 ]
then
  echo bigger
fi

# 判断当前用户是否为root用户
vi isRoot.sh

#!/bin/bash
user=`whoami`
if [ $user == root ]
then
  echo "我是root用户"
fi
```

### 10.6 双分支 if 语句

```bash
# 基本语法
if [条件判断]
then
 代码体1
else
  代码体2
fi

# 编写一个判断路径是否为目录的shell脚本
vi isDir.sh

#!/bin/bash
read -p "请输入一个路径" dir
if [ -d $dir ]
then
   echo "$dir是目录"
else
   echo "$dir不是目录"
fi

sh isDir.sh
```

### 10.7 多分支 if 语句

```bash
# 基本语法
if [条件判断1]
then
  代码体1
elif [条件判断2]
then
  代码体2
else
  代码体3
fi

# 实例
vi manyif.sh

#!/bin/bash
read -p "请输入一个分数" score
if [ $score -gt 90 ]
then
   echo "优秀"
elif [ $score -gt 80 -a $score -le 90 ]
then
   echo "良好"
else
  echo "继续努力"
fi

sh manyif.sh
```

### 10.8 循环语句-for

```bash
# 语法
for 变量 in 值1 值2 值3
do
  代码块
done

for((i=1;i<10;i++));
do
  echo $(($i))
done
```

### 10.9 循环语句-while

```bash
# 语法
while [条件判断式]
do
  代码块
done

# 编写一个从1加到100的shell脚本
vi while.sh

#!/bin/bash
i=1
result=0
while [ $i -le 100 ]
do
  result=$(($result+$i))
  i=$(($i+1))
done
echo $result

sh while.sh
```

## 11. 软件包管理

### 11.1 软件包的分类

### 11.2 YUM 在线管理

### 11.3 YUM 命令

### 11.4 安装 Nginx

### 11.5 安装 Mongodb

### 11.6 安装 Redis

### 11.7 安装 Mysql
