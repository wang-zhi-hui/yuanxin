package com.yuanxin.alioss;

/**
 * Created by Administrator on 2016/3/21.
 *
 * "[{"FileType":"userPhoto","FilePath":"assets-library://asset/asset.JPG?id=71C96DEF-A0C0-449C-9ECA-687E48CAD867&ext=JPG","SortNo":1,"OssFolder":"BusinessPlatform"}]"
 */
public class UploadBean {

    private String FileType;
    private String FilePath;
    private String SortNo;
    private String OssFolder;
    private String Tag;
    private String bucket="yuanxinapp";

    static public UploadBean getInstance()
    {
        UploadBean uploadBean= new UploadBean();
        uploadBean.FileType="FileType";
        uploadBean.FilePath="FilePath";
        uploadBean.SortNo="SortNo";
        uploadBean.OssFolder="OssFolder";
        uploadBean.Tag="Tag";
        uploadBean.bucket="yuanxinapp";
     return uploadBean;
    }
    public String getBucket() {
        return bucket;
    }

    public void setBucket(String bucket) {
        this.bucket = bucket;
    }

    public String getFileType() {
        return FileType;
    }

    public void setFileType(String fileType) {
        FileType = fileType;
    }

    public String getFilePath() {
        return FilePath;
    }

    public void setFilePath(String filePath) {
        FilePath = filePath;
    }

    public String getSortNo() {
        return SortNo;
    }

    public void setSortNo(String sortNo) {
        SortNo = sortNo;
    }

    public String getOssFolder() {
        return OssFolder;
    }

    public void setOssFolder(String ossFolder) {
        OssFolder = ossFolder;
    }

    public String getTag() {
        return Tag;
    }

    public void setTag(String tag) {
        Tag = tag;
    }
}
