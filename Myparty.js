// Mihomo Party 覆写 / Clash Verge Rev 扩展脚本
// 参考 yy（@yyhhyyyyyy）&SakkuW（@SukkaW）的配置

function main (params) {
    if (!params.proxies) return params;
    overwriteBasicOptions (params);
    overwriteDns (params);
    overwriteFakeIpFilter (params);
    overwriteNameserverPolicy (params);
    overwriteHosts (params);
    overwriteTunnel (params);
    overwriteProxyGroups (params);
    overwriteRules (params);
    return params;
}

// 覆写Basic Options
function overwriteBasicOptions (params) {
    const otherOptions = {
        "mixed-port": 7897,
        "allow-lan": true,
        mode: "rule",
        "log-level": "warning",
        ipv6: true,
        "find-process-mode": "strict",
        profile: {
            "store-selected": true,
            "store-fake-ip": true,
        },
        "unified-delay": true,
        "tcp-concurrent": true,
        "global-client-fingerprint": "chrome",
        sniffer: {
            enable: true,
            sniff: {
                HTTP: {
                    ports: [80, "8080-8880"],
                    "override-destination": true,
                },
                TLS: {
                    ports: [443, 8443],
                },
                QUIC: {
                    ports: [443, 8443],
                },
            },
            "skip-domain": ["Mijia Cloud", "+.push.apple.com"]
        },
    };
    Object.keys (otherOptions).forEach ((key) => {
        params [key] = otherOptions [key];
    });
}

// 覆写DNS
function overwriteDns (params) {
    const dnsList = [
        "https://dns11.quad9.net/dns-query",
        "https://doh.pub/dns-query",
    ];

    const proxyDnsList = [
        "https://dns11.quad9.net/dns-query",
        "https://doh.pub/dns-query",
    ];

    const dnsOptions = {
        enable: true,
        "prefer-h3": true,
        ipv6: false,
        "enhanced-mode": "fake-ip",
        "fake-ip-range": "198.18.0.1/16",
        "respect-rules": true,
        nameserver: dnsList,
        "proxy-server-nameserver": proxyDnsList,
    };
    params.dns = { ...dnsOptions };
}

// 覆写DNS.Fake IP Filter
function overwriteFakeIpFilter (params) {
    const fakeIpFilter = [
        "+.+m2m",
        "+.$injections.adguard.org",
        "+.$local.adguard.org",
        "+.+bogon",
        "+.+lan",
        "+.+localdomain",
        "+.home.arpa",
        "+.10.in-addr.arpa",
        "+.16.172.in-addr.arpa",
        "+.17.172.in-addr.arpa",
        "+.18.172.in-addr.arpa",
        "+.19.172.in-addr.arpa",
        "+.20.172.in-addr.arpa",
        "+.21.172.in-addr.arpa",
        "+.22.172.in-addr.arpa",
        "+.23.172.in-addr.arpa",
        "+.24.172.in-addr.arpa",
        "+.25.172.in-addr.arpa",
        "+.26.172.in-addr.arpa",
        "+.27.172.in-addr.arpa",
        "+.28.172.in-addr.arpa",
        "+.29.172.in-addr.arpa",
        "+.30.172.in-addr.arpa",
        "+.31.172.in-addr.arpa",
        "+.168.192.in-addr.arpa",
        "+.254.169.in-addr.arpa",
        "dns.msftncsi.com",
        "*.srv.nintendo.net",
        "*.stun.playstation.net",
        "xbox.*.microsoft.com",
        "*.xboxlive.com",
        "*.turn.twilio.com",
        "*.stun.twilio.com",
        "stun.syncthing.net",
        "stun.*"
    ];
    params.dns["fake-ip-filter"] = fakeIpFilter;
}

