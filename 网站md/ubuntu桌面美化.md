# ubuntu环境配置

### 先要安装ubuntu tweak tool

`sudo add-apt-repository ppa:tualatrix/ppa `

`sudo apt-get update `

`sudo apt-get install ubuntu-tweak `

###安装**flatabulous-theme**

`sudo add-apt-repository ppa:noobslab/themes`

`sudo apt-get update`

`sudo apt-get install flatabulous-theme`

### 好看的图标ultra-flat-icons

`sudo add-apt-repository ppa:noobslab/icons `

`sudo apt-get update`

`sudo apt-get install ultra-flat-icons	`

然后在搜索中找tw就好了。

[参考链接](https://www.jianshu.com/p/4bd2d9b1af41)

### dock栏设置

`sudo apt-get install cairo-dock`

然后在bash里输入cairo-dock就好了。

### 然后是状态栏显示负载情况

`sudo apt-get install -y indicator-multiload `

### 扶墙设置，配合shadowsock

首先需要安装pip

`sudo apt-get install python-pip`

`sudo apt-get install shadowsocks`

`vim /ect shadowsocks.json`

填好服务器和密码之后

`sslocal -c /etc/shadowsocks.json`

启动ss之后，由于ss是基于socks5的，很多http协议的需要转换。这里不表，毕竟我更多的还是用chrome。chrome需要配合[switchyomege](https://github.com/FelisCatus/SwitchyOmega/releases)来一起使用，这个是github链接，可以提供offline的crx下载。下载好之后需要修改代理规则，先配置一个ss<==全局的，然后选择自动代理（auto switch），规则列表格式是AutoProxy，规则列表是https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt。修改规则列表规则,选ss就好了。现在应该就能访问google了。

#####shadowsock开机自启动

可以在/home目录下新建一个sh文件，shadow.sh

```！/bin/bash
#！/bin/bash
#shadow.sh
sslocal -c /etc/shadowsocks.json
```

然后是添加到开机自启动，需要在root权限下修改/etc/rc.local文件，sudo -i可以切换成root用户，在倒数第二行添加`nohup bash /home/shadow.sh>/home/d.txt &`就好了，reboot试一下，如果d.txt里报找不到sslocal的错误的话，需要将/usr/local/bin下面的sslocal和ssserver两个文件cp到/bin目录下，这样就应该没问题了。enjoy。



### 终端美化，安装zsh

