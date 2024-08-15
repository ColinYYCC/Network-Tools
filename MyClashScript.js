// 参考 Verge Rev 示例 Script 配置
//
// Clash Verg Rev Version ≥ 1.7.2
//
// 最后更新时间: 2024-08-13 21:30

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
  config["mixed-port"] = "7893";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["mode"] = "rule";
  config["log-level"] = "info";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";

  // 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": true,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter":[
      "*.lan",
      "*.direct",
      "cable.auth.com",
      "*.msftconnecttest.com",
      "*.msftncsi.com",
      "network-test.debian.org",
      "detectportal.firefox.com",
      "resolver1.opendns.com",
      "*.srv.nintendo.net",
      "*.stun.playstation.net",
      "xbox.*.microsoft.com",
      "*.xboxlive.com",
      "stun.*",
      "global.turn.twilio.com",
      "global.stun.twilio.com",
      "app.yinxiang.com",
      "injections.adguard.org",
      "local.adguard.org",
      "cable.auth.com",
      "localhost.*.qq.com",
      "localhost.*.weixin.qq.com",
      "*.logon.battlenet.com.cn",
      "*.logon.battle.net",
      "*.blzstatic.cn",
      "music.163.com",
      "*.music.163.com",
      "*.126.net",
      "musicapi.taihe.com",
      "music.taihe.com",
      "songsearch.kugou.com",
      "trackercdn.kugou.com",
      "*.kuwo.cn",
      "api-jooxtt.sanook.com",
      "api.joox.com",
      "joox.com",
      "y.qq.com",
      "*.y.qq.com",
      "streamoc.music.tc.qq.com",
      "mobileoc.music.tc.qq.com",
      "isure.stream.qqmusic.qq.com",
      "dl.stream.qqmusic.qq.com",
      "aqqmusic.tc.qq.com",
      "amobile.music.tc.qq.com",
      "*.xiami.com",
      "*.music.migu.cn",
      "music.migu.cn",
      "proxy.golang.org",
      "*.mcdn.bilivideo.cn",
      "*.cmpassport.com",
      "id6.me",
      "open.e.189.cn",
      "mdn.open.wo.cn",
      "opencloud.wostore.cn",
      "auth.wosms.cn",
      "*.jegotrip.com.cn",
      "*.icitymobile.mobi",
      "*.pingan.com.cn",
      "*.cmbchina.com",
      "*.10099.com.cn",
      "*.microdone.cn",
      "pool.ntp.org",
      "*.pool.ntp.org",
      "ntp.*.com",
      "time.*.com",
      "ntp?.*.com",
      "time?.*.com",
      "time.*.gov",
      "time.*.edu.cn",
      "*.ntp.org.cn",
      "PDC._msDCS.*.*",
      "DC._msDCS.*.*",
      "GC._msDCS.*.*"
    ],
    "default-nameserver": ["9.9.9.9", "149.112.112.112"],
    "nameserver": ["9.9.9.9", "149.112.112.112"],
    "nameserver-policy":{
      "geosite:cn": "system",
      "geosite:gfw,geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]
    }
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb"
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
      "proxies": ["🛰️ 自动选择", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "include-all": true,
      "icon": "https://github.com/clash-verge-rev/clash-verge-rev/raw/main/src-tauri/icons/icon.png"
    },
    {
      ...groupBaseOption,
      "name": "国外网站",
      "type": "select",
      "proxies": ["手动切换","香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/tugepaopao/Image-Storage/master/hand-painted/56.png"
    },
    {
      ...groupBaseOption,
      "name": "国际媒体",
      "type": "select",
      "proxies": ["手动切换","香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Netflix.png"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["手动切换","香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Apple.png"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["手动切换","香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["手动切换","香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://github.com/tugepaopao/Image-Storage/raw/master/cartoon/Cute/google.png"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["手动切换","香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://github.com/tugepaopao/Image-Storage/raw/master/hand-painted/36.png"
    },
    {
      ...groupBaseOption,
      "name": "推特消息",
      "type": "select",
      "proxies": ["手动切换","香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Twitter.png"
    },
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "proxies": ["手动切换","香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
    },    
    {
      ...groupBaseOption,
      "name": "游戏平台",
      "type": "select",
      "proxies": ["手动切换","香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
      "icon": "https://github.com/tugepaopao/Image-Storage/raw/master/hand-painted/35.png"
    },    
    {
      ...groupBaseOption,
      "name": "Emby",
      "type": "select",
      "include-all": true,
      "proxies": ["手动切换","香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "韩国节点", "🔯 故障转移", "🔮 负载均衡", "DIRECT"],
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
      "proxies": ["🔯 故障转移",  "🛰️ 自动选择", "🔮 负载均衡", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Snapfish.png"
    },
    // 地区分组
    {
      ...groupBaseOption,
      "name": "香港节点",
      "type": "fallback",
      "tolerance": 0,
      "include-all": true,
      "filter": "^(?=.*((?i)🇭🇰|香港|(\b(HK|Hong)\b))).*$",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "美国节点",
      "type": "fallback",
      "tolerance": 0,
      "include-all": true,
      "filter": "^(?=.*((?i)🇺🇸|美国|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|(\b(US|United States)\b))).*$",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/United_States.png"
    },
    {
      ...groupBaseOption,
      "name": "狮城节点",
      "type": "fallback",
      "tolerance": 0,
      "include-all": true,
      "filter": "^(?=.*((?i)🇰🇷|韩国|韓|首尔|(\b(KR|Korea)\b))).*$",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "日本节点",
      "type": "fallback",
      "tolerance": 0,
      "include-all": true,
      "filter": "^(?=.*((?i)🇯🇵|日本|川日|东京|大阪|泉日|埼玉|(\b(JP|Japan)\b))).*$",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "台湾节点",
      "type": "fallback",
      "tolerance": 0,
      "include-all": true,
      "filter": "^(?=.*((?i)🇹🇼|台湾|(\b(TW|Tai|Taiwan)\b))).*$",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Taiwan.png"
    }
 {
      ...groupBaseOption,
      "name": "韩国节点",
      "type": "fallback",
      "tolerance": 0,
      "include-all": true,
      "filter": "^(?=.*((?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b))).*$",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/South_Korea.png"
    }
 {
      ...groupBaseOption,
      "name": "🛰️ 自动选择",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "^(?=.*(.))(?!.*((?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b|(\d{4}-\d{2}-\d{2}|\d+G)))).*$'",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Auto_Speed.png"
    },
 {
      ...groupBaseOption,
      "name": "🔯 故障转移",
      "type": "fallback",
      "tolerance": 0,
      "include-all": true,
      "filter":"^(?=.*(.))(?!.*((?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b|(\d{4}-\d{2}-\d{2}|\d+G)))).*$'",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Server.png"
    },
 {
      ...groupBaseOption,
      "name": "🔮 负载均衡",
      "type": "load-balance",
      "tolerance": 0,
      "include-all": true,
      "filter": "^(?=.*(.))(?!.*((?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b|(\d{4}-\d{2}-\d{2}|\d+G)))).*$'",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Available.png"
    },

  ];

  // 覆盖规则集
  config["rule-providers"] = {
    "Lan": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list",
      "path": "./rule-providers/Lan.list"
    },
      "Sogouinput": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/sogouinput.txt",
      "path": "./rule-providers/sogouinput.txt"
    },
    "adrules": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://adrules.top/adrules.list",
      "path": "./rule-providers/adrules.list"
    },
    "Reject_non_ip": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/reject.txt",
      "path": "./rule-providers/reject.txt"
    },
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
    "常见静态 CDN": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://ruleset.skk.moe/Clash/domainset/cdn.txt",
      "path": "./rule-providers/cdn_domainset.txt"
    },
    "常见静态 CDN": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://ruleset.skk.moe/Clash/non_ip/cdn.txt",
      "path": "./rule-providers/cdn_non_ip.txt"
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
    "Github": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/GitHub/GitHub.list",
      "path": "./rule-providers/Github.list"
    },
    "Microsoft": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Microsoft.list",
      "path": "./rule-providers/Microsoft.list"
    },
    "Microsoft国内CND": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/List/non_ip/microsoft_cdn.conf",
      "path": "./rule-providers/microsoft_cdn.conf"
    },
    "ProxyMedia": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ProxyMedia.list",
      "path": "./rule-providers/ProxyMedia.list"
    },
    "ProxyGFW": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/global.txt",
      "path": "./rule-providers/ProxyGFW.list"
    },
    "ChinaDomain": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaDomain.list",
      "path": "./rule-providers/ChinaDomain.list"
    }
    "Domestic_non_ip": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/domestic.txt",
      "path": "./rule-providers/domestic.txt"
    }
    "Direct_non_ip": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/direct.txt",
      "path": "./rule-providers/direct.txt"
    }
    "Domestic_ip": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/ip/domestic.txt",
      "path": "./rule-providers/domestic.txt"
    }
    "China_ip": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/ip/china_ip.txt",
      "path": "./rule-providers/china_ip.txt"
    }
  };

  // 覆盖规则
  config["rules"] = [
    "RULE-SET,云上贵州,DIRECT",
    "RULE-SET,Apple CDN,DIRECT",
    "RULE-SET,Sogouinput,广告拦截",
    "RULE-SET,adrules,广告拦截",
    "RULE-SET,Reject_non_ip,广告拦截",
    "DOMAIN-SUFFIX,zoom.us,国外网站",
    "RULE-SET,常见静态 CDN,国外网站",
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
    "GEOSITE,github,微软服务",
    "GEOSITE,microsoft,微软服务",
    "GEOSITE,gfw,国外网站",
    "RULE-SET,ChinaDomain,DIRECT",
    "RULE-SET,Domestic_non_ip,DIRECT",
    "RULE-SET,Direct_non_ip,DIRECT",
    "RULE-SET,Domestic_ip,DIRECT",
    "RULE-SET,China_ip,DIRECT",
    "GEOIP,lan,DIRECT",
    "GEOIP,CN,DIRECT",
    "MATCH,漏网之鱼"
  ];

  // 返回修改后的配置
  return config;
}
