// 参考 @repcz(Luzy) 示例 Script 配置
//
// Clash Verge Rev (Version ≥ 17.2) & Mihomo-Party (Version ≥ 0.5.8)
//
// 最后更新时间: 2024-08-17 20:10

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "text",
  "interval": 86400
};

// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://latency-test.skk.moe/endpoint",
  "max-failed-times": 3,
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖通用配置
  config["mixed-port"] = "7890";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["log-level"] = "info";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";
  config["external-controller"] = "127.0.0.1:9090";
  config["external-ui"] = "ui";
  config["external-ui-url"] = "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip";

  // 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter":["+.lan", "*", "+.local"],
    "default-nameserver": ["223.5.5.5", "119.29.29.29", "system"],
    "nameserver": ["223.5.5.5", "119.29.29.29"],
    "nameserver-policy":{
      "geosite:cn": "system",
      "geosite:gfw": ["9.9.9.9", "149.112.112.112"],
      "geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]
       
        // > Modify Contents
    "blog.google": "119.29.29.29", // Google Blog
    "googletraveladservices.com": "119.29.29.29", // Google Flights
    "dl.google.com": "119.29.29.29", // Google Download
    "dl.l.google.com": "119.29.29.29", // Google Download
    "clientservices.googleapis.com": "119.29.29.29", // Google Chrome
    "update.googleapis.com": "119.29.29.29", // Google Update
    "translate.googleapis.com": "119.29.29.29", // Google Translate
    "fonts.googleapis.com": "119.29.29.29", // Google Fonts
    "fonts.gstatic.com": "119.29.29.29", // Google Fonts
    "stun.l.google.com": system // Google STUN
    "stun?.l.google.com": system // Google STUN

    // > Router Admin Panel
    "+.id.ui.direct": system // Ubiquiti Unifi Network App
    // "unifi.ui.com": system // Ubiquiti Unifi Portal
    "unifi.local": system // Ubiquiti Unifi OS
    // "network.unifi.ui.com": system // Ubiquiti Unifi Controller
    "amplifi.lan": system // Ubiquiti Amplifi Router
    "router.synology.com": system // Synology Router
    "sila.razer.com": system // Razer Sila Router
    "router.asus.com": system // Asus Router
    "routerlogin.net": system // Netgear Router
    "orbilogin.com": system // Netgear Obri Router
    "www.LinksysSmartWiFi.com": system // Linksys Router
    "LinksysSmartWiFi.com": system // Linksys Router
    "myrouter.local": system // Linksys Router
    "instant.arubanetworks.com": system // Aurba Router
    "setmeup.arubanetworks.com": system // Aurba Router
    "www.miwifi.com": system // 小米 Mi WiFi Router
    "miwifi.com": system // 小米 Mi WiFi Router
    "mediarouter.home": system // 华为 Huawei Router
    "tplogin.cn": system // TP-Link Router
    "tplinklogin.net": system // TP-Link Router
    "tplinkwifi.net": system // TP-Link Router
    "melogin.cn": system // 水星 MERCURY Router
    "falogin.cn": system // 迅捷 FAST Router
    "tendawifi.com": system // 腾达 Tenda Router
    "leike.cc": system // 磊科 Netcore Router
    "zte.home": system // 中兴 ZTE Router
    "p.to": system // 斐讯 PHICOMM Router
    "phicomm.me": system // 斐讯 PHICOMM Router
    "hiwifi.com": system // 极路由 HiWiFi Router
    "peiluyou.com": system // 迅雷路由
    "_hotspot_.m2m": system // M2M routers at MiFi Hotspot
    "hotspot.cslwifi.com": system // csl Wi-Fi

    // > Apple
    // refer: https://support.apple.com/zh-cn/HT210060
    "networking.apple": "https://doh.dns.apple.com/dns-query", // Apple
    // "+.apple.com": "https://doh.dns.apple.com/dns-query", // Apple.com
    "+.icloud.com": "https://doh.dns.apple.com/dns-query", // iCloud.com

    // > Alphabet
    // refer: https://developers.google.com/speed/public-dns/docs/doh?hl=zh-cn
    // "+.google" = "https://dns.google/dns-query", // Google
    // "+.google.com" = "https://dns.google/dns-query", // Google
    // "+.google.com.??": "https://dns.google/dns-query", // Google
    // "+.goog": "https://dns.google/dns-query", // Google sites
    // "+.gstatic.com": "https://dns.google/dns-query", // Google 静态资源
    // "+.ggpht.com": "https://dns.google/dns-query", // Google Photos
    // "+.googleusercontent.com": "https://dns.google/dns-query", // Google 用户上传数据
    // "+.googleapis.com": "https://dns.google/dns-query", // Google APIs
    // "+.1e100.net": "https://dns.google/dns-query", // Google backbone
    // "+.youtube": "https://dns.google/dns-query", // Youtube sites
    // "+.youtube.com": "https://dns.google/dns-query", // Youtube
    // "+.ytimg.com": "https://dns.google/dns-query", // Youtube 图片
    // "+.googlevideo.com": "https://dns.google/dns-query", // Youtube Video
    // "+.gvt?.com": "https://dns.google/dns-query", // Google Video Thumbnails
    // "+.recaptcha.net": "https://dns.google/dns-query", // reCaptcha
    // "+.gmail.com": "https://dns.google/dns-query", // Gmail
    // "+.googlesource.com": "https://dns.google/dns-query", // Google Source
    // "+.googleadservices.com": "https://dns.google/dns-query", // Google AD Services
    // "+.doubleclick.net": "https://dns.google/dns-query", // DoubleClick
    // "+.adsense.com": "https://dns.google/dns-query", // AdSense
    // "+.adsensecustomsearchads.com": "https://dns.google/dns-query", // AdSense Custom Search Ads
    // "+.adsenseformobileapps.com": "https://dns.google/dns-query", // AdSense for mobile apps
    // "+.gle": "https://dns.google/dns-query", // Google shortened URLs
    // "goo.gl": "https://dns.google/dns-query", // Google URL Shortener

    // > Cloudflare
    // refer: https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/
    // "+.cloudflare.com": "https://cloudflare-dns.com/dns-query", // Cloudflare
    // "+.cloudflarestream.com": "https://cloudflare-dns.com/dns-query", // Cloudflare Stream
    // "+.cloudflareclient.com": "https://cloudflare-dns.com/dns-query", // Cloudflare Client
    // "+.cloudflareinsights.com": "https://cloudflare-dns.com/dns-query", // Cloudflare Web Analytics
    // "+.every1dns.net": "https://cloudflare-dns.com/dns-query", // Cloudflare
    // "+.cloudflaressl.com": "https://cloudflare-dns.com/dns-query", // Cloudflare SSL Certificate
    // "+.cloudflare-dns.com": "https://cloudflare-dns.com/dns-query", // Cloudflare DNS
    // "+.workers.dev": "https://cloudflare-dns.com/dns-query", // CloudFlare Workers

    // > 阿里巴巴
    // refer: https://www.alidns.com
    "+.alibaba.cn": "https://dns.alidns.com/dns-query", // 阿里巴巴
    "+.alibaba.com.cn": "https://dns.alidns.com/dns-query", // 阿里巴巴
    "+.china.alibaba.com": "https://dns.alidns.com/dns-query", // Alibaba 中国
    "+.1688.com": "https://dns.alidns.com/dns-query", // 1688
    "+.taobao.com": "https://dns.alidns.com/dns-query", // 淘宝
    "+.tbcache.com": "https://dns.alidns.com/dns-query", // 淘宝 缓存
    "+.tmall.com": "https://dns.alidns.com/dns-query", // 天猫
    "+.alicdn.com": "https://dns.alidns.com/dns-query", // 阿里云 CDN
    "+.alikunlun.com": "https://dns.alidns.com/dns-query", // 阿里云 阿里昆仑
    "+.aliapp.com": "https://dns.alidns.com/dns-query", // 云引擎应用平台
    "+.aliapp.org": "https://dns.alidns.com/dns-query", // 上云平台
    "+.alibabausercontent.com": "https://dns.alidns.com/dns-query", // 阿里用户上传资料
    "+.mmstat.com": "https://dns.alidns.com/dns-query", // mmstat 数据统计 广告追踪
    "tb.cn": "https://dns.alidns.com/dns-query", // 淘宝短网址

    // > 阿里云
    "+.aliyun.+": "https://dns.alidns.com/dns-query", // 阿里云
    "+.aliyuncdn.+": "https://dns.alidns.com/dns-query", // 阿里云 CDN
    "+.aliyuncs.com": "https://dns.alidns.com/dns-query", // 阿里云 API 服务
    "+.aliyunddos????.com": "https://dns.alidns.com/dns-query", // 阿里云 DDoS防护
    "+.aliyundrive.com": "https://dns.alidns.com/dns-query", // 阿里云 阿里云盘
    "+.aliyundun.com": "https://dns.alidns.com/dns-query", // 阿里云 阿里云盾
    "+.aliyundunwaf.com": "https://dns.alidns.com/dns-query", // 阿里云盾 Web 应用防火墙
    "+.aliyun-inc.com": "https://dns.alidns.com/dns-query", // 阿里云 内部

    // > 蚂蚁集团
    // refer: https://www.alidns.com
    "+.antgroup.com": "https://dns.alidns.com/dns-query", // 蚂蚁集团
    "+.antfin.com": "https://dns.alidns.com/dns-query", // 蚂蚁金服
    "+.antfinancial.com": "https://dns.alidns.com/dns-query", // 蚂蚁金服
    "+.alipay.com": "https://dns.alidns.com/dns-query", // 支付宝
    "+.alipay.com.cn": "https://dns.alidns.com/dns-query", // 支付宝
    "+.alipaydns.com": "https://dns.alidns.com/dns-query", // 支付宝 HTTP DNS
    "+.alipayeshop.com": "https://dns.alidns.com/dns-query", // 支付宝 商家资源
    "+.alipaylog.com": "https://dns.alidns.com/dns-query", // 支付宝 Mdap
    "+.alipayobjects.com": "https://dns.alidns.com/dns-query", // 支付宝 静态资源
    "+.alipay-eco.com": "https://dns.alidns.com/dns-query", // 支付宝 开放技术生态体系

    // > 腾讯
    // refer: https://www.dnspod.cn/products/publicdns
    "+.tencent.com": "https://doh.pub/dns-query", // 腾讯
    "+.qcloud.com": "https://doh.pub/dns-query", // 腾讯云
    "+.qcloudcdn.cn": "https://doh.pub/dns-query", // 腾讯云CDN
    "+.qcloudcdn.com": "https://doh.pub/dns-query", // 腾讯云CDN
    "+.qcloudcos.com": "https://doh.pub/dns-query", // 腾讯云对象储存
    "+.qcloudimg.com": "https://doh.pub/dns-query", // 腾讯云静态资源
    "+.qcloudcjgj.com": "https://doh.pub/dns-query", // 腾讯云超级管家
    "+.qcloudwzgj.com": "https://doh.pub/dns-query", // 腾讯云网站管家
    "+.qcloudzygj.com": "https://doh.pub/dns-query", // 腾讯云主页管家
    "+.myqcloud.com": "https://doh.pub/dns-query", // 腾讯开放云
    "+.tencent-cloud.net": "https://doh.pub/dns-query", // 腾讯云
    "+.tencentcloud-aiot.com": "https://doh.pub/dns-query", // 腾讯云aiot解决方案
    "+.tencentcloudapi.com": "https://doh.pub/dns-query", // 腾讯云API
    "+.tencentcloudcr.com": "https://doh.pub/dns-query", // 腾讯云容器镜像服务TCR
    "+.tencentcloudmarket.com": "https://doh.pub/dns-query", // 腾讯云云市场
    "+.qq.com": "https://doh.pub/dns-query", // QQ
    "+.qlogo.cn": "https://doh.pub/dns-query", // 腾讯头像
    "+.qpic.cn": "https://doh.pub/dns-query", // 腾讯图片
    "+.weixin.qq.com": "https://doh.pub/dns-query", // 微信
    "+.wx.qq.com": "https://doh.pub/dns-query", // 微信
    "+.weixin.com": "https://doh.pub/dns-query", // 微信
    "+.weixinbridge.com": "https://doh.pub/dns-query", // 微信公众平台
    "+.wechat.com": "https://doh.pub/dns-query", // WeChat
    "+.servicewechat.com": "https://doh.pub/dns-query", // 微信小程序
    "+.weiyun.com": "https://doh.pub/dns-query", // 微云
    "+.gtimg.cn": "https://doh.pub/dns-query", // 腾讯 图片 静态资源
    "+.idqqimg.com": "https://doh.pub/dns-query", // 腾讯 图片 静态资源
    "+.cdn-go.cn": "https://doh.pub/dns-query", // 腾讯 静态资源 CDN
    "+.smtcdns.com": "https://doh.pub/dns-query", // 腾讯云 智能云解析DNS
    "+.smtcdns.net": "https://doh.pub/dns-query", // 腾讯云 智能云解析DNS
    "url.cn": "https://doh.pub/dns-query", // 腾讯短网址

    // > 百度
    // refer: https://dudns.baidu.com/support/localdns/Address/index.html
    "+.baidu": "180.76.76.76", // 百度
    "+.baidu.com": "180.76.76.76", // 百度
    "+.bdimg.com": "180.76.76.76", // 百度 静态资源
    "+.bdstatic.com": "180.76.76.76", // 百度 静态资源
    "+.baidupcs.*": "180.76.76.76", // 百度网盘
    "+.baiduyuncdn.*": "180.76.76.76", // 百度云CDN
    "+.baiduyundns.*": "180.76.76.76", // 百度云DNS
    "+.bdydns.*": "180.76.76.76", // 百度云 DNS
    "+.bdycdn.*": "180.76.76.76", // 百度云 CDN
    "+.bdysite.com": "180.76.76.76", // 百度云 域名
    "+.bdysites.com": "180.76.76.76", // 百度云 域名
    "+.baidubce.*": "180.76.76.76", // 百度智能云
    "+.bcedns.*": "180.76.76.76", // 百度智能云 DNS
    "+.bcebos.com": "180.76.76.76", // 百度智能云 对象存储BOS
    "+.bcevod.com": "180.76.76.76", // 百度智能云 播放器服务
    "+.bceimg.com": "180.76.76.76", // 百度智能云 图片服务
    "+.bcehost.com": "180.76.76.76", // 百度智能云 主机
    "+.bcehosts.com": "180.76.76.76", // 百度智能云 主机
    "dwz.cn": "180.76.76.76", // 百度短网址

    // > 360
    // refer: https://sdns.360.net/dnsPublic.html//course
    "+.360.cn": "https://doh.360.cn/dns-query", // 360安全中心
    "+.360safe.com": "https://doh.360.cn/dns-query", // 360安全卫士
    "+.360kuai.com": "https://doh.360.cn/dns-query", // 360快资讯
    "+.so.com": "https://doh.360.cn/dns-query", // 360搜索
    "+.360webcache.com": "https://doh.360.cn/dns-query", // 360网页快照服务
    "+.qihuapi.com": "https://doh.360.cn/dns-query", // 奇虎api
    "+.qhimg.com": "https://doh.360.cn/dns-query", // 360图床
    "+.qhimgs.com": "https://doh.360.cn/dns-query", // 360图床
    "+.qhimgs?.com": "https://doh.360.cn/dns-query", // 360图床
    "+.qhmsg.com": "https://doh.360.cn/dns-query", // 360
    "+.qhres.com": "https://doh.360.cn/dns-query", // 奇虎静态资源
    "+.qhres?.com": "https://doh.360.cn/dns-query", // 奇虎静态资源
    "+.dhrest.com": "https://doh.360.cn/dns-query", // 导航静态文件
    "+.qhupdate.com": "https://doh.360.cn/dns-query", // 360
    "+.yunpan.cn": "https://doh.360.cn/dns-query", // 360安全云盘
    "+.yunpan.com.cn": "https://doh.360.cn/dns-query", // 360安全云盘
    "+.yunpan.com": "https://doh.360.cn/dns-query", // 360安全云盘
    "urlqh.cn": "https://doh.360.cn/dns-query", // 360短网址

    // > Bytedance
    // refer: https://www.volcengine.com/docs/6758/179060
    "+.amemv.com": "180.184.1.1", // 艾特迷
    "+.bdxiguaimg.com": "180.184.1.1", // 西瓜 图片服务
    "+.bdxiguastatic.com": "180.184.1.1", // 西瓜 静态资源
    "+.byted-static.com": "180.184.1.1", // 字节跳动 UNPKG
    "+.bytedance.*": "180.184.1.1", // 字节跳动
    "+.bytedns.net": "180.184.1.1", // 字节跳动 DNS
    "+.bytednsdoc.com": "180.184.1.1", // 字节跳动 CDN 文件存储
    "+.bytegoofy.com": "180.184.1.1", // 字节跳动 Goofy
    "+.byteimg.com": "180.184.1.1", // 字节跳动 图片服务
    "+.bytescm.com": "180.184.1.1", // 字节跳动 SCM
    "+.bytetos.com": "180.184.1.1", // 字节跳动 TOS
    "+.bytexservice.com": "180.184.1.1", // 飞书企业服务平台
    "+.douyin.com": "180.184.1.1", // 抖音
    "+.douyinpic.com": "180.184.1.1", // 抖音 静态资源
    "+.douyinstatic.com": "180.184.1.1", // 抖音 静态资源
    "+.douyinvod.com": "180.184.1.1", // 抖音 静态资源
    "+.feelgood.cn": "180.184.1.1", // FeelGood平台
    "+.feiliao.com": "180.184.1.1", // 飞聊官网
    "+.gifshow.com": "180.184.1.1", // 快手
    "+.huoshan.com": "180.184.1.1", // 火山网
    "+.huoshanzhibo.com": "180.184.1.1", // 火山直播
    "+.ibytedapm.com": "180.184.1.1", // 抖音 dapm
    "+.iesdouyin.com": "180.184.1.1", // 抖音 CDN
    "+.ixigua.com": "180.184.1.1", // 西瓜视频
    "+.kspkg.com": "180.184.1.1", // 快手
    "+.pstatp.com": "180.184.1.1", // 抖音 静态资源
    "+.snssdk.com": "180.184.1.1", // 今日头条
    "+.toutiao.com": "180.184.1.1", // 今日头条
    "+.toutiao13.com": "180.184.1.1", // 今日头条
    "+.toutiao???.???": "180.184.1.1", // 今日头条 静态资源
    "+.toutiaocloud.cn": "180.184.1.1", // 头条云
    "+.toutiaocloud.com": "180.184.1.1", // 头条云
    "+.toutiaopage.com": "180.184.1.1", // 今日头条 建站
    "+.wukong.com": "180.184.1.1", // 悟空
    "+.zijieapi.com": "180.184.1.1", // 字节跳动 API
    "+.zijieimg.com": "180.184.1.1", // 字节跳动 图片服务
    "+.zjbyte.com": "180.184.1.1", // 今日头条 网页版
    "+.zjcdn.com": "180.184.1.1", // 字节跳动 CDN

    // > BiliBili
    "upos-sz-mirrorali.bilivideo.com": "https://dns.alidns.com/dns-query", // BiliBili upos视频服务器（阿里云）
    "upos-sz-mirrorali?.bilivideo.com": "https://dns.alidns.com/dns-query", // BiliBili upos视频服务器（阿里云）
    "upos-sz-mirrorali??.bilivideo.com": "https://dns.alidns.com/dns-query", // BiliBili upos视频服务器（阿里云）
    "upos-sz-mirrorbos.bilivideo.com": "180.76.76.76", // BiliBili upos视频服务器（百度云）
    "upos-sz-mirrorcos.bilivideo.com": "https://doh.pub/dns-query", // BiliBili upos视频服务器（腾讯云）
    "upos-sz-mirrorcos?.bilivideo.com": "https://doh.pub/dns-query", // BiliBili upos视频服务器（腾讯云）
    "upos-sz-mirrorcos??.bilivideo.com": "https://doh.pub/dns-query", // BiliBili upos视频服务器（腾讯云）
    "upos-sz-upcdnbd??.bilivideo.com": "180.76.76.76", // BiliBili upos视频服务器（百度云）
    "upos-sz-upcdntx.bilivideo.com": "https://doh.pub/dns-query", // BiliBili upos视频服务器（腾讯云）

    // > 🇨🇳 CHN
    // CNNIC SDNS
    // "+.gov.cn": "1.2.4.8", // 中国政府网
    // "+.政务": "1.2.4.8", // 中国政府网

    // > 🇭🇰 HKG
    // PCCW Enterprises Limited
    // "+.pccw.com": "dns1.pccw.com", // 电讯盈科
    // "+.1010.com.hk": "dns1.pccw.com", // 1O1O
    // "+.hkcsl.com": "dns1.pccw.com", // csl.
    // "+.theclub.com.hk": "dns1.pccw.com", // The CLUB by HKT
    // "+.now.com": "dns2.pccw.com", // now.com
    // "+.nowe.com": "dns2.pccw.com", // Now E
    // "+.now-tv.com": "dns2.pccw.com", // Now TV
    // "+.moov.hk": "dns3.pccw.com", // MOOV
    // "+.viu.com": "dns3.pccw.com", // viu
    // "+.viu.tv": "dns3.pccw.com", // viu tv
    // Hong Kong Cable Television Limited
    // "+.hkcable.com.hk": "dns1.hkcable.com.hk", // Hong Kong Cable Television Limited
    // "+.i-cable.com": "dns2.hkcable.com.hk", // i-CABLE
    // "+.cabletv.com.hk": "dns2.hkcable.com.hk", // CABLE TV Service
    // KDDI Hong Kong Limited
    // "+.hk.kddi.com": "apple.kdd.net.hk", // KDDI Hong Kong

    // > 🇹🇼 TWN
    // 中华电信
    "+.cht.com.tw ": "https://dns.hinet.net/dns-query", // 中华电信
    "+.hinet.net": "https://dns.hinet.net/dns-query", // 中华电信HiNet
    "+.emome.net": "https://dns.hinet.net/dns-query", // 中华电信emome
    // So-net
    // "so-net.net.tw": "ns1.so-net.net.tw", // So-net Entertainment Taiwan
    // "so-net.tw": "ns1.so-net.net.tw", // So-net Entertainment Taiwan
    // Taiwan Network Information Center
    "+.tw": "https://dns.twnic.tw/dns-query", // TWNIC DNS
    "+.taipei": "https://dns.twnic.tw/dns-query", // TWNIC DNS

    // > 🇺🇸 USA
    // Hurricane Electric
    "+.he.net": "https://ordns.he.net/dns-query", // HE.net
    }
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://github.com/xream/geoip/releases/latest/download/ipinfo.geoip.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://github.com/xream/geoip/releases/latest/download/ipinfo.country.mmdb",
    "asn": "https://github.com/xream/geoip/releases/latest/download/ipinfo.asn.mmdb"
  };

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": {
        "ports": ["443", "8443"]
      },
      "HTTP": {
        "ports": ["80", "8080-8880"],
        "override-destination": true
      },
      "QUIC": {
        "ports": ["443", "8443"]
      }
    }
  };

  // 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["8.8.8.8:53","8.8.4.4:53"]
  };

  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "手动切换",
      "type": "select",
      "proxies": ["🛰️ 自动选择", "香港节点", "美国节点", "韩国节点", "狮城节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "include-all": true,
      "icon": "https://github.com/clash-verge-rev/clash-verge-rev/raw/main/src-tauri/icons/icon.png"
    },
    {
      ...groupBaseOption,
      "name": "国外网站",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "韩国节点", "狮城节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/tugepaopao/Image-Storage/master/hand-painted/56.png"
    },
    {
      ...groupBaseOption,
      "name": "国际媒体",
      "type": "select",
      "proxies": ["狮城节点", "手动切换", "香港节点", "美国节点", "韩国节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Netflix.png"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "韩国节点", "狮城节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Apple.png"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "韩国节点", "狮城节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "韩国节点", "狮城节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://github.com/tugepaopao/Image-Storage/raw/master/cartoon/Cute/google.png"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "韩国节点", "狮城节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://github.com/tugepaopao/Image-Storage/raw/master/hand-painted/36.png"
    },
    {
      ...groupBaseOption,
      "name": "推特消息",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "韩国节点", "狮城节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Twitter.png"
    },
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "proxies": ["美国节点", "手动切换", "香港节点", "韩国节点", "狮城节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
    },    
    {
      ...groupBaseOption,
      "name": "游戏平台",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "韩国节点", "狮城节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://github.com/tugepaopao/Image-Storage/raw/master/hand-painted/35.png"
    },    
    {
      ...groupBaseOption,
      "name": "Emby",
      "type": "select",
      "include-all": true,
      "proxies": ["手动切换", "香港节点", "美国节点", "韩国节点", "狮城节点", "日本节点", "台湾节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Emby.png"
    },
    {
      ...groupBaseOption,
      "name": "广告拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Reject.orig.png"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["🔯 故障转移", "🔮 负载均衡", "手动切换", "DIRECT", "香港节点", "美国节点", "韩国节点", "狮城节点", "日本节点", "台湾节点"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Snapfish.png"
    },
    // 地区分组
    {
      ...groupBaseOption,
      "name": "香港节点",
      "type": "fallback",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": true,
      "include-all": true,
      "filter": "(?i)🇭🇰|香港|(\b(HK|Hong)\b)",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "美国节点",
      "type": "fallback",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": true,
      "include-all": true,
      "filter": "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\b(US|United States)\b)",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/United_States.png"
    },
        {
      ...groupBaseOption,
      "name": "韩国节点",
      "type": "fallback",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": true,
      "include-all": true,
      "filter": "(?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/South_Korea.png"
    },
    {
      ...groupBaseOption,
      "name": "狮城节点",
      "type": "fallback",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": true,
      "include-all": true,
      "filter": "(?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "日本节点",
      "type": "fallback",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": true,
      "include-all": true,
      "filter": "(?i)🇯🇵|日本|东京|(\b(JP|Japan)\b)",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "台湾节点",
      "type": "fallback",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": true,
      "include-all": true,
      "filter": "(?i)🇨🇳|🇹🇼|台湾|(\b(TW|Tai|Taiwan)\b)",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Taiwan.png"
    },
    {
      ...groupBaseOption,
      "name": "🛰️ 自动选择",
      "type": "url-test",
      "lazy": true,
      "interval": 300,
      "tolerance": 30,
      "hidden": true,
      "include-all": true,
      "exclude-filter": "(?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b)",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Auto_Speed.png"
    },
    {
      ...groupBaseOption,
      "name": "🔯 故障转移",
      "type": "fallback",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": true,
      "include-all": true,
      "exclude-filter": "(?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Server.png"
    },
    {
      ...groupBaseOption,
      "name": "🔮 负载均衡",
      "type": "load-balance",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": true,
      "include-all": true,
      "exclude-filter": "(?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Available.png"
    }
  ];

  // 覆盖规则集
  config["rule-providers"] = {
    "Apple CDN": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/List/non_ip/apple_cdn.conf",
      "path": "./rule-providers/apple_cdn.conf"
    },
    "云上贵州": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/List/non_ip/apple_cn.conf",
      "path": "./rule-providers/apple_cn.conf"
    },
    "Apple Service": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/List/non_ip/apple_services.conf",
      "path": "./rule-providers/apple_services.conf"
    },
    "Sogouinput": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/sogouinput.txt",
      "path": "./rule-providers/sogouinput.txt"
    },
      "Reject_non_ip": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/reject.txt",
      "path": "./rule-providers/reject.txt"
    },
    "adrules": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://adrules.top/adrules.list",
      "path": "./rule-providers/adrules.list"
    },
    "Github": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Github.list",
      "path": "./rule-providers/Github.list"
    },
    "静态CDN 域名": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://ruleset.skk.moe/Clash/domainset/cdn.txt",
    "path": "./RuleSet/cdn_domainset.txt"
    },
    "Cdn_non_ip": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://ruleset.skk.moe/Clash/non_ip/cdn.txt",
    "path": "./RuleSet/cdn_non_ip.txt"
    },
    "Google": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Google.list",
      "path": "./rule-providers/Google.list"
    },
    "YouTube": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/YouTube.list",
      "path": "./rule-providers/YouTube.list"
    },
    "Telegram": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/LucaLin233/Luca_Conf/blob/main/Surge/Rule/Telegram.list?raw=true",
      "path": "./rule-providers/Telegram.list"
    },
    "Twitter": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Twitter.list",
      "path": "./rule-providers/Twitter.list"
    },
    "Steam": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Steam.list",
      "path": "./rule-providers/Steam.list"
    },
    "Epic": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Epic.list",
      "path": "./rule-providers/Epic.list"
    },
    "AI": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/AI.list",
      "path": "./rule-providers/AI.list"
    },
    "Emby": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Emby.list",
      "path": "./rule-providers/Emby.list"
    },
    "Spotify": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Spotify.list",
      "path": "./rule-providers/Spotify.list"
    },
    "Bahamut": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Bahamut.list",
      "path": "./rule-providers/Bahamut.list"
    },
    "Netflix": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Netflix.list",
      "path": "./rule-providers/Netflix.list"
    },
    "Disney": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Disney.list",
      "path": "./rule-providers/Disney.list"
    },
    "PrimeVideo": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/PrimeVideo.list",
      "path": "./rule-providers/PrimeVideo.list"
    },
    "HBO": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/HBO.list",
      "path": "./rule-providers/HBO.list"
    },
    "OneDrive": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/OneDrive.list",
      "path": "./rule-providers/OneDrive.list"
    },
    "Microsoft": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Microsoft.list",
      "path": "./rule-providers/Microsoft.list"
    },
    "Lan": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list",
      "path": "./rule-providers/Lan.list"
    },
    "ProxyGFW": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ProxyGFW.list",
      "path": "./rule-providers/ProxyGFW.list"
    },
    "ChinaDomain": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaDomain.list",
      "path": "./rule-providers/ChinaDomain.list"
    },
    "Domestic_non_ip": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/domestic.txt",
      "path": "./rule-providers/domestic.txt"
    },
    "Direct_non_ip": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/direct.txt",
      "path": "./rule-providers/direct.txt"
    },
    "Domestic_ip": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/ip/domestic.txt",
      "path": "./rule-providers/domestic.txt"
    },
    "China_ip": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/ip/china_ip.txt",
      "path": "./rule-providers/china_ip.txt"
    }
  };

  // 覆盖规则
  config["rules"] = [
  // Process 程序规则
  // AdGuard
    "DOMAIN,injections.adguard.org,DIRECT",
    "DOMAIN,local.adguard.org,DIRECT",
  // Zoom
    "PROCESS-NAME,Zoom,国外网站",
  
  // Client
  // Proxy
    "PROCESS-NAME,*Clash*,DIRECT",
    "PROCESS-NAME,*clash*,DIRECT",
    "PROCESS-NAME,Surge*,DIRECT",
    "PROCESS-NAME,v2ray,DIRECT",
    "PROCESS-NAME,xray,DIRECT",
    "PROCESS-NAME,naive,DIRECT",
    "PROCESS-NAME,Trojan,DIRECT",
    "PROCESS-NAME,Trojan-go,DIRECT",
    "PROCESS-NAME,ss-local,DIRECT",
    "PROCESS-NAME,ssr-local,DIRECT",
    "PROCESS-NAME,privoxy,DIRECT",
    "PROCESS-NAME,leaf,DIRECT",
    "PROCESS-NAME,UUBooster,DIRECT",

  // Downloader
    "PROCESS-NAME,BaiduNetdisk,DIRECT",
    "PROCESS-NAME,*Folx*,DIRECT",
    "PROCESS-NAME,*Thunder*,DIRECT",
    "PROCESS-NAME,*DownloadService*,DIRECT",
    "PROCESS-NAME,*Soda*,DIRECT",
    "PROCESS-NAME,*p4pclient*,DIRECT",
    "PROCESS-NAME,aria2c,DIRECT",
    "PROCESS-NAME,fdm,DIRECT",
    "PROCESS-NAME,Folx,DIRECT",
    "PROCESS-NAME,NetTransport,DIRECT",
    "PROCESS-NAME,amuled,DIRECT",
    "PROCESS-NAME,Motrix.app,DIRECT",
    "DOMAIN-SUFFIX,smtp,DIRECT",
    "DOMAIN-KEYWORD,aria2,DIRECT",

  // Xunlei
    "PROCESS-NAME,Thunder,DIRECT",
    "PROCESS-NAME,ThunderVIP,DIRECT",
    "DOMAIN-SUFFIX,xunlei.com,DIRECT",

  // tailscale
    "PROCESS-NAME,tailscaled,DIRECT",
  // Parsec
    "PROCESS-NAME,parsecd,DIRECT",
  // 向日葵远程
    "PROCESS-NAME,SunloginClient_Desktop,DIRECT",
    "PROCESS-NAME,SunloginClient_Helper,DIRECT",
  // Todesk
    "DOMAIN-KEYWORD,todesk,DIRECT",
  // 百度网盘
    "PROCESS-NAME,BaiduNetdisk_mac,DIRECT",

  // BT
    "PROCESS-NAME,BitComet,DIRECT",
    "PROCESS-NAME,DownloadService,DIRECT",
    "PROCESS-NAME,qBittorrent,DIRECT",
    "PROCESS-NAME,qbittorrent-nox,DIRECT",
    "PROCESS-NAME,Transmission,DIRECT",
    "PROCESS-NAME,transmission-daemon,DIRECT",
    "PROCESS-NAME,transmission-qt,DIRECT",
    "PROCESS-NAME,uTorrent,DIRECT",
    "PROCESS-NAME,WebTorrent,DIRECT",
    "PROCESS-NAME,WebTorrent Helper,DIRECT",
    "DOMAIN-KEYWORD,announce,DIRECT",
    "DOMAIN-KEYWORD,torrent,DIRECT",
    "DOMAIN-KEYWORD,tracker,DIRECT",

  // Web Controller 网页控制器规则
  // Surge
    "DOMAIN,yasd.royli.dev,DIRECT",
  // Clash
    "DOMAIN,clash.razord.top,DIRECT",
    "DOMAIN,yacd.haishan.me,DIRECT",
  // BoxJs
    "DOMAIN,boxjs.com,DIRECT",
    "DOMAIN,boxjs.net,DIRECT",
  // Sub-Store
    "DOMAIN-SUFFIX,vercel.app,国外网站",

  // Rulesets，规则集（每 24 小时后台自动更新）
  // 规则集包含多条子规则，可以是另一个本地 list 文件，或者是一个 URL
  // 内置了两个规则集：SYSTEM 和 LAN
  // 内置规则集的具体内容可在 Surge Mac 设置界面查看
    
    "RULE-SET,云上贵州,DIRECT",
    "RULE-SET,Apple CDN,DIRECT",
    "RULE-SET,Sogouinput,广告拦截",
    "RULE-SET,Reject_non_ip,广告拦截",
    "RULE-SET,adrules,广告拦截",
    "GEOSITE,github,微软服务",
    "RULE-SET,静态CDN 域名,国外网站",
    "RULE-SET,Cdn_non_ip,国外网站",
    "RULE-SET,AI,AI",
    "RULE-SET,Apple Service,苹果服务",
    "RULE-SET,YouTube,谷歌服务",
    "RULE-SET,Google,谷歌服务",
    "RULE-SET,Telegram,电报消息",
    "RULE-SET,Twitter,推特消息",
    "RULE-SET,Steam,游戏平台",
    "RULE-SET,Epic,游戏平台",
    "RULE-SET,Emby,Emby",
    "RULE-SET,Spotify,国际媒体",
    "RULE-SET,Bahamut,国际媒体",
    "RULE-SET,Netflix,国际媒体",
    "RULE-SET,Disney,国际媒体",
    "RULE-SET,PrimeVideo,国际媒体",
    "RULE-SET,HBO,国际媒体",
    "GEOSITE,onedrive,微软服务",
    "GEOSITE,microsoft,微软服务",
    "GEOSITE,gfw,国外网站",
    "RULE-SET,ChinaDomain,DIRECT",
    "RULE-SET,Domestic_non_ip,DIRECT",
    "RULE-SET,Direct_non_ip,DIRECT",
    "RULE-SET,China_ip,DIRECT,no-resolve",
    "RULE-SET,Domestic_ip,DIRECT,no-resolve",
    "IP-CIDR,0.0.0.0/32,REJECT,no-resolve", // 自动 REJECT 保护丢包，防止应用循环请求

    "DOMAIN-SUFFIX,direct,DIRECT",
    "DOMAIN-SUFFIX,wpad,DIRECT",
    "DOMAIN-SUFFIX,localhost,DIRECT",
    "DOMAIN-SUFFIX,invalid,DIRECT",
    "DOMAIN-SUFFIX,onion,DIRECT",
    "DOMAIN-SUFFIX,test,DIRECT",
    "DOMAIN-SUFFIX,lan,DIRECT",
    "DOMAIN-SUFFIX,intranet,DIRECT",
    "DOMAIN-SUFFIX,internal,DIRECT",
    "DOMAIN-SUFFIX,private,DIRECT",
    "DOMAIN-SUFFIX,home,DIRECT",
    "DOMAIN-SUFFIX,corp,DIRECT",
    "IP-CIDR,169.254.0.0/16,DIRECT",
    "IP-CIDR,224.0.0.0/4,DIRECT",
    "IP-CIDR,240.0.0.0/4,DIRECT",
    "IP-CIDR,255.255.255.255/32,DIRECT",
    "IP-CIDR6,fc00::/7,DIRECT",
    "IP-CIDR6,fd00::/8,DIRECT",
    "IP-CIDR6,ff00::/8,DIRECT",
    "IP-CIDR6,ff01::/16,DIRECT",
    "IP-CIDR6,ff02::/16,DIRECT",
    "IP-CIDR6,ff03::/16,DIRECT",
    "IP-CIDR6,ff04::/16,DIRECT",
    "IP-CIDR6,ff05::/16,DIRECT",
    "IP-CIDR6,2001:db8::/32,DIRECT",
    "IP-CIDR6,2002::/16,DIRECT",

    
    "GEOIP,lan,DIRECT",
    "GEOIP,CN,DIRECT",
    "MATCH,漏网之鱼"
  ];

    // 
  config["host"] = {
"hosts": {
// '*.clash.dev': 127.0.0.1
// '.dev': 127.0.0.1
// 'alpha.clash.dev': '::1'
// test.com: [1.1.1.1, 2.2.2.2]
// clash.lan: clash // clash 为特别字段，将加入本地所有网卡的地址
// baidu.com: google.com // 只允许配置一个别名
  // > IPv6
  "ip6-localhost": "::1", // IPv6 Localhost
  "ip6-loopback": "::1", // IPv6 Loopback
  "ip6-localnet": "fe00::0", // IPv6 Link-Local
  "ip6-mcastprefix": "ff00::0", // IPv6 Multicast
  "ip6-allnodes": "ff02::1", // IPv6 All Nodes
  "ip6-allrouters": "ff02::2", // IPv6 All Routers
  "ip6-allhosts": "ff02::3", // IPv6 All Hosts

  // > Encrypted DNS
  "dns.google": "8.8.8.8", // https://dns.google/dns-query
  "dns64.dns.google": "2001:4860:4860::6464", // https://dns64.dns.google/dns-query
  "cloudflare-dns.com": "104.16.249.249", // https://cloudflare-dns.com/dns-query
  "1dot1dot1dot1.cloudflare-dns.com": "1.1.1.1", // 1dot1dot1dot1.cloudflare-dns.com:853
  "one.one.one.one": "1.1.1.1", // one.one.one.one:853
  "dns.alidns.com": "223.5.5.5", // https://dns.alidns.com/dns-query
  "doh.pub": "1.12.12.12", // https://doh.pub/dns-query
  "dot.pub": "1.12.12.12", // dot.pub:853
  "doh.360.cn": "23.6.48.18", // https://doh.360.cn/dns-query
  "dot.360.cn": "101.198.198.198", // dot.360.cn:853
  "dns.twnic.tw": "101.101.101.101", // https://dns.twnic.tw/dns-query
  "ordns.he.net": "74.82.42.42", // https://ordns.he.net/dns-query

  // > Modify Contents
  // "services.googleapis.cn": "74.125.193.94", // Google API Services China
  "talk.google.com": "108.177.125.188", // Firebase Cloud Messaging
  "mtalk.google.com": "108.177.125.188", // Firebase Cloud Messaging
  "alt1-mtalk.google.com": "3.3.3.3", // Firebase Cloud Messaging
  "alt2-mtalk.google.com": "3.3.3.3", // Firebase Cloud Messaging
  "alt3-mtalk.google.com": "74.125.200.188", // Firebase Cloud Messaging
  "alt4-mtalk.google.com": "74.125.200.188", // Firebase Cloud Messaging
  "alt5-mtalk.google.com": "3.3.3.3", // Firebase Cloud Messaging
  "alt6-mtalk.google.com": "3.3.3.3", // Firebase Cloud Messaging
  "alt7-mtalk.google.com": "74.125.200.188", // Firebase Cloud Messaging
  "alt8-mtalk.google.com": "3.3.3.3", // Firebase Cloud Messaging
  // "dl.google.com": "180.163.151.161", // Google CDN
  // "dl.l.google.com": "180.163.151.161", // Google CDN   
    },
  };

  // 返回修改后的配置
  return config;
}
