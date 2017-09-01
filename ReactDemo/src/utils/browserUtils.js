const userAgent = navigator.userAgent;

export function isSafari(str) {
    return /^((?!chrome|android).)*safari/i.test(userAgent)
}

export function detectOSNameAndVersion() {

    const detectOSName = () => {

        const tuple = [
            { name: 'Windows 10', regex: /(Windows 10.0|Windows NT 10.0)/ },
            { name: 'Windows 8.1', regex: /(Windows 8.1|Windows NT 6.3)/ },
            { name: 'Windows 8', regex: /(Windows 8|Windows NT 6.2)/ },
            { name: 'Windows 7', regex: /(Windows 7|Windows NT 6.1)/ },
            { name: 'Windows Vista', regex: /Windows NT 6.0/ },
            { name: 'Windows Server 2003', regex: /Windows NT 5.2/ },
            { name: 'Windows XP', regex: /(Windows NT 5.1|Windows XP)/ },
            { name: 'Windows 2000', regex: /(Windows NT 5.0|Windows 2000)/ },
            { name: 'Windows ME', regex: /(Win 9x 4.90|Windows ME)/ },
            { name: 'Windows 98', regex: /(Windows 98|Win98)/ },
            { name: 'Windows 95', regex: /(Windows 95|Win95|Windows_95)/ },
            { name: 'Android', regex: /Android/ },
            { name: 'Open BSD', regex: /OpenBSD/ },
            { name: 'Sun OS', regex: /SunOS/ },
            { name: 'Linux', regex: /(Linux|X11)/ },
            { name: 'iOS', regex: /(iPhone|iPad|iPod)/ },
            { name: 'Mac OS X', regex: /Mac OS X/ },
            { name: 'Mac OS', regex: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { name: 'OS/2', regex: /OS\/2/ }
        ]

        let name = ''

        for (let item of tuple) {
            if (item.regex.test(userAgent)) {
                name = item.name
                break
            }
        }
        return name
    }

    const detectWinsVersion = name => /Windows (.*)/.exec(name)[1]

    const detectOtherOSVersion = name => {
        let version
        switch (name) {
            case 'Mac OS X':
                version = /Mac OS X (10[\.\_\d]+)/.exec(userAgent)[1]
                break
            case 'Android':
                version = /Android ([\.\_\d]+)/.exec(userAgent)[1]
                break
            case 'iOS':
                version = /OS (\d+)_(\d+)_?(\d+)?/.exec(userAgent)
                version = version[1] + '.' + version[2] + '.' + (version[3] | 0)
                break
        }
        return version
    }

    const isWins = name => /Windows/.test(name)

    let name = detectOSName()

    return isWins(name) ? { name: 'Windows', version: detectWinsVersion(name) } : {
        name,
        version: detectOtherOSVersion(name)
    }
}

export function detectBrowserNameAndVersion() {

    let temp
    let matchResult = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []

    if (/trident/i.test(matchResult[1])) {
        temp = /\brv[ :]+(\d+)/g.exec(userAgent) || []
        return {
            name: 'IE',
            version: temp[1]
        }
    }

    if (matchResult[1] === 'Chrome') {
        temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/)
        if (temp != null) return temp.slice(1).join(' ').replace('OPR', 'Opera')
    }

    matchResult = matchResult[2] ? [matchResult[1], matchResult[2]] : [navigator.appName, navigator.appVersion, '-?']
    temp = userAgent.match(/version\/(\d+)/i)

    if (temp != null) matchResult.splice(1, 1, temp[1])

    return {
        name: matchResult[0],
        version: matchResult[1]
    }
}

export function itIE(version) {
    let browerAndVersion = this.detectBrowserNameAndVersion()
    if (browerAndVersion && 'IE' === browerAndVersion['name'] && version >= browerAndVersion['version']) {
        return true
    }
    return false
}
