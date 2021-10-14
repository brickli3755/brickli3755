(function () {
    const userAgent = navigator.userAgent.toLowerCase();
    const skipPath = ['/platform/announcement.html'];

    if (/mobile/i.test(userAgent) && /ipad/i.test(userAgent) === false) {
        const urlStr = window.location.pathname;
        const neulBaseUrl = '//mall.bilibili.com/neul/index.html';
        // 如果是支付结果页，则直接跳转到neul路径下（ticket-h5项目中没有对应的页面）
        if (urlStr.indexOf('payResult') > -1) {
            const search = window.location.search.substr(1);
            const queryArr = [
                'page=ticket_payResult',
                ...(search && search.split('&'))
            ];
            // 如果链接中没有noTitleBar参数，则添加noTitleBar=1
            if (search.indexOf('noTitleBar') < 0) {
                queryArr.push('noTitleBar=1');
            }
            window.location.replace(`${neulBaseUrl}?${queryArr.join('&')}`);
        }
        // 部分页面不跳转
        else if (skipPath.indexOf(location.pathname) > -1) {
            return null;
        }
        // 其他页面则跳转到ticket-h5项目中对应的页面
        else if (location.search) {
            if (location.search.indexOf('noTitleBar=1') !== -1) {
                window.location.href = `/m${location.pathname}${location.search}`;
            }
            else {
                window.location.href = `/m${location.pathname}${location.search}&noTitleBar=1`;
            }
        }
        else {
            window.location.href = `/m${location.pathname}?noTitleBar=1`;
        }
    }

    return null;
}());
