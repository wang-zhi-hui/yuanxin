//
//  selectImage.m
//  YuanXin
//
//  Created by Changxiangkun on 16/3/16.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "selectImage.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "CorePhoto.h"
#import "RCTUtils.h"

#define imageH (([UIScreen mainScreen].bounds.size.width)-20)/4
#define imageW (([UIScreen mainScreen].bounds.size.width)-20)/4
#define kMaxColumn 3
#define MaxImageCount 9
#define deleImageWH 25
#define kAdeleImage @"Bigright"
@implementation selectImage



@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(LocalImageChoose);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(choose:(NSInteger) maxCount isEdite:(BOOL)isEdite  tag:(NSString *)tag)
{
  
    _maxCount = maxCount;
    _isEdite = isEdite;
    self.tagString = tag;
    [self callImagePicker];
  
}

-(NSMutableArray *)imageDataArr
{
  if (_imageDataArr==nil) {
    _imageDataArr=[NSMutableArray array];
  }
  return _imageDataArr;
}
-(NSMutableArray *)imagePathArr
{
  if (_imagePathArr==nil) {
    _imagePathArr=[NSMutableArray array];
  }
  return _imagePathArr;
}
-(NSMutableArray *)images
{
  if (_images == nil) {
    _images = [NSMutableArray array];
  }
  return _images;
}
-(UIViewController *)pickVC
{
  if (_pickVC == nil) {
    _pickVC = [UIViewController new];
  }
  return _pickVC;
}

-(NSString *)tagString
{
  if (_tagString==nil) {
    _tagString=[NSString new];
  }
  return _tagString;
}

- (void)callImagePicker
{
  
  CorePhotoPickerVCManager *manager=[CorePhotoPickerVCManager sharedCorePhotoPickerVCManager];
  CorePhotoPickerVCMangerType type = CorePhotoPickerVCMangerTypeMultiPhoto;
  manager.pickerVCManagerType=type;
  manager.maxSelectedPhotoNumber=_maxCount;
  manager.isEdite = _isEdite;
  
  if(manager.unavailableType!=CorePhotoPickerUnavailableTypeNone){
    
    return;
  }
  self.pickVC = manager.imagePickerController;
  
  UIViewController *controller = RCTKeyWindow().rootViewController;
  
  [controller presentViewController:self.pickVC animated:YES completion:nil];
  
  __weak typeof(self) weakSelf = self;
  
  manager.finishPickingMedia=^(NSArray *medias){
    weakSelf.num = 0;
    
    weakSelf.num+=(int)medias.count;
    
    if (weakSelf.num<=_maxCount) {
      [medias enumerateObjectsUsingBlock:^(CorePhoto *photo, NSUInteger idx, BOOL *stop) {
  
        
        UIImage *image=photo.editedImage;
        
        NSMutableArray *pathArr = [[NSMutableArray alloc] init];
        [pathArr addObject:photo.referenceURL];
        
        NSData*imageData=UIImageJPEGRepresentation(image, 0.3);
        NSString *base64Encoded = [imageData base64EncodedStringWithOptions:0];
        NSMutableArray *dataArr = [[NSMutableArray alloc] init];
        [dataArr addObject:base64Encoded];
        [weakSelf.imageDataArr addObject:imageData];
        
        [weakSelf.images addObject:image];
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dataArr options:NSJSONWritingPrettyPrinted error:nil];
        NSString *jsonStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        
        NSData *jsonPathData = [NSJSONSerialization dataWithJSONObject:pathArr options:NSJSONWritingPrettyPrinted error:nil];
        NSString *jsonPath = [[NSString alloc] initWithData:jsonPathData encoding:NSUTF8StringEncoding];
        
        [weakSelf.bridge.eventDispatcher sendDeviceEventWithName:@"ImageCapture" body:@{@"data": jsonStr, @"FilePath":jsonPath,@"tag": _tagString}];
        
//        self.imagePathArr = nil;
        
      }];
//      NSLog(@"%@", self.imagePathArr);

//      NSArray *arr = self.imagePathArr;
      
      
      
    }else{
      weakSelf.num-=(int)medias.count;
      UIAlertView * alertView = [[UIAlertView alloc]initWithTitle:Nil message:@"超过范围" delegate:self cancelButtonTitle:@"重新添加" otherButtonTitles:nil];
      [alertView show];
    }
  };
  
}

- (void)start : (UIButton *)btn {
  double angle1 = -5.0 / 180.0 * M_PI;
  double angle2 = 5.0 / 180.0 * M_PI;
  CAKeyframeAnimation *anim = [CAKeyframeAnimation animation];
  anim.keyPath = @"transform.rotation";
  anim.values = @[@(angle1),  @(angle2), @(angle1)];
  anim.duration = 0.25;
  anim.repeatCount = MAXFLOAT;
  anim.removedOnCompletion = NO;
  anim.fillMode = kCAFillModeForwards;
  [btn.layer addAnimation:anim forKey:@"shake"];
}

- (void)stop : (UIButton *)btn{
  [btn.layer removeAnimationForKey:@"shake"];
}


@end
