package com.yuanxin.alioss;

/**
 * Created by Administrator on 2016/3/21.
 */
public class CallBackBean extends UploadBean{
    private String UpdateLoadUrl;
    private String OssFileName;
    private long OssFileSize;
    private String Suffix;
    private String Persent;
    private String Msg;
    private long CurrentSize;

    public long getCurrentSize() {
        return CurrentSize;
    }

    public void setCurrentSize(long currentSize) {
        CurrentSize = currentSize;
    }

    public String getPersent() {
        return Persent;
    }

    public void setPersent(String persent) {
        Persent = persent;
    }

    public String getMsg() {
        return Msg;
    }

    public void setMsg(String msg) {
        Msg = msg;
    }

    public String getUpdateLoadUrl() {
        return UpdateLoadUrl;
    }

    public void setUpdateLoadUrl(String updateLoadUrl) {
        UpdateLoadUrl = updateLoadUrl;
    }

    public String getOssFileName() {
        return OssFileName;
    }

    public void setOssFileName(String ossFileName) {
        OssFileName = ossFileName;
    }

    public long getOssFileSize() {
        return OssFileSize;
    }

    public void setOssFileSize(long ossFileSize) {
        OssFileSize = ossFileSize;
    }

    public String getSuffix() {
        return Suffix;
    }

    public void setSuffix(String suffix) {
        Suffix = suffix;
    }
}
