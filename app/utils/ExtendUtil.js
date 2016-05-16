/**
 * Created by lemon on 16/3/1.
 */
~(function init() {
    Date.prototype.format = function (format) {

        format = format || "yyyy-MM-dd hh:mm:ss";
        var date = this;
        return format.replace("yyyy", date.getFullYear()).replace("MM", (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1)).replace("dd", date.getDate())
            .replace("hh", date.getHours()).replace("mm", date.getMinutes()).replace("ss", date.getSeconds())
    }
})();