// 覆写DNS.Nameserver Policy
function overwriteNameserverPolicy (params) {
    const nameserverPolicy = {
        // > Modify Contents
        "blog.google": "119.29.29.29",
        "googletraveladservices.com": "119.29.29.29",
        "dl.google.com": "119.29.29.29",
        "dl.l.google.com": "119.29.29.29",
        "clientservices.googleapis.com": "119.29.29.29",
        "update.googleapis.com": "119.29.29.29",
        "translate.googleapis.com": "119.29.29.29",
        "fonts.googleapis.com": "119.29.29.29",
        "fonts.gstatic.com": "119.29.29.29",
        "stun.l.google.com": ['system://', 'system', 'dhcp://system'],
        "stun?.l.google.com": ['system://', 'system', 'dhcp://system'],

        // > Router Admin Panel
        // "+.id.ui.direct": ['system://', 'system', 'dhcp://system'], 
        // "unifi.ui.com": ['system://', 'system', 'dhcp://system'], 
        "unifi.local": ['system://', 'system', 'dhcp://system'], 
        // "network.unifi.ui.com": ['system://', 'system', 'dhcp://system'], 
        "amplifi.lan": ['system://', 'system', 'dhcp://system'], 
        "router.synology.com": ['system://', 'system', 'dhcp://system'], 
        "sila.razer.com": ['system://', 'system', 'dhcp://system'], 
        "router.asus.com": ['system://', 'system', 'dhcp://system'], 
        "routerlogin.net": ['system://', 'system', 'dhcp://system'], 
        "orbilogin.com": ['system://', 'system', 'dhcp://system'], 
        "www.LinksysSmartWiFi.com": ['system://', 'system', 'dhcp://system'], 
        "LinksysSmartWiFi.com": ['system://', 'system', 'dhcp://system'], 
        "myrouter.local": ['system://', 'system', 'dhcp://system'], 
        "instant.arubanetworks.com": ['system://', 'system', 'dhcp://system'], 
        "setmeup.arubanetworks.com": ['system://', 'system', 'dhcp://system'], 
        "www.miwifi.com": ['system://', 'system', 'dhcp://system'], 
        "miwifi.com": ['system://', 'system', 'dhcp://system'], 
        "mediarouter.home": ['system://', 'system', 'dhcp://system'], 
        "tplogin.cn": ['system://', 'system', 'dhcp://system'], 
        "tplinklogin.net": ['system://', 'system', 'dhcp://system'], 
        "tplinkwifi.net": ['system://', 'system', 'dhcp://system'], 
        "melogin.cn": ['system://', 'system', 'dhcp://system'], 
        "falogin.cn": ['system://', 'system', 'dhcp://system'], 
        "tendawifi.com": ['system://', 'system', 'dhcp://system'], 
        "leike.cc": ['system://', 'system', 'dhcp://system'], 
        "zte.home": ['system://', 'system', 'dhcp://system'], 
        "p.to": ['system://', 'system', 'dhcp://system'], 
        "phicomm.me": ['system://', 'system', 'dhcp://system'], 
        "hiwifi.com": ['system://', 'system', 'dhcp://system'], 
        "peiluyou.com": ['system://', 'system', 'dhcp://system'], 
        "_hotspot_.m2m": ['system://', 'system', 'dhcp://system'], 
        "hotspot.cslwifi.com": ['system://', 'system', 'dhcp://system'], 

        // > Apple
        // refer: https://support.apple.com/zh-cn/HT210060
        "networking.apple": "https://doh.dns.apple.com/dns-query",
        "+.apple.com": "https://doh.dns.apple.com/dns-query",
        "+.icloud.com": "https://doh.dns.apple.com/dns-query",

        // > Alphabet
        // refer: https://developers.google.com/speed/public-dns/docs/doh?hl=zh-cn
        // "+.google": "https://dns.google/dns-query",
        // "+.google.com": "https://dns.google/dns-query",
        // "+.google.com.??": "https://dns.google/dns-query",
        // "+.goog": "https://dns.google/dns-query",
        // "+.gstatic.com": "https://dns.google/dns-query",
        // "+.ggpht.com": "https://dns.google/dns-query",
        // "+.googleusercontent.com": "https://dns.google/dns-query",
        // "+.googleapis.com": "https://dns.google/dns-query",
        // "+.1e100.net": "https://dns.google/dns-query",
        // "+.youtube": "https://dns.google/dns-query",
        // "+.youtube.com": "https://dns.google/dns-query",
        // "+.ytimg.com": "https://dns.google/dns-query",
        // "+.googlevideo.com": "https://dns.google/dns-query",
        // "+.gvt?.com": "https://dns.google/dns-query",
        // "+.recaptcha.net": "https://dns.google/dns-query",
        // "+.gmail.com": "https://dns.google/dns-query",
        // "+.googlesource.com": "https://dns.google/dns-query",
        // "+.googleadservices.com": "https://dns.google/dns-query",
        // "+.doubleclick.net": "https://dns.google/dns-query",
        // "+.adsense.com": "https://dns.google/dns-query",
        // "+.adsensecustomsearchads.com": "https://dns.google/dns-query",
        // "+.adsenseformobileapps.com": "https://dns.google/dns-query",
        // "+.gle": "https://dns.google/dns-query",
        // "goo.gl": "https://dns.google/dns-query",

        // > Cloudflare
        // refer: https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/
        // "+.cloudflare.com": "https://cloudflare-dns.com/dns-query",
        // "+.cloudflarestream.com": "https://cloudflare-dns.com/dns-query",
        // "+.cloudflareclient.com": "https://cloudflare-dns.com/dns-query",
        // "+.cloudflareinsights.com": "https://cloudflare-dns.com/dns-query",
        // "+.every1dns.net": "https://cloudflare-dns.com/dns-query",
        // "+.cloudflaressl.com": "https://cloudflare-dns.com/dns-query",
        // "+.cloudflare-dns.com": "https://cloudflare-dns.com/dns-query",
        // "+.workers.dev": "https://cloudflare-dns.com/dns-query",

        // > 阿里巴巴
        // refer: https://www.alidns.com
        "+.alibaba.cn": "https://dns.alidns.com/dns-query",
        "+.alibaba.com.cn": "https://dns.alidns.com/dns-query",
        "+.china.alibaba.com": "https://dns.alidns.com/dns-query",
        "+.1688.com": "https://dns.alidns.com/dns-query",
        "+.taobao.com": "https://dns.alidns.com/dns-query",
        "+.tbcache.com": "https://dns.alidns.com/dns-query",
        "+.tmall.com": "https://dns.alidns.com/dns-query",
        "+.alicdn.com": "https://dns.alidns.com/dns-query",
        "+.alikunlun.com": "https://dns.alidns.com/dns-query",
        "+.aliapp.com": "https://dns.alidns.com/dns-query",
        "+.aliapp.org": "https://dns.alidns.com/dns-query",
        "+.alibabausercontent.com": "https://dns.alidns.com/dns-query",
        "+.mmstat.com": "https://dns.alidns.com/dns-query",
        "tb.cn": "https://dns.alidns.com/dns-query",

        // > 阿里云
        "+.aliyun.+": "https://dns.alidns.com/dns-query",
        "+.aliyuncdn.+": "https://dns.alidns.com/dns-query",
        "+.aliyuncs.com": "https://dns.alidns.com/dns-query",
        "+.aliyunddos????.com": "https://dns.alidns.com/dns-query",
        "+.aliyundrive.com": "https://dns.alidns.com/dns-query",
        "+.aliyundun.com": "https://dns.alidns.com/dns-query",
        "+.aliyundunwaf.com": "https://dns.alidns.com/dns-query",
        "+.aliyun-inc.com": "https://dns.alidns.com/dns-query",

        // > 蚂蚁集团
        // refer: https://www.alidns.com
        "+.antgroup.com": "https://dns.alidns.com/dns-query",
        "+.antfin.com": "https://dns.alidns.com/dns-query",
        "+.antfinancial.com": "https://dns.alidns.com/dns-query",
        "+.alipay.com": "https://dns.alidns.com/dns-query",
        "+.alipay.com.cn": "https://dns.alidns.com/dns-query",
        "+.alipaydns.com": "https://dns.alidns.com/dns-query",
        "+.alipayeshop.com": "https://dns.alidns.com/dns-query",
        "+.alipaylog.com": "https://dns.alidns.com/dns-query",
        "+.alipayobjects.com": "https://dns.alidns.com/dns-query",
        "+.alipay-eco.com": "https://dns.alidns.com/dns-query",

        // > 腾讯
        // refer: https://www.dnspod.cn/products/publicdns
        "+.tencent.com": "https://doh.pub/dns-query",
        "+.qcloud.com": "https://doh.pub/dns-query",
        "+.qcloudcdn.cn": "https://doh.pub/dns-query",
        "+.qcloudcdn.com": "https://doh.pub/dns-query",
        "+.qcloudcos.com": "https://doh.pub/dns-query",
        "+.qcloudimg.com": "https://doh.pub/dns-query",
        "+.qcloudcjgj.com": "https://doh.pub/dns-query",
        "+.qcloudwzgj.com": "https://doh.pub/dns-query",
        "+.qcloudzygj.com": "https://doh.pub/dns-query",
        "+.myqcloud.com": "https://doh.pub/dns-query",
        "+.tencent-cloud.net": "https://doh.pub/dns-query",
        "+.tencentcloud-aiot.com": "https://doh.pub/dns-query",
        "+.tencentcloudapi.com": "https://doh.pub/dns-query",
        "+.tencentcloudcr.com": "https://doh.pub/dns-query",
        "+.tencentcloudmarket.com": "https://doh.pub/dns-query",
        "+.qq.com": "https://doh.pub/dns-query",
        "+.qlogo.cn": "https://doh.pub/dns-query",
        "+.qpic.cn": "https://doh.pub/dns-query",
        "+.weixin.qq.com": "https://doh.pub/dns-query",
        "+.wx.qq.com": "https://doh.pub/dns-query",
        "+.weixin.com": "https://doh.pub/dns-query",
        "+.weixinbridge.com": "https://doh.pub/dns-query",
        "+.wechat.com": "https://doh.pub/dns-query",
        "+.servicewechat.com": "https://doh.pub/dns-query",
        "+.weiyun.com": "https://doh.pub/dns-query",
        "+.gtimg.cn": "https://doh.pub/dns-query",
        "+.idqqimg.com": "https://doh.pub/dns-query",
        "+.cdn-go.cn": "https://doh.pub/dns-query",
        "+.smtcdns.com": "https://doh.pub/dns-query",
        "+.smtcdns.net": "https://doh.pub/dns-query",
        "url.cn": "https://doh.pub/dns-query",

        // > 百度
        // refer: https://dudns.baidu.com/support/localdns/Address/index.html
        "+.baidu": ['180.76.76.76', '2400:da00::6666'],
        "+.baidu.com": ['180.76.76.76', '2400:da00::6666'],
        "+.bdimg.com": ['180.76.76.76', '2400:da00::6666'],
        "+.bdstatic.com": ['180.76.76.76', '2400:da00::6666'],
        "+.baidupcs.*": ['180.76.76.76', '2400:da00::6666'],
        "+.baiduyuncdn.*": ['180.76.76.76', '2400:da00::6666'],
        "+.baiduyundns.*": ['180.76.76.76', '2400:da00::6666'],
        "+.bdydns.*": ['180.76.76.76', '2400:da00::6666'],
        "+.bdycdn.*": ['180.76.76.76', '2400:da00::6666'],
        "+.bdysite.com": ['180.76.76.76', '2400:da00::6666'],
        "+.bdysites.com": ['180.76.76.76', '2400:da00::6666'],
        "+.baidubce.*": ['180.76.76.76', '2400:da00::6666'],
        "+.bcedns.*": ['180.76.76.76', '2400:da00::6666'],
        "+.bcebos.com": ['180.76.76.76', '2400:da00::6666'],
        "+.bcevod.com": ['180.76.76.76', '2400:da00::6666'],
        "+.bceimg.com": ['180.76.76.76', '2400:da00::6666'],
        "+.bcehost.com": ['180.76.76.76', '2400:da00::6666'],
        "+.bcehosts.com": ['180.76.76.76', '2400:da00::6666'],
        "dwz.cn": ['180.76.76.76', '2400:da00::6666'],

        // >360
        // refer: https://sdns.360.net/dnsPublic.html
        "+.360.cn": "https://doh.360.cn/dns-query",
        "+.360safe.com": "https://doh.360.cn/dns-query",
        "+.360kuai.com": "https://doh.360.cn/dns-query",
        "+.so.com": "https://doh.360.cn/dns-query",
        "+.360webcache.com": "https://doh.360.cn/dns-query",
        "+.qihuapi.com": "https://doh.360.cn/dns-query",
        "+.qhimg.com": "https://doh.360.cn/dns-query",
        "+.qhimgs.com": "https://doh.360.cn/dns-query",
        "+.qhimgs?.com": "https://doh.360.cn/dns-query",
        "+.qhmsg.com": "https://doh.360.cn/dns-query",
        "+.qhres.com": "https://doh.360.cn/dns-query",
        "+.qhres?.com": "https://doh.360.cn/dns-query",
        "+.dhrest.com": "https://doh.360.cn/dns-query",
        "+.qhupdate.com": "https://doh.360.cn/dns-query",
        "+.yunpan.cn": "https://doh.360.cn/dns-query",
        "+.yunpan.com.cn": "https://doh.360.cn/dns-query",
        "+.yunpan.com": "https://doh.360.cn/dns-query",
        "urlqh.cn": "https://doh.360.cn/dns-query",

        // > Bytedance
        // refer: https://www.volcengine.com/docs/6758/179060
        "+.amemv.com": "180.184.1.1",
        "+.bdxiguaimg.com": "180.184.1.1",
        "+.bdxiguastatic.com": "180.184.1.1",
        "+.byted-static.com": "180.184.1.1",
        "+.bytedance.*": "180.184.1.1",
        "+.bytedns.net": "180.184.1.1",
        "+.bytednsdoc.com": "180.184.1.1",
        "+.bytegoofy.com": "180.184.1.1",
        "+.byteimg.com": "180.184.1.1",
        "+.bytescm.com": "180.184.1.1",
        "+.bytetos.com": "180.184.1.1",
        "+.bytexservice.com": "180.184.1.1",
        "+.douyin.com": "180.184.1.1",
        "+.douyinpic.com": "180.184.1.1",
        "+.douyinstatic.com": "180.184.1.1",
        "+.douyinvod.com": "180.184.1.1",
        "+.feelgood.cn": "180.184.1.1",
        "+.feiliao.com": "180.184.1.1",
        "+.gifshow.com": "180.184.1.1",
        "+.huoshan.com": "180.184.1.1",
        "+.huoshanzhibo.com": "180.184.1.1",
        "+.ibytedapm.com": "180.184.1.1",
        "+.iesdouyin.com": "180.184.1.1",
        "+.ixigua.com": "180.184.1.1",
        "+.kspkg.com": "180.184.1.1",
        "+.pstatp.com": "180.184.1.1",
        "+.snssdk.com": "180.184.1.1",
        "+.toutiao.com": "180.184.1.1",
        "+.toutiao13.com": "180.184.1.1",
        "+.toutiao???.???": "180.184.1.1",
        "+.toutiaocloud.cn": "180.184.1.1",
        "+.toutiaocloud.com": "180.184.1.1",
        "+.toutiaopage.com": "180.184.1.1",
        "+.wukong.com": "180.184.1.1",
        "+.zijieapi.com": "180.184.1.1",
        "+.zijieimg.com": "180.184.1.1",
        "+.zjbyte.com": "180.184.1.1",
        "+.zjcdn.com": "180.184.1.1",

        // > BiliBili
        "upos-sz-mirrorali.bilivideo.com": "https://dns.alidns.com/dns-query",
        "upos-sz-mirrorali?.bilivideo.com": "https://dns.alidns.com/dns-query",
        "upos-sz-mirrorali??.bilivideo.com": "https://dns.alidns.com/dns-query",
        "upos-sz-mirrorbos.bilivideo.com": ['180.76.76.76', '2400:da00::6666'],
        "upos-sz-mirrorcos.bilivideo.com": "https://doh.pub/dns-query",
        "upos-sz-mirrorcos?.bilivideo.com": "https://doh.pub/dns-query",
        "upos-sz-mirrorcos??.bilivideo.com": "https://doh.pub/dns-query",
        "upos-sz-upcdnbd??.bilivideo.com": ['180.76.76.76', '2400:da00::6666'],
        "upos-sz-upcdntx.bilivideo.com": "https://doh.pub/dns-query",

        // > 🇨🇳 CHN
        // CNNIC SDNS
        // "+.gov.cn": "1.2.4.8",
        // "+.政务": "1.2.4.8",

        // > 🇭🇰 HKG
        // PCCW Enterprises Limited
        // "+.pccw.com": "dns1.pccw.com",
        // "+.1010.com.hk": "dns1.pccw.com",
        // "+.hkcsl.com": "dns1.pccw.com",
        // "+.theclub.com.hk": "dns1.pccw.com",
        // "+.now.com": "dns2.pccw.com",
        // "+.nowe.com": "dns2.pccw.com",
        // "+.now-tv.com": "dns2.pccw.com",
        // "+.moov.hk": "dns3.pccw.com",
        // "+.viu.com": "dns3.pccw.com",
        // "+.viu.tv": "dns3.pccw.com",
        // Hong Kong Cable Television Limited
        // "+.hkcable.com.hk": "dns1.hkcable.com.hk",
        // "+.i-cable.com": "dns2.hkcable.com.hk",
        // "+.cabletv.com.hk": "dns2.hkcable.com.hk",
        // KDDI Hong Kong Limited
        // "+.hk.kddi.com": "apple.kdd.net.hk",

        // > 🇹🇼 TWN
        // 中华电信
        "+.cht.com.tw ": "https://dns.hinet.net/dns-query",
        "+.hinet.net": "https://dns.hinet.net/dns-query",
        "+.emome.net": "https://dns.hinet.net/dns-query",
        // So-net
        // "so-net.net.tw": "ns1.so-net.net.tw",
        // "so-net.tw": "ns1.so-net.net.tw",
        // Taiwan Network Information Center
        "+.tw": "https://dns.twnic.tw/dns-query",
        "+.taipei": "https://dns.twnic.tw/dns-query",

        // > 🇺🇸 USA
        // Hurricane Electric
        "+.he.net": "https://ordns.he.net/dns-query"
    };
    params.dns["nameserver-policy"] = nameserverPolicy;
}

