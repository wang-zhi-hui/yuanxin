//
//  upImage.h
//  YuanXin
//
//  Created by Changxiangkun on 16/3/16.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import <AliyunOSSiOS/OSSService.h>

@interface upImage : NSObject<RCTBridgeModule>
{
  NSData *_data;
  NSString *_finalPath;
  
//  NSString *_FileType;
//  NSString *_FilePath;
//  NSString *_FileBase;
//  NSString *_SortNo;
//  NSString *_OssFolder;
//  NSString *_UpdateLoadUrl;
//  NSString *_OssFileName;
//  NSString *_OssFileSize;
//  NSString *_Suffix;
  
//  NSDictionary *_backDic;
  NSInteger _tCount;
  
}

@property (nonatomic, strong)NSString *imageName;
@property (nonatomic, strong)NSData *dataNa;
@property (nonatomic, strong)NSMutableArray *backArr;
@property (nonatomic, strong)OSSClient *client;
@property (nonatomic, strong)NSDictionary *backDic;


@property (nonatomic, strong)NSString *FileType;
@property (nonatomic, strong)NSString *FilePath;
@property (nonatomic, strong)NSString *FileBase;
@property (nonatomic, strong)NSString *SortNo;
@property (nonatomic, strong)NSString *OssFolder;
@property (nonatomic, strong)NSString *UpdateLoadUrl;
@property (nonatomic, strong)NSString *OssFileName;
@property (nonatomic, strong)NSString *OssFileSize;
@property (nonatomic, strong)NSString *Suffix;

@property (nonatomic,strong,readonly) NSMutableDictionary * uploadFiles;


@end
