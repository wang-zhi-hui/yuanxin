//
//  upImage.m
//  YuanXin
//
//  Created by Changxiangkun on 16/3/16.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "upImage.h"
#import <AliyunOSSiOS/OSSService.h>
#import "AFNetworkReachabilityManager.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "RCTConvert.h"

@implementation upImage

@synthesize bridge = _bridge;
@synthesize uploadFiles =_uploadFiles;

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(upImage:(NSString *)jsonstr)
{
  //  [self AFNetWorkingStatus];
  
  NSData *jsonData = [jsonstr dataUsingEncoding:NSUTF8StringEncoding];
  NSArray *arr = [NSJSONSerialization JSONObjectWithData:jsonData
                                                 options:NSJSONReadingMutableContainers
                                                   error:nil];
  
  if(arr && arr.count >0){
    [self initOssClient];
    [self uploadCurrentFiles:arr];
    //  for (NSDictionary *dic in arr) {
    //    [self getDataAndPost:self.FilePath];
  }
  //  [self sendEvent:self.backArr];
  
}
//http://yuanxinapp.oss-cn-beijing.aliyuncs.com/BusinessPlatform%2Ftest.jpg
// http://bucketName.+yuanxinapp.oss-cn-beijing.aliyuncs.com/objectKey

//static float progress = 0.f;


#pragma mark - OSSUpload

- (void)initOssClient{
  NSString *endpoint = @"http://oss-cn-beijing.aliyuncs.com";
  
  id<OSSCredentialProvider> credential = [[OSSPlainTextAKSKPairCredentialProvider alloc] initWithPlainTextAccessKey:@"ElsIho4Y4fWTvFib" secretKey:@"W9nZpJCpg3XXbhI9Yk8FITwJa7bvvi"];
  OSSClientConfiguration * conf = [OSSClientConfiguration new];
  conf.maxRetryCount = 3;
  conf.timeoutIntervalForRequest = 30;
  conf.timeoutIntervalForResource = 24 * 60 * 60;
  _client = [[OSSClient alloc] initWithEndpoint:endpoint credentialProvider:credential clientConfiguration:conf];
}

- (void)uploadCurrentFiles:(NSArray *)arrayFiles{
  
   __weak typeof(self)weakSelf = self;
  
  for(NSDictionary *dic in arrayFiles) {
    NSString *key = [self createUploadFileName:@"jpg"];
    self.FileType = [dic objectForKey:@"FileType"];
    self.FilePath = [dic objectForKey:@"FilePath"];
    self.SortNo = [dic objectForKey:@"SortNo"];
    self.OssFolder = [dic objectForKey:@"OssFolder"];
    self.FileBase = [dic objectForKey:@"FileBase"];
    self.OssFileSize = [NSString stringWithFormat:@"%lu", (unsigned long)[[[NSData alloc]initWithBase64EncodedString: [dic objectForKey:@"FilePath"] options:0] length]];
    self.OssFileName = key;
    self.UpdateLoadUrl = [NSString stringWithFormat:@"http://yuanxinapp.oss-cn-beijing.aliyuncs.com/%@/%@", self.OssFolder, key];
    self.Suffix = @"jpg";
    NSString *progressStr = [NSString stringWithFormat:@"%f", 1.0];
    self.backDic = @{@"FileType": self.FileType,@"SortNo": self.SortNo,@"FilePath": self.FileBase,@"OssFolder": self.OssFolder,@"UpdateLoadUrl": self.UpdateLoadUrl,@"OssFileName": self.OssFileName,@"OssFileSize": self.OssFileSize,@"Suffix": self.Suffix,@"errorMessage": [NSNull null],@"percent":progressStr};
    
    
    [self.uploadFiles setObject:self.backDic forKey:key];
    __block OSSAppendObjectRequest * appendFile = [OSSAppendObjectRequest new];
    appendFile.bucketName = @"yuanxinapp";
    appendFile.objectKey = [NSString stringWithFormat:@"%@/%@", [dic objectForKey:@"OssFolder"], key];
    appendFile.appendPosition = 0;
    appendFile.contentType  = [self contentType:@"jpg"];
    appendFile.uploadingData = [[NSData alloc]initWithBase64EncodedString: [dic objectForKey:@"FilePath"] options:0];
    appendFile.uploadProgress = ^(int64_t bytesSent, int64_t totalByteSent, int64_t totalBytesExpectedToSend) {
      
    };
    
    OSSTask * appendTask =  [self.client appendObject:appendFile];
    [appendTask continueWithBlock:^id(OSSTask *task) {
      //      NSLog(@"objectKey: 在这%@", [[self.uploadFiles objectForKey:appendFile.objectKey] objectForKey:@"FileType"]   );
      if(!task.error){
        
  
        [weakSelf.bridge.eventDispatcher sendDeviceEventWithName:@"finish" body:[self.uploadFiles objectForKey:key]];
        
        OSSAppendObjectResult * result = task.result;
        NSString * etag = result.eTag;
        //        NSLog(@"objectKey: %@", etag);
      }else{
        NSLog(@"append object failed, error: %@" , task.error);
      }
      return  NULL;
    }];
  }
}

