
module.exports = {
    createCookie: function (name, value, days, cookieDomain = null, sameSite = null) {
        if (cookieDomain === null) {
            cookieDomain = location.hostname.replace("www.", "");
        }
        let expires,
            date = new Date();
        if (!days || days > 365) {
            days = 365;
        }
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toGMTString()}`;

        const cookieSameSite = sameSite ? `; SameSite=${sameSite}${sameSite === "None" ? "; Secure" : ""}` : "";
        document.cookie = `${name}=${value}${expires}; domain=${cookieDomain}; path=/${cookieSameSite}`;
    },

    getCookie: function (cName) {
        let cStart, cEnd;
        if (document.cookie.length > 0) {
            cStart = document.cookie.indexOf(`${cName}=`);
            if (cStart !== -1) {
                cStart = cStart + cName.length + 1;
                cEnd = document.cookie.indexOf(";", cStart);
                if (cEnd === -1) {
                    cEnd = document.cookie.length;
                }
                return unescape(document.cookie.substring(cStart, cEnd));
            }
        }
        return "";
    },

    deleteCookie: function (cName) {
        this.createCookie(cName, "", -1);
    }
};
