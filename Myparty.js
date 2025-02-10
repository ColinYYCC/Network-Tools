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
        ipv6: false,
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
        "dns.alidns.com": "quic://223.5.5.5:853",
        "doh.pub": "https://1.12.12.12/dns-query",
        "doh.360.cn": "101.198.198.198",
        "+.uc.cn": "quic://dns.alidns.com:853",
        "+.alibaba.com": "quic://dns.alidns.com:853",
        "*.alicdn.com": "quic://dns.alidns.com:853",
        "*.ialicdn.com": "quic://dns.alidns.com:853",
        "*.myalicdn.com": "quic://dns.alidns.com:853",
        "*.alidns.com": "quic://dns.alidns.com:853",
        "*.aliimg.com": "quic://dns.alidns.com:853",
        "+.aliyun.com": "quic://dns.alidns.com:853",
        "*.aliyuncs.com": "quic://dns.alidns.com:853",
        "*.alikunlun.com": "quic://dns.alidns.com:853",
        "*.alikunlun.net": "quic://dns.alidns.com:853",
        "*.cdngslb.com": "quic://dns.alidns.com:853",
        "+.alipay.com": "quic://dns.alidns.com:853",
        "+.alipay.cn": "quic://dns.alidns.com:853",
        "+.alipay.com.cn": "quic://dns.alidns.com:853",
        "*.alipayobjects.com": "quic://dns.alidns.com:853",
        "+.alibaba-inc.com": "quic://dns.alidns.com:853",
        "*.alibabausercontent.com": "quic://dns.alidns.com:853",
        "*.alibabadns.com": "quic://dns.alidns.com:853",
        "+.alibabachengdun.com": "quic://dns.alidns.com:853",
        "+.alicloudccp.com": "quic://dns.alidns.com:853",
        "+.alipan.com": "quic://dns.alidns.com:853",
        "+.aliyundrive.com": "quic://dns.alidns.com:853",
        "+.aliyundrive.net": "quic://dns.alidns.com:853",
        "+.cainiao.com": "quic://dns.alidns.com:853",
        "+.cainiao.com.cn": "quic://dns.alidns.com:853",
        "+.cainiaoyizhan.com": "quic://dns.alidns.com:853",
        "+.guoguo-app.com": "quic://dns.alidns.com:853",
        "+.etao.com": "quic://dns.alidns.com:853",
        "+.yitao.com": "quic://dns.alidns.com:853",
        "+.1688.com": "quic://dns.alidns.com:853",
        "+.amap.com": "quic://dns.alidns.com:853",
        "+.gaode.com": "quic://dns.alidns.com:853",
        "+.autonavi.com": "quic://dns.alidns.com:853",
        "+.dingtalk.com": "quic://dns.alidns.com:853",
        "+.mxhichina.com": "quic://dns.alidns.com:853",
        "+.soku.com": "quic://dns.alidns.com:853",
        "+.tb.cn": "quic://dns.alidns.com:853",
        "+.taobao.com": "quic://dns.alidns.com:853",
        "*.taobaocdn.com": "quic://dns.alidns.com:853",
        "*.tbcache.com": "quic://dns.alidns.com:853",
        "+.tmall.com": "quic://dns.alidns.com:853",
        "+.goofish.com": "quic://dns.alidns.com:853",
        "+.xiami.com": "quic://dns.alidns.com:853",
        "+.xiami.net": "quic://dns.alidns.com:853",
        "*.ykimg.com": "quic://dns.alidns.com:853",
        "+.youku.com": "quic://dns.alidns.com:853",
        "+.tudou.com": "quic://dns.alidns.com:853",
        "*.cibntv.net": "quic://dns.alidns.com:853",
        "+.ele.me": "quic://dns.alidns.com:853",
        "*.elemecdn.com": "quic://dns.alidns.com:853",
        "+.feizhu.com": "quic://dns.alidns.com:853",
        "+.taopiaopiao.com": "quic://dns.alidns.com:853",
        "+.fliggy.com": "quic://dns.alidns.com:853",
        "+.koubei.com": "quic://dns.alidns.com:853",
        "+.mybank.cn": "quic://dns.alidns.com:853",
        "+.mmstat.com": "quic://dns.alidns.com:853",
        "+.uczzd.cn": "quic://dns.alidns.com:853",
        "+.iconfont.cn": "quic://dns.alidns.com:853",
        "+.freshhema.com": "quic://dns.alidns.com:853",
        "+.hemamax.com": "quic://dns.alidns.com:853",
        "+.hemaos.com": "quic://dns.alidns.com:853",
        "+.hemashare.cn": "quic://dns.alidns.com:853",
        "+.shyhhema.com": "quic://dns.alidns.com:853",
        "+.sm.cn": "quic://dns.alidns.com:853",
        "+.npmmirror.com": "quic://dns.alidns.com:853",
        "+.alios.cn": "quic://dns.alidns.com:853",
        "+.wandoujia.com": "quic://dns.alidns.com:853",
        "+.aligames.com": "quic://dns.alidns.com:853",
        "+.25pp.com": "quic://dns.alidns.com:853",
        "*.aliapp.org": "quic://dns.alidns.com:853",
        "+.tanx.com": "quic://dns.alidns.com:853",
        "+.hellobike.com": "quic://dns.alidns.com:853",
        "*.hichina.com": "quic://dns.alidns.com:853",
        "*.yunos.com": "quic://dns.alidns.com:853",
        "upos-sz-mirrorali.bilivideo.com": "quic://dns.alidns.com:853",
        "upos-sz-estgoss.bilivideo.com": "quic://dns.alidns.com:853",
        "*.qcloud.com": "https://doh.pub/dns-query",
        "*.gtimg.cn": "https://doh.pub/dns-query",
        "*.gtimg.com": "https://doh.pub/dns-query",
        "*.gtimg.com.cn": "https://doh.pub/dns-query",
        "*.gdtimg.com": "https://doh.pub/dns-query",
        "*.idqqimg.com": "https://doh.pub/dns-query",
        "*.udqqimg.com": "https://doh.pub/dns-query",
        "*.igamecj.com": "https://doh.pub/dns-query",
        "+.myapp.com": "https://doh.pub/dns-query",
        "*.myqcloud.com": "https://doh.pub/dns-query",
        "+.dnspod.com": "https://doh.pub/dns-query",
        "*.qpic.cn": "https://doh.pub/dns-query",
        "*.qlogo.cn": "https://doh.pub/dns-query",
        "+.qq.com": "https://doh.pub/dns-query",
        "+.qq.com.cn": "https://doh.pub/dns-query",
        "*.qqmail.com": "https://doh.pub/dns-query",
        "+.qzone.com": "https://doh.pub/dns-query",
        "*.tencent-cloud.net": "https://doh.pub/dns-query",
        "*.tencent-cloud.com": "https://doh.pub/dns-query",
        "+.tencent.com": "https://doh.pub/dns-query",
        "+.tencent.com.cn": "https://doh.pub/dns-query",
        "+.tencentmusic.com": "https://doh.pub/dns-query",
        "+.weixinbridge.com": "https://doh.pub/dns-query",
        "+.weixin.com": "https://doh.pub/dns-query",
        "+.weiyun.com": "https://doh.pub/dns-query",
        "+.soso.com": "https://doh.pub/dns-query",
        "+.sogo.com": "https://doh.pub/dns-query",
        "+.sogou.com": "https://doh.pub/dns-query",
        "*.sogoucdn.com": "https://doh.pub/dns-query",
        "*.roblox.cn": "https://doh.pub/dns-query",
        "+.robloxdev.cn": "https://doh.pub/dns-query",
        "+.wegame.com": "https://doh.pub/dns-query",
        "+.wegame.com.cn": "https://doh.pub/dns-query",
        "+.wegameplus.com": "https://doh.pub/dns-query",
        "+.cdn-go.cn": "https://doh.pub/dns-query",
        "*.tencentcs.cn": "https://doh.pub/dns-query",
        "*.qcloudimg.com": "https://doh.pub/dns-query",
        "+.dnspod.cn": "https://doh.pub/dns-query",
        "+.anticheatexpert.com": "https://doh.pub/dns-query",
        "url.cn": "https://doh.pub/dns-query",
        "*.qlivecdn.com": "https://doh.pub/dns-query",
        "*.tcdnlive.com": "https://doh.pub/dns-query",
        "*.dnsv1.com": "https://doh.pub/dns-query",
        "*.smtcdns.net": "https://doh.pub/dns-query",
        "+.coding.net": "https://doh.pub/dns-query",
        "*.codehub.cn": "https://doh.pub/dns-query",
        "acg.tv": "https://doh.pub/dns-query",
        "b23.tv": "https://doh.pub/dns-query",
        "+.bilibili.cn": "https://doh.pub/dns-query",
        "+.bilibili.com": "https://doh.pub/dns-query",
        "*.acgvideo.com": "https://doh.pub/dns-query",
        "*.bilivideo.com": "https://doh.pub/dns-query",
        "*.bilivideo.cn": "https://doh.pub/dns-query",
        "*.bilivideo.net": "https://doh.pub/dns-query",
        "*.hdslb.com": "https://doh.pub/dns-query",
        "*.biliimg.com": "https://doh.pub/dns-query",
        "*.biliapi.com": "https://doh.pub/dns-query",
        "*.biliapi.net": "https://doh.pub/dns-query",
        "+.biligame.com": "https://doh.pub/dns-query",
        "*.biligame.net": "https://doh.pub/dns-query",
        "+.bilicomic.com": "https://doh.pub/dns-query",
        "+.bilicomics.com": "https://doh.pub/dns-query",
        "*.bilicdn1.com": "https://doh.pub/dns-query",
        "+.mi.com": "https://doh.pub/dns-query",
        "+.duokan.com": "https://doh.pub/dns-query",
        "*.mi-img.com": "https://doh.pub/dns-query",
        "*.mi-idc.com": "https://doh.pub/dns-query",
        "*.xiaoaisound.com": "https://doh.pub/dns-query",
        "*.xiaomixiaoai.com": "https://doh.pub/dns-query",
        "*.mi-fds.com": "https://doh.pub/dns-query",
        "*.mifile.cn": "https://doh.pub/dns-query",
        "*.mijia.tech": "https://doh.pub/dns-query",
        "+.miui.com": "https://doh.pub/dns-query",
        "+.xiaomi.com": "https://doh.pub/dns-query",
        "+.xiaomi.cn": "https://doh.pub/dns-query",
        "+.xiaomi.net": "https://doh.pub/dns-query",
        "+.xiaomiev.com": "https://doh.pub/dns-query",
        "+.xiaomiyoupin.com": "https://doh.pub/dns-query",
        "+.bytedance.com": "180.184.2.2",
        "*.bytecdn.cn": "180.184.2.2",
        "*.volccdn.com": "180.184.2.2",
        "*.toutiaoimg.com": "180.184.2.2",
        "*.toutiaoimg.cn": "180.184.2.2",
        "*.toutiaostatic.com": "180.184.2.2",
        "*.toutiaovod.com": "180.184.2.2",
        "*.toutiaocloud.com": "180.184.2.2",
        "+.toutiaopage.com": "180.184.2.2",
        "+.feiliao.com": "180.184.2.2",
        "+.iesdouyin.com": "180.184.2.2",
        "*.pstatp.com": "180.184.2.2",
        "+.snssdk.com": "180.184.2.2",
        "*.bytegoofy.com": "180.184.2.2",
        "+.toutiao.com": "180.184.2.2",
        "+.feishu.cn": "180.184.2.2",
        "+.feishu.net": "180.184.2.2",
        "*.feishucdn.com": "180.184.2.2",
        "*.feishupkg.com": "180.184.2.2",
        "+.douyin.com": "180.184.2.2",
        "*.douyinpic.com": "180.184.2.2",
        "*.douyinstatic.com": "180.184.2.2",
        "*.douyincdn.com": "180.184.2.2",
        "*.douyinliving.com": "180.184.2.2",
        "*.douyinvod.com": "180.184.2.2",
        "+.huoshan.com": "180.184.2.2",
        "*.huoshanstatic.com": "180.184.2.2",
        "+.huoshanzhibo.com": "180.184.2.2",
        "+.ixigua.com": "180.184.2.2",
        "*.ixiguavideo.com": "180.184.2.2",
        "*.ixgvideo.com": "180.184.2.2",
        "*.byted-static.com": "180.184.2.2",
        "+.volces.com": "180.184.2.2",
        "+.baike.com": "180.184.2.2",
        "*.zjcdn.com": "180.184.2.2",
        "*.zijieapi.com": "180.184.2.2",
        "+.feelgood.cn": "180.184.2.2",
        "*.bytetcc.com": "180.184.2.2",
        "*.bytednsdoc.com": "180.184.2.2",
        "*.byteimg.com": "180.184.2.2",
        "*.byteacctimg.com": "180.184.2.2",
        "*.ibytedapm.com": "180.184.2.2",
        "+.oceanengine.com": "180.184.2.2",
        "*.edge-byted.com": "180.184.2.2",
        "*.volcvideo.com": "180.184.2.2",
        "+.91.com": "180.76.76.76",
        "+.hao123.com": "180.76.76.76",
        "+.baidu.cn": "180.76.76.76",
        "+.baidu.com": "180.76.76.76",
        "+.iqiyi.com": "180.76.76.76",
        "*.iqiyipic.com": "180.76.76.76",
        "*.baidubce.com": "180.76.76.76",
        "*.bcelive.com": "180.76.76.76",
        "*.baiducontent.com": "180.76.76.76",
        "*.baidustatic.com": "180.76.76.76",
        "*.bdstatic.com": "180.76.76.76",
        "*.bdimg.com": "180.76.76.76",
        "*.bcebos.com": "180.76.76.76",
        "*.baidupcs.com": "180.76.76.76",
        "*.baidubcr.com": "180.76.76.76",
        "*.yunjiasu-cdn.net": "180.76.76.76",
        "+.tieba.com": "180.76.76.76",
        "+.xiaodutv.com": "180.76.76.76",
        "*.shifen.com": "180.76.76.76",
        "*.jomodns.com": "180.76.76.76",
        "*.bdydns.com": "180.76.76.76",
        "*.jomoxc.com": "180.76.76.76",
        "*.duapp.com": "180.76.76.76",
        "*.antpcdn.com": "180.76.76.76",
        "upos-sz-mirrorbd.bilivideo.com": "180.76.76.76",
        "upos-sz-mirrorbos.bilivideo.com": "180.76.76.76",
        "*.qhimg.com": "https://doh.360.cn/dns-query",
        "*.qhimgs.com": "https://doh.360.cn/dns-query",
        "*.qhimgs?.com": "https://doh.360.cn/dns-query",
        "*.qhres.com": "https://doh.360.cn/dns-query",
        "*.qhres2.com": "https://doh.360.cn/dns-query",
        "*.qhmsg.com": "https://doh.360.cn/dns-query",
        "*.qhstatic.com": "https://doh.360.cn/dns-query",
        "*.qhupdate.com": "https://doh.360.cn/dns-query",
        "*.qihucdn.com": "https://doh.360.cn/dns-query",
        "+.360.com": "https://doh.360.cn/dns-query",
        "+.360.cn": "https://doh.360.cn/dns-query",
        "+.360.net": "https://doh.360.cn/dns-query",
        "+.360safe.com": "https://doh.360.cn/dns-query",
        "*.360tpcdn.com": "https://doh.360.cn/dns-query",
        "+.360os.com": "https://doh.360.cn/dns-query",
        "*.360webcache.com": "https://doh.360.cn/dns-query",
        "+.360kuai.com": "https://doh.360.cn/dns-query",
        "+.so.com": "https://doh.360.cn/dns-query",
        "+.haosou.com": "https://doh.360.cn/dns-query",
        "+.yunpan.cn": "https://doh.360.cn/dns-query",
        "+.yunpan.com": "https://doh.360.cn/dns-query",
        "+.yunpan.com.cn": "https://doh.360.cn/dns-query",
        "*.qh-cdn.com": "https://doh.360.cn/dns-query",
        "+.baomitu.com": "https://doh.360.cn/dns-query",
        "+.qiku.com": "https://doh.360.cn/dns-query",
        "+.securelogin.com.cn": ['system://', 'system', 'dhcp://system'],
        "captive.apple.com": ['system://', 'system', 'dhcp://system'],
        "hotspot.cslwifi.com": ['system://', 'system', 'dhcp://system'],
        "*.m2m": ['system://', 'system', 'dhcp://system'],
        "injections.adguard.org": ['system://', 'system', 'dhcp://system'],
        "local.adguard.org": ['system://', 'system', 'dhcp://system'],
        "*.bogon": ['system://', 'system', 'dhcp://system'],
        "*.home": ['system://', 'system', 'dhcp://system'],
        "instant.arubanetworks.com": ['system://', 'system', 'dhcp://system'],
        "setmeup.arubanetworks.com": ['system://', 'system', 'dhcp://system'],
        "router.asus.com": ['system://', 'system', 'dhcp://system'],
        "repeater.asus.com": ['system://', 'system', 'dhcp://system'],
        "+.asusrouter.com": ['system://', 'system', 'dhcp://system'],
        "+.routerlogin.net": ['system://', 'system', 'dhcp://system'],
        "+.routerlogin.com": ['system://', 'system', 'dhcp://system'],
        "+.tplinkwifi.net": ['system://', 'system', 'dhcp://system'],
        "+.tplogin.cn": ['system://', 'system', 'dhcp://system'],
        "+.tplinkap.net": ['system://', 'system', 'dhcp://system'],
        "+.tplinkmodem.net": ['system://', 'system', 'dhcp://system'],
        "+.tplinkplclogin.net": ['system://', 'system', 'dhcp://system'],
        "+.tplinkrepeater.net": ['system://', 'system', 'dhcp://system'],
        "*.ui.direct": ['system://', 'system', 'dhcp://system'],
        "unifi": ['system://', 'system', 'dhcp://system'],
        "*.huaweimobilewifi.com": ['system://', 'system', 'dhcp://system'],
        "*.router": ['system://', 'system', 'dhcp://system'],
        "aterm.me": ['system://', 'system', 'dhcp://system'],
        "console.gl-inet.com": ['system://', 'system', 'dhcp://system'],
        "homerouter.cpe": ['system://', 'system', 'dhcp://system'],
        "mobile.hotspot": ['system://', 'system', 'dhcp://system'],
        "ntt.setup": ['system://', 'system', 'dhcp://system'],
        "pi.hole": ['system://', 'system', 'dhcp://system'],
        "*.plex.direct": ['system://', 'system', 'dhcp://system'],
        "*.lan": ['system://', 'system', 'dhcp://system'],
        "*.localdomain": ['system://', 'system', 'dhcp://system'],
        "+.home.arpa": ['system://', 'system', 'dhcp://system'],
        "+.10.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.16.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.17.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.18.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.19.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.20.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.21.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.22.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.23.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.24.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.25.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.26.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.27.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.28.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.29.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.30.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.31.172.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.168.192.in-addr.arpa": ['system://', 'system', 'dhcp://system'],
        "+.254.169.in-addr.arpa": ['system://', 'system', 'dhcp://system']
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
        { name: "其它 - 自动选择", regex: new RegExp(`^(?!.*(?:${allCountryTerms}|${excludeTerms})).*$`, "i") }

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
            proxies: ["手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "英国节点", "法国节点", "德国节点", "台湾节点", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://github.com/tugepaopao/Image-Storage/raw/master/hand-painted/36.png"
        },
        {
            name: "🤖 AIGC",
            type: "select",
            proxies: ["美国节点", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "英国节点", "法国节点", "德国节点", "台湾节点", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
        },
        {
            name: "🍎 苹果服务",
            type: "select",
            proxies: ["DIRECT", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "英国节点", "法国节点", "德国节点", "台湾节点", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Apple.png"
        },
        {
            name: "Ⓜ️ 微软服务",
            type: "select",
            proxies: ["DIRECT", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "英国节点", "法国节点", "德国节点", "台湾节点", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Microsoft.png"
        },
  {
            name: "漏网之鱼",
            type: "select",
            proxies: ["🔯 故障转移", "🔮 负载均衡", "手动切换", "DIRECT", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "英国节点", "法国节点", "德国节点", "台湾节点", "其它 - 自动选择"],
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