- (NSString *)createUploadFileName:(NSString *)extension{
  NSString *uuid = [[[NSUUID UUID] UUIDString] stringByReplacingOccurrencesOfString:@"-" withString:@""];
  return  [[NSString alloc] initWithFormat:@"%@.%@",uuid,extension];
}

- (NSMutableDictionary *)uploadFiles{
  if(!_uploadFiles){
    _uploadFiles = [[NSMutableDictionary alloc] init];
  }
  return _uploadFiles;
}

//- (void)OSSUpload:(NSData *)data ImageName:(NSString *)name andTotalCount:(NSInteger )tCount
//{
//   __weak typeof(self) weakSelf = self;
//
//  OSSAppendObjectRequest * append = [OSSAppendObjectRequest new];
//
//  append.bucketName = @"yuanxinapp";
//  append.objectKey = [NSString stringWithFormat:@"%@/%@", _OssFolder,name];
//  append.appendPosition = 0;
//  append.uploadingData = data;
//  append.contentType = [self contentType:@"jpg"];
//  OSSTask * appendTask = [self.client appendObject:append];
//
//
//
//  append.uploadProgress = ^(int64_t bytesSent, int64_t totalByteSent, int64_t totalBytesExpectedToSend) {
//
////      progress = (float) totalByteSent/totalBytesExpectedToSend;
//
//
//    };
//
//  NSString *progressStr = [NSString stringWithFormat:@"%f", 1.0];
//
//  self.OssFileSize = [NSString stringWithFormat:@"%lu", (unsigned long)[data length]];
//  self.OssFileName = name;
//  self.UpdateLoadUrl = [NSString stringWithFormat:@"http://yuanxinapp.oss-cn-beijing.aliyuncs.com/%@/%@", self.OssFolder, name];
//  self.Suffix = @"jpg";
//  self.backDic = @{@"FileType": self.FileType,@"SortNo": self.SortNo,@"FilePath": self.FileBase,@"OssFolder": self.OssFolder,@"UpdateLoadUrl": self.UpdateLoadUrl,@"OssFileName": self.OssFileName,@"OssFileSize": self.OssFileSize,@"Suffix": self.Suffix,@"errorMessage": [NSNull null],@"percent":progressStr};
//
//  [self.bridge.eventDispatcher sendDeviceEventWithName:@"finish" body:self.backDic];
//
//
//
//  [appendTask continueWithBlock:^id(OSSTask *task) {
//    NSLog(@"objectKey: %@", append.objectKey);
//    if (!task.error) {
//
////      NSLog(@"%@", weakSelf.FileBase);
//
//    } else {
//      NSLog(@"append object failed, error: %@" , task.error);
//
//      weakSelf.OssFileSize = [NSString stringWithFormat:@"%lu", (unsigned long)[data length]];
//      weakSelf.OssFileName = name;
//      weakSelf.UpdateLoadUrl = [NSString stringWithFormat:@"http://yuanxinapp.oss-cn-beijing.aliyuncs.com/%@/%@", weakSelf.OssFolder, name];
//      weakSelf.Suffix = @"jpg";
//      weakSelf.backDic = @{@"FileType": weakSelf.FileType,@"SortNo": weakSelf.SortNo,@"FilePath": weakSelf.FileBase,@"OssFolder": weakSelf.OssFolder,@"UpdateLoadUrl": weakSelf.UpdateLoadUrl,@"OssFileName": weakSelf.OssFileName,@"OssFileSize": weakSelf.OssFileSize,@"Suffix": weakSelf.Suffix,@"errorMessage": task.error,@"percent":[NSNull null]};
//
//      [weakSelf.bridge.eventDispatcher sendDeviceEventWithName:@"finish" body:self.backDic];
//
//    }
//    return nil;
//  }];
//}

