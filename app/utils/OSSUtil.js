/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {NativeModules,Platform} = React;
var ossToolModule = NativeModules.upImage;
var OSSAndroidUtil = require('./OSSAndroidUtil');
var Util = require('./Util');
var OSSUtil = {
    uploadFile(files){
        if (Platform.OS == 'ios') {
            ossToolModule.upImage(files);
        }
        else {
            OSSAndroidUtil.upload(files);
        }
    },
    checkFileSuccess(fileList){
        let isAllSuccess = true;
        for (let i = 0; i < fileList.length; i++) {
            if (!fileList[i].code) {
                if (!fileList[i].UpdateLoadUrl) {
                    isAllSuccess = false;
                }
            }
        }
        return isAllSuccess;
    },
    getItemFile(itemFile){
        if (itemFile.OssFileName) {
            return {
                FileName: itemFile.OssFileName,
                Suffix: itemFile.Suffix,
                URL: itemFile.UpdateLoadUrl,
                FileSize: itemFile.OssFileSize,
                SortNo: itemFile.SortNo
            };
        }
        else
            return itemFile;
    },
    setFileSuccess(successFile, fileList){
        let newsFileList = fileList;
        for (let i = 0; i < newsFileList.length; i++) {
            if (successFile.FilePath == newsFileList[i].url) {
                newsFileList[i].UpdateLoadUrl = successFile.UpdateLoadUrl;
                newsFileList[i].SortNo = Platform.OS == 'android' ? parseInt(successFile.SortNo) : successFile.SortNo;
                newsFileList[i].OssFileSize = successFile.OssFileSize;
                newsFileList[i].Suffix = successFile.Suffix;
                newsFileList[i].OssFileName = successFile.OssFileName;
                break;
            }
        }
        return newsFileList;
    },
    setUserSelectPhoto(uploadList, selectPhotoList, fileType){
        let osName = Platform.OS;
        let ossFolder = 'BusinessPlatform';
        for (var i = 0; i < selectPhotoList.length; i++) {
            if (!Util.Vailidate.checkUrlHead(selectPhotoList[i].url)) {
                if (osName == 'android') {
                    uploadList.push({
                        FileType: fileType,
                        FilePath: selectPhotoList[i].url,
                        SortNo: (i + 1),
                        OssFolder: ossFolder
                    });
                }
                else {
                    uploadList.push({
                        FileType: fileType,
                        FilePath: selectPhotoList[i].base,
                        SortNo: (i + 1),
                        OssFolder: ossFolder,
                        FileBase: selectPhotoList[i].url
                    });
                }
            }
        }
    }
};
module.exports = OSSUtil;