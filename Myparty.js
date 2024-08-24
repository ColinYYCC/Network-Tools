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
 function main(config, profileName) {
  // 检查 config 中是否有 proxy-providers 属性
  if (config['proxy-providers']) {
    // 遍历每个代理提供者
    Object.keys(config['proxy-providers']).forEach(provider => {
      const providerConfig = config['proxy-providers'][provider];
      
      // 检查是否有 url 属性，并进行替换
      if (providerConfig.url) {
        switch (provider) {
          case '订阅一':
            providerConfig.url = "自己的订阅链接1";
            break;
          case '订阅二':
            providerConfig.url = "自己的订阅链接2";
            break;
          default:
            console.warn(`未知的代理提供者: ${provider}`);
            break;
        }
      }
    });
  };

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
    "fake-ip-range": "28.0.0.1/18",
    "fake-ip-filter": ["+.lan", "*", "+.local"],
    "default-nameserver": ["9.9.9.9", "149.112.112.112", "system"],
    "nameserver": ["9.9.9.9", "149.112.112.112"],
    "nameserver-policy": {
      "geosite:cn": "system",
      "geosite:gfw": ["9.9.9.9", "149.112.112.112"],
      "geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]
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
  config["geo-auto-update"] = true;
  config["geo-update-interval"] = 24;

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
      "exclude-filter": "^(?=.*(.))(?!.*((?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b|(\d{4}-\d{2}-\d{2}|\dG))))",
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
      "exclude-filter": "(?!.*((?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b|(\d{4}-\d{2}-\d{2}|\dG))))",
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
      "exclude-filter": "(?!.*((?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b|(\d{4}-\d{2}-\d{2}|\dG))))",
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
      "reject_domainset": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/domainset/reject.txt",
      "path": "./rule-providers/reject_domainset.txt"
    },
    "reject_extra_domainset": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/domainset/reject_extra.txt",
      "path": "./rule-providers/reject_domainset_extra.txt"
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
    "RULE-SET,reject_domainset,广告拦截",
    "RULE-SET,reject_extra_domainset,广告拦截",
    "GEOSITE,github,国外网站",
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

  // 代理组最大倍率
const multipliers = { "低倍率分组名称(自行修改)": 1.0, "中倍率分组名称(自行增删)": 2.5 };
// 剔除代理节点名称中不含倍率信息的节点
const multipliersOnly = false;
// 正则表达式
const regex = /(\d+(\.\d*)?) *?([xX✕✖⨉]|倍率?)/m;

function main(config) {
  const removed = []; // 过滤后不含任何节点将被移除的group
  config["proxy-groups"] = (config["proxy-groups"] ?? [])
    .map(group => {
      if (multipliers[group?.name]) {
        group["proxies"] = (group["proxies"] ?? []).filter(proxy => {
          const multiplier = regex.exec(proxy)?.[1];
          return multipliersOnly
            ? multiplier !== undefined && Number(multiplier) <= multipliers[group.name]
            : multiplier === undefined || Number(multiplier) <= multipliers[group.name];
        });
        if (group["proxies"]?.length > 0) {
          return group;
        }
        removed.push(group.name);
      } else {
        return group;
      }
    })
    .filter(Boolean);
  if (removed.length > 0) {
    // 移除代理组的引用
    config["proxy-groups"].forEach(group => {group["proxies"] = group["proxies"].filter(proxy => !removed.includes(proxy));});
    // 移除规则的引用
    config["rules"] = (config["rules"] ?? []).filter(rule => rule && removed.every(name => !rule.endsWith(name) && !rule.endsWith(`${name},no-resolve`)));
  }

  // 返回修改后的配置
  return config;
}