- (NSString *)contentType:(NSString *)FilenameExtension
{
  if([FilenameExtension isEqualToString:@"BMP"]||[FilenameExtension isEqualToString:@"bmp"]){return @"image/bmp";}
  if([FilenameExtension isEqualToString:@"GIF"]||[FilenameExtension isEqualToString:@"gif"]){return @"image/gif";}
  if([FilenameExtension isEqualToString:@"JPEG"]||[FilenameExtension isEqualToString:@"jpeg"]||
     [FilenameExtension isEqualToString:@"JPG"]||[FilenameExtension isEqualToString:@"jpg"]||
     [FilenameExtension isEqualToString:@"PNG"]||[FilenameExtension isEqualToString:@"png"]){return @"image/jpeg";}
  if([FilenameExtension isEqualToString:@"HTML"]||[FilenameExtension isEqualToString:@"html"]){return @"text/html";}
  if([FilenameExtension isEqualToString:@"TXT"]||[FilenameExtension isEqualToString:@"txt"]){return @"text/plain";}
  if([FilenameExtension isEqualToString:@"VSD"]||[FilenameExtension isEqualToString:@"vsd"]){return @"application/vnd.visio";}
  if([FilenameExtension isEqualToString:@"PPTX"]||[FilenameExtension isEqualToString:@"pptx"]||
     [FilenameExtension isEqualToString:@"PPT"]||[FilenameExtension isEqualToString:@"ppt"]){return @"application/vnd.ms-powerpoint";}
  if([FilenameExtension isEqualToString:@"DOCX"]||[FilenameExtension isEqualToString:@"docx"]||
     [FilenameExtension isEqualToString:@"DOC"]||[FilenameExtension isEqualToString:@"doc"]){return @"application/msword";}
  if([FilenameExtension isEqualToString:@"XML"]||[FilenameExtension isEqualToString:@"xml"]){return @"text/xml";}
  return @"text/html";
  
}

-(NSDictionary *)backDic
{
  if (_backDic==nil) {
    _backDic=[NSDictionary new];
  }
  return _backDic;
}
-(NSString *)OssFileSize
{
  if (_OssFileSize==nil) {
    _OssFileSize=[NSString new];
  }
  return _OssFileSize;
}
-(NSString *)OssFileName
{
  if (_OssFileName==nil) {
    _OssFileName=[NSString new];
  }
  return _OssFileName;
}
-(NSString *)UpdateLoadUrl
{
  if (_UpdateLoadUrl==nil) {
    _UpdateLoadUrl=[NSString new];
  }
  return _UpdateLoadUrl;
}
-(NSString *)Suffix
{
  if (_Suffix==nil) {
    _Suffix=[NSString new];
  }
  return _Suffix;
}
-(NSString *)FileType
{
  if (_FileType==nil) {
    _FileType=[NSString new];
  }
  return _FileType;
}
-(NSString *)FilePath
{
  if (_FilePath==nil) {
    _FilePath=[NSString new];
  }
  return _FilePath;
}
-(NSString *)SortNo
{
  if (_SortNo==nil) {
    _SortNo=[NSString new];
  }
  return _SortNo;
}
-(NSString *)OssFolder
{
  if (_OssFolder==nil) {
    _OssFolder=[NSString new];
  }
  return _OssFolder;
}
-(NSString *)FileBase
{
  if (_FileBase==nil) {
    _FileBase=[NSString new];
  }
  return _FileBase;
}


-(NSString *)imageName
{
  if (_imageName==nil) {
    _imageName=[NSString new];
  }
  return _imageName;
}

-(NSData *)dataNa
{
  if (_dataNa == nil) {
    _dataNa = [NSData new];
  }
  return _dataNa;
}




#pragma mark - 检测网络状态

- (void)AFNetWorkingStatus
{
  [[AFNetworkReachabilityManager sharedManager] startMonitoring];
  
  [[AFNetworkReachabilityManager sharedManager] setReachabilityStatusChangeBlock:^(AFNetworkReachabilityStatus status) {
    
    if (status == -1) {
      //未知
      
      
    } else if (status == 0) {
      //无连接
      
      
    } else if (status == 1) {
      //3g网络
      
    } else if (status == 2) {
      //wifi连接
      
    }
  }];
}


@end