// 覆写hosts
function overwriteHosts (params) {
    const hosts = {
        // > IPv6
        "ip6-localhost": "::1",
        "ip6-loopback": "::1",
        "ip6-localnet": "fe00::0",
        "ip6-mcastprefix": "ff00::0",
        "ip6-allnodes": "ff02::1",
        "ip6-allrouters": "ff02::2",
        "ip6-allhosts": "ff02::3",

        // > Encrypted DNS
        "dns.google": "8.8.8.8",
        "dns64.dns.google": "2001:4860:4860::6464",
        "cloudflare-dns.com": "104.16.249.249",
        "1dot1dot1dot1.cloudflare-dns.com": "1.1.1.1",
        "one.one.one.one": "1.1.1.1",
        "dns.alidns.com": "223.5.5.5",
        "doh.pub": "1.12.12.12",
        "dot.pub": "1.12.12.12",
        "doh.360.cn": "23.6.48.18",
        "dot.360.cn": "101.198.198.198",
        "dns.twnic.tw": "101.101.101.101",
        "ordns.he.net": "74.82.42.42",

        // > Modify Contents
        // "services.googleapis.cn": "74.125.193.94",
        "talk.google.com": "108.177.125.188",
        "mtalk.google.com": "108.177.125.188",
        "alt1-mtalk.google.com": "3.3.3.3",
        "alt2-mtalk.google.com": "3.3.3.3",
        "alt3-mtalk.google.com": "74.125.200.188",
        "alt4-mtalk.google.com": "74.125.200.188",
        "alt5-mtalk.google.com": "3.3.3.3",
        "alt6-mtalk.google.com": "3.3.3.3",
        "alt7-mtalk.google.com": "74.125.200.188",
        "alt8-mtalk.google.com": "3.3.3.3",
        // "dl.google.com": "180.163.151.161",
        // "dl.l.google.com": "180.163.151.161",

        // > Modify Contents
        "blog.google": "119.29.29.29",
        "googletraveladservices.com": "119.29.29.29",
        "dl.google.com": "119.29.29.29",
        "dl.l.google.com": "119.29.29.29",
        "clientservices.googleapis.com": "119.29.29.29",
        "update.googleapis.com": "119.29.29.29",
        "translate.googleapis.com": "119.29.29.29",
        "fonts.googleapis.com": "119.29.29.29",
        "fonts.gstatic.com": "119.29.29.29",
        "stun.l.google.com": ['system://', 'system', 'dhcp://system'],
        "stun?.l.google.com": ['system://', 'system', 'dhcp://system']
    };
    params.hosts = hosts;
}

