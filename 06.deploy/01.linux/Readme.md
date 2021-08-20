# Linux

## Linux 常用目录

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

## Linux 常用目录截图

![](\assets\dir-list.png)

## Linux 命令格式

- 严格区分大小写
- 命令 [选项] [参数]
- 当有多个选项时，可以写在一起
- 一般参数有简写有完整写法,如 --a 和--all 等效

## Linux 常用命令

## 1. 命令说明列表

<table>
	<tr>
	    <th>命令</th>
	    <th>选项</th>
	    <th>参数</th>  
	    <th>描述</th>  
	    <th>Code</th>  
	</tr>
	<tr >
	    <td rowspan="6">ls</td>
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
      <td rowspan="10">find</td>
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
</table>
## 2. ls -l 说明

显示详情信息

```js
drwxr-xr-x.  2 root root  4096 Apr 11  2018 home
```

| drwxr-xr-x     | .        | 2              | root   | root   | 4096     | Apr 11 2018  | home   |
| -------------- | -------- | -------------- | ------ | ------ | -------- | ------------ | ------ |
| 文件类型和权限 | ACL 权限 | 硬链接引用计数 | 所有者 | 所属组 | 文件大小 | 最后修改时间 | 文件名 |

