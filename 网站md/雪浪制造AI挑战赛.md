# 这是第二篇，天池[雪浪制造AI挑战赛](https://tianchi.aliyun.com/competition/introduction.htm?raceId=231666)记录

距离上次第一篇，恍惚间一个月就过去了。一个多月写一篇，也是有点拖稿啊，(摊手┑(￣Д ￣)┍，没办法，太懒了啊，而且还是在没有人约束的情况下。日记因为每天写还可以坚持，看来自己不喜欢反思记录的毛病还是没有改啊，慢慢来慢慢来。

首先吧，八月份在天池网站上看到雪浪的比赛，便叫上鹏飞和我一起打，之前鹏飞又跟我提过说要打比赛叫他，而且看看身边的同学，能叫上打比赛也可能只有他了吧，毕竟在这样一个学校里，他们都想着怎么学行测、申论，怎么考银行、公务员了吧，算，不吐槽学校了。毕竟银行公务员也算是个不错的选择了吧。

## 比赛介绍

这是一个cv的比赛，有关于布匹检测的，也就是纺织厂纺织出来的布匹希望直接通过计算机来检测合不合格，而且不合格的分类很多啊，总共三个zip包，每个zip包里都是好几十个不合格分类，除了常见的撕裂之外，还有一些比如缺线啊什么我们俩肉眼都分不清的图片😂，而且好多不合格分类里就给了一两张图片，自然比赛的第一阶段是二分类，即只要检测合格与否，无需给出错误目标位置信息。而比赛第二阶段才是目标检测，总之，先过了第一阶段比赛好了。

## 比赛一阶段——二分类

刚开始我们也没怎么看，就想着肯定是yolo啊、faster RCNN这些，便又把这些模型有熟悉了一遍，又是再把tensorflow那本书拿出来看了一遍，也知道是迁移学习，但最后写起代码来，总结的代码十分的ugly，而且把那tensorflow一遍一遍看，却还是不会迁移学习代码怎么写，网上的资料也是百花齐放，看的很晕。

鹏飞最后写了个demo，结果跑着跑着权重全为0了，我看了一下他的代码。。。。emmm，确实有那么点辣眼睛。最后他有些受不了，于是去求助了信哥（大佬，从研一就开始打比赛，不知道打过多少），信哥今年暑假要去参加北大的那个deepcamp夏令营，而且也才写了个demo，跑了之后0.83好像是，最后他说到干脆把队和了吧，他马上去deepcamp也没多大时间顾及比赛了，所以就和了，再加上他的一个队友。

自然和了之后，也拿到了他写的demo代码，啊，才会觉得tensorflow写起来还是很麻烦啊，于是赶紧开始系统的看keras，看完keras，再看代码，发现原来也不麻烦啊迁移学习。于是之后所有的小改进都是基于信哥这个demo的，所以啊，萌新还是得多看别人的代码，以前那个以为「自己创造最牛逼，别人写的全不看」的想法真是要不得。。。一是你能不能写出完成目标的代码，二是你写的代码是否优美，用python写的是否足够pythonic。再一个就是很多的包，看别人用才知道还有这么一个包这么好用。扯远了。。。。

总结一下信哥的代码吧，其实很简单，就是各种keras自带的模型的迁移学习，加上几个知名的loss，比赛方给的图片很大（1920×2560×3），估计是员工直接用手机拍的，信哥大致就是直接resize成600×600×3再放到模型里去训练，给了earlystopping 等等，但训练后一直上不去，最高也就0.83，deepcamp给他们提供了P40，信哥没用，于是自己也算用过这块神卡了哈。想着直接跑跑原图来着，但神卡也无能为力啊，于是最后像素各除以2跑了之后也才0.84左右，看来还得想其他方法。

#### 切割

鹏飞从那个交流群里看有人用切割提升了可多，于是着手考虑把原图切割成多张图片，训练集根据给的瑕疵范围切割，尽量把瑕疵部分切到同一张图片里，测试集标准切，即一张图切成12张图，分别对着12张图跑出一个结果，最后取最大值。这样切过之后准确率便达到了0.89，算是一个比较大的提升了吧。排名也来到了60+开外。

#### 结果

在8月3号的时候，比赛方换了一波数据集，最后以这个数据集的排名前100进决赛，也就是第二阶段，当时我们的前一个数据集排名是在92，所以也会有点悬，于是等着换数据看最终结果。我在处理第二次放出来的数据是，无意中瞥见「队伍已淘汰」，这样一句话，倍感意外，突然想到是不是我没有认证，因为之前比赛页面有提醒说「不认证会导致全队淘汰」，可我是阿里云学生用户，实名、学生都已认证了啊便没有多想，所以我谨慎的点击自己的头像，果不其然在那看到一个认证的按钮，而认证也只是点一下刷新了一下页面的事情，就过去了。我意识到自己犯了一个会让同伴这十几天辛苦白费的错误，赶紧到论坛里发文，论坛里有很多人再说这个事，也有很多队被淘汰，于是我也发了一贴：

> 我是队伍第四人，也是支付宝、阿里云的使用者。支付宝、阿里云均已实名，阿里云甚至都已经通过了学生认证。当看到要实名的时候，我以为天池这是阿里云旗下的，应该已经过了，便没有在管。结果今天得到这样的结果。认证的方式也是只是点了一下那个按钮。而且作为队伍第四人，我站内信、邮箱均没有收到要完善实名的信息，我知道这也算是借口，没有认证就是没有认证，我也明白实名制也是为了保护个人信息。那能不能换一个手段，没有实名的从队伍除名就好，别连累了队友一块。队友也算是为这个比赛付出了很多，结果因为我，功亏一篑。

发完贴之后赶紧到微信群里道歉：

> 我之前以为我认证了，然后刚刚看主页发现并没有。结果造成现在「队伍已淘汰」这样的结果。是我的问题，很对不起大家，刚在论坛发帖联系了「天池壮壮」，也不知道后续的结果会是怎样，真的很对不起。

自然官方没有理会我的乞求，毕竟人微言轻，于是第一次比赛便以这样的结局收尾，再次对其他三位小伙伴感到对不起。然后得到的证书便是「92/2403」。这就是第一次的比赛。

#### 总结

因为是第一次的cv比赛，所以自己学到了很多，先是对工具tensorflow、keras的了解，还是觉得了解tensorflow后再学keras，但可不敢说tf、keras学的弄得很明白了，还有很多的特性没有掌握，关于cv，之前学Ng的课，自以为学的还不错，可是一到实际时，还是会傻眼，理论和工程还是有很大的区别的，还是得多看大佬写代码，码代码也是一个先模仿再谈创造的一个过程啊，信哥也是因为工程很厉害才成为offer收割机的啊，能在实现工程细节的同时在理论大局上有个很明晰的定位，真的是一种太强太强的能力了。仔细想来，打比赛也是在不断的用其他人模型、其他人的权重，发明一个新的模型，新的loss，不存在的，可能那就是论文的事情了，但就比赛而言，选择最好的模型，得到很理想的结果，就很棒了。而这一切的前提就是工程能力很强了吧，而现在对于我而言，「理论」、「工程」都还菜到要死，所以加油努力呗~



   