// 覆写Tunnel
function overwriteTunnel (params) {
    const tunnelOptions = {
        enable: true,
        stack: "system",
        device: "tun0",
        "dns-hijack": ["any:53", "tcp://any:53"],
        "auto-route": true,
        "auto-detect-interface": true,
        "strict-route": true,
        // 根据自己环境来看要排除哪些网段
        "route-exclude-address": [],
    };
    params.tun = { ...tunnelOptions };
}

// 覆写代理组
function overwriteProxyGroups (params) {
    // 所有代理
    const allProxies = "^(?=.*(.))(?!.*((?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b|(\d{4}-\d{2}-\d{2}|\dG)))).*$";
    // 公共的正则片段
    const excludeTerms = "剩余|到期|主页|官网|游戏|关注|网站|地址|有效|网址|禁止|邮箱|发布|客服|订阅|节点|问题|联系";
    // 包含条件：各个国家或地区的关键词
    const includeTerms = {
        HK: "(香港|HK|Hong|🇭🇰)",
        TW: "(台湾|TW|Taiwan|Wan|🇹🇼|🇨🇳)",
        SG: "(新加坡|狮城|SG|Singapore|🇸🇬)",
        JP: "(日本|JP|Japan|🇯🇵)",
        KR: "(韩国|韓|KR|Korea|🇰🇷)",
        US: "(美国|US|United States|America|🇺🇸)",
        UK: "(英国|UK|United Kingdom|🇬🇧)",
        FR: "(法国|FR|France|🇫🇷)",
        DE: "(德国|DE|Germany|🇩🇪)"
    };
    // 合并所有国家关键词，供"其它"条件使用
    const allCountryTerms = Object.values(includeTerms).join("|");
    // 自动代理组正则表达式配置
    const autoProxyGroupRegexs = [
        { name: "香港节点", regex: new RegExp(`^(?=.*${includeTerms.HK})(?!.*${excludeTerms}).*$`, "i") },
        { name: "台湾节点", regex: new RegExp(`^(?=.*${includeTerms.TW})(?!.*${excludeTerms}).*$`, "i") },
        { name: "狮城节点", regex: new RegExp(`^(?=.*${includeTerms.SG})(?!.*${excludeTerms}).*$`, "i") },
        { name: "日本节点", regex: new RegExp(`^(?=.*${includeTerms.JP})(?!.*${excludeTerms}).*$`, "i") },
        { name: "韩国节点", regex: new RegExp(`^(?=.*${includeTerms.KR})(?!.*${excludeTerms}).*$`, "i") },
        { name: "美国节点", regex: new RegExp(`^(?=.*${includeTerms.US})(?!.*${excludeTerms}).*$`, "i") },
        { name: "英国节点", regex: new RegExp(`^(?=.*${includeTerms.UK})(?!.*${excludeTerms}).*$`, "i") },
        { name: "法国节点", regex: new RegExp(`^(?=.*${includeTerms.FR})(?!.*${excludeTerms}).*$`, "i") },
        { name: "德国节点", regex: new RegExp(`^(?=.*${includeTerms.DE})(?!.*${excludeTerms}).*$`, "i") },
        // { name: "其它 - 自动选择", regex: new RegExp(`^(?!.*(?:${allCountryTerms}|${excludeTerms})).*$`, "i") }

    ];
        
    const autoProxyGroups = autoProxyGroupRegexs
        .map ((item) => ({
            name: item.name,
            type: "url-test",
            url: "http://latency-test.skk.moe/endpoint",
            interval: 300,
            tolerance: 50,
            proxies: getProxiesByRegex (params, item.regex),
            hidden: true,
        }))
        .filter ((item) => item.proxies.length > 0);

    const groups = [
        {
            name: "手动切换",
            type: "select",
            url: "http://latency-test.skk.moe/endpoint",
            icon: "https://github.com/chen08209/FlClash/raw/main/assets/images/icon.png",
            proxies: [
                "🛰️ 自动选择", 
                "香港节点", 
                "美国节点", 
                "韩国节点", 
                "狮城节点", 
                "日本节点", 
                "台湾节点", 
                "🔯 故障转移", 
                "🔮 负载均衡", 
                "DIRECT"
            ],
        },
        {
            name: "🛰️ 自动选择",
            type: "url-test",
            url: "http://latency-test.skk.moe/endpoint",
            interval: 300,
            tolerance: 50,
            hidden: true,
            icon: "https://raw.githubusercontent.com/lige47/QuanX-icon-rule/main/icon/quanqiu(3).png",
            proxies: allProxies,
        },

        {
            name: "🔯 故障转移",
            type: "fallback",
            url: "http://latency-test.skk.moe/endpoint",
            interval: 300,
            lazy: true,
            hidden: true,
            icon: "https://raw.githubusercontent.com/fmz200/wool_scripts/main/icons/apps/select.png",
            proxies: allProxies,
        },
        {
            name: "🔮 负载均衡",
            type: "load-balancet",
            url: "http://latency-test.skk.moe/endpoint",
            interval: 300,
            lazy: true,
            hidden: true,
            icon: "https://github.com/shindgewongxj/WHATSINStash/raw/main/icon/loadbalance.png",
            proxies: allProxies,
        },
        {
            name: "✈️ 电报信息",
            type: "select",
            proxies: ["手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "英国节点", "法国节点", "德国节点", "台湾节点"],
            // "include-all": true,
            icon: "https://github.com/tugepaopao/Image-Storage/raw/master/hand-painted/36.png"
        },
        {
            name: "🤖 AIGC",
            type: "select",
            proxies: ["美国节点", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "英国节点", "法国节点", "德国节点", "台湾节点"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
        },
        {
            name: "🍎 苹果服务",
            type: "select",
            proxies: ["DIRECT", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "英国节点", "法国节点", "德国节点", "台湾节点"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Apple.png"
        },
        {
            name: "Ⓜ️ 微软服务",
            type: "select",
            proxies: ["DIRECT", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "英国节点", "法国节点", "德国节点", "台湾节点"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Microsoft.png"
        },
  {
            name: "漏网之鱼",
            type: "select",
            proxies: ["🔯 故障转移", "🔮 负载均衡", "手动切换", "DIRECT", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "英国节点", "法国节点", "德国节点", "台湾节点"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Snapfish.png"
        },

    ];

    autoProxyGroups.length &&
        groups [2].proxies.unshift (...autoProxyGroups.map ((item) => item.name));
    groups.push (...autoProxyGroups);
    groups.push (...manualProxyGroupsConfig);
    params ["proxy-groups"] = groups;
}

// 覆写规则
function overwriteRules (params) {
    const adNonipRules = [
        "RULE-SET,reject_non_ip,REJECT",
        "RULE-SET,reject_domainset,REJECT",
        "RULE-SET,reject_non_ip_drop,REJECT-DROP",
        "RULE-SET,reject_non_ip_no_drop,REJECT"
    ];

    const customRules = [
        // 在此添加自定义规则，优先级次于ad。例子：
        // "DOMAIN,baidu.com,DIRECT",
  // Process 程序规则
  // Zoom
        "DOMAIN-SUFFIX,Zoom.us,手动切换",
        "DOMAIN-SUFFIX,deepl.com,DIRECT",
  // AdGuard
        "DOMAIN,injections.adguard.org,DIRECT",
        "DOMAIN,local.adguard.org,DIRECT",
  
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
        "DOMAIN-SUFFIX,vercel.app,手动切换",

      ];

    const nonipRules = [
        "RULE-SET,cdn_domainset,手动切换",
        "RULE-SET,cdn_non_ip,手动切换",
        "RULE-SET,stream_non_ip,美国节点",
        "RULE-SET,telegram,✈️ 电报信息",
        "RULE-SET,apple_cdn,DIRECT",
        "RULE-SET,download_domainset,手动切换",
        "RULE-SET,download_non_ip,手动切换",
        "RULE-SET,microsoft_cdn_non_ip,DIRECT",
        "RULE-SET,apple_cn_non_ip,DIRECT",
        "RULE-SET,apple_services,🍎 苹果服务",
        "RULE-SET,microsoft_non_ip,Ⓜ️ 微软服务",
        "RULE-SET,ai_non_ip,🤖 AIGC",
        "RULE-SET,global_non_ip,手动切换",
        "RULE-SET,domestic_non_ip,DIRECT",
        "RULE-SET,direct_non_ip,DIRECT",
        "RULE-SET,lan_non_ip,DIRECT"
    ];

    const allNonipRules = [
        ...adNonipRules,
        ...customRules,
        ...nonipRules
    ];

    const ipRules = [
        "RULE-SET,reject_ip,REJECT",
        "RULE-SET,telegram_ip,✈️ 电报信息",
        "RULE-SET,stream_ip,美国节点",
        "RULE-SET,lan_ip,DIRECT",
        "RULE-SET,domestic_ip,DIRECT",
        "RULE-SET,china_ip,DIRECT",
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
        
        "GEOIP,CN,DIRECT",
        "MATCH,漏网之鱼"
    ];

    const rules = [
        // 非ip类规则
        ...allNonipRules,
        // ip类规则
        ...ipRules
    ];

    const ruleProviders = {
        // 去广告
        reject_non_ip_no_drop: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/reject-no-drop.txt",
            path: "./rule_set/sukkaw_ruleset/reject_non_ip_no_drop.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        reject_non_ip_drop: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/reject-drop.txt",
            path: "./rule_set/sukkaw_ruleset/reject_non_ip_drop.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        reject_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/reject.txt",
            path: "./rule_set/sukkaw_ruleset/reject_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        reject_domainset: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/reject.txt",
            path: "./rule_set/sukkaw_ruleset/reject_domainset.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        reject_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/reject.txt",
            path: "./rule_set/sukkaw_ruleset/reject_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        // 静态cdn
        cdn_domainset: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/cdn.txt",
            path: "./rule_set/sukkaw_ruleset/cdn_domainset.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        cdn_non_ip: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/non_ip/cdn.txt",
            path: "./rule_set/sukkaw_ruleset/cdn_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        // 流媒体
        stream_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/stream.txt",
            path: "./rule_set/sukkaw_ruleset/stream_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        stream_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/stream.txt",
            path: "./rule_set/sukkaw_ruleset/stream_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        // AIGC
        ai_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/ai.txt",
            path: "./rule_set/sukkaw_ruleset/ai_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        // telegram
        telegram: {
            type: "http",
            behavior: "classical",
            url: "https://github.com/LucaLin233/Luca_Conf/blob/main/Surge/Rule/Telegram.list?raw=true",
            path: "./rules/Telegram.list",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        telegram_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/telegram.txt",
            path: "./rule_set/sukkaw_ruleset/telegram_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        // apple
        apple_cdn: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/apple_cdn.txt",
            path: "./rule_set/sukkaw_ruleset/apple_cdn.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        apple_services: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/apple_services.txt",
            path: "./rule_set/sukkaw_ruleset/apple_services.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        apple_cn_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/apple_cn.txt",
            path: "./rule_set/sukkaw_ruleset/apple_cn_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        // microsoft
        microsoft_cdn_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/microsoft_cdn.txt",
            path: "./rule_set/sukkaw_ruleset/microsoft_cdn_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        microsoft_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/microsoft.txt",
            path: "./rule_set/sukkaw_ruleset/microsoft_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        // 软件更新、操作系统等大文件下载
        download_domainset: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/download.txt",
            path: "./rule_set/sukkaw_ruleset/download_domainset.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        download_non_ip: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/non_ip/download.txt",
            path: "./rule_set/sukkaw_ruleset/download_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        // 内网域名和局域网 IP
        lan_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/lan.txt",
            path: "./rule_set/sukkaw_ruleset/lan_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        lan_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/lan.txt",
            path: "./rule_set/sukkaw_ruleset/lan_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        domestic_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/domestic.txt",
            path: "./rule_set/sukkaw_ruleset/domestic_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        direct_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/direct.txt",
            path: "./rule_set/sukkaw_ruleset/direct_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        global_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/global.txt",
            path: "./rule_set/sukkaw_ruleset/global_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        domestic_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/domestic.txt",
            path: "./rule_set/sukkaw_ruleset/domestic_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        },
        china_ip: {
            type: "http",
            behavior: "ipcidr",
            url: "https://ruleset.skk.moe/Clash/ip/china_ip.txt",
            path: "./rule_set/sukkaw_ruleset/china_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "手动切换"
        }
    };
    
    params ["rule-providers"] = ruleProviders;
    params ["rules"] = rules;
}

function getProxiesByRegex (params, regex) {
    const matchedProxies = params.proxies.filter ((e) => regex.test (e.name)).map ((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["COMPATIBLE"];
}

function getManualProxiesByRegex (params, regex) {
    const matchedProxies = params.proxies.filter ((e) => regex.test (e.name)).map ((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["COMPATIBLE"];
}
