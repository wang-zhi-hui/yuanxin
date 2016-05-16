//
//  FirstCollectionViewCell.m
//  多选照片上传demo
//
//  Created by Changxiangkun on 16/3/10.
//  Copyright © 2016年 XRD. All rights reserved.
//

#import "FirstCollectionViewCell.h"

@implementation FirstCollectionViewCell

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
        [self createUI];
    }
    return self;
}

- (void)createUI
{
    _picture = [[UIImageView alloc]init];
  if(IS_IPHONE_6_IOS8)
  {
    _picture.frame = CGRectMake((kThumbnailLength_IPHONE6 - 50)/2, (kThumbnailLength_IPHONE6 - 50)/2, 50, 50);
  }
  else if(IS_IPHONE_6P_IOS8)
  {
    _picture.frame = CGRectMake((kThumbnailLength_IPHONE6P - 50)/2, (kThumbnailLength_IPHONE6P - 50)/2, 50, 50);
  }
  else
  {
    _picture.frame = CGRectMake((kThumbnailLength - 40)/2, (kThumbnailLength - 40)/2, 40, 40);
    
  }
  
    [self.contentView addSubview:_picture];
}


@end
