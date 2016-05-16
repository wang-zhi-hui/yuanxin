//
//  selectImage.h
//  YuanXin
//
//  Created by Changxiangkun on 16/3/16.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "CorePhotoPickerVCManager.h"


@interface selectImage : NSObject<RCTBridgeModule, UINavigationControllerDelegate>
{
  NSInteger _maxCount;
  BOOL _isEdite;
}
@property (nonatomic, strong) NSMutableArray *images;
@property (nonatomic, strong) NSMutableArray *imageDataArr;
@property (nonatomic, strong) NSMutableArray *imagePathArr;
@property(nonatomic,assign)int num;
@property (nonatomic, retain) UIViewController *pickVC;

@property (nonatomic, strong) NSString *tagString;

@end
