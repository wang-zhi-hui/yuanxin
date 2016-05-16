//
//  addTipView.m
//  YuanXin
//
//  Created by Changxiangkun on 16/3/16.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "addTipView.h"
#import "RCTUtils.h"
#import "MBProgressHUD.h"


@implementation addTipView

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}


RCT_EXPORT_METHOD(addTipView:(NSString *)text)
{
  [self addTipsView:text];

}

- (void)addTipsView:(NSString *)textStr
{
  UIViewController *controller = RCTKeyWindow().rootViewController;

  MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:controller.view animated:YES];
  hud.bezelView.color = [UIColor blackColor];
  hud.mode = MBProgressHUDModeText;
  hud.label.text = textStr;
  hud.bezelView.layer.cornerRadius = 12.0;
  hud.label.textColor = [UIColor whiteColor];
  hud.margin = 10.f;
//  hud.yOffset = 200.f;
  hud.userInteractionEnabled = NO;
  hud.removeFromSuperViewOnHide = YES;
  [hud hideAnimated:YES afterDelay:2];
//
  NSLog(@"%@", textStr);
  
//  [[DMCAlertCenter defaultCenter] postAlertWithMessage:@"网络未连接"];
  
//  UIView *view = [[UIView alloc] initWithFrame:CGRectMake(100, 100, 200, 100)];
//  
//  view.backgroundColor = [UIColor redColor];
//  
//  [controller.view addSubview:view];
  
  
}

- (void)deleteTipsView:(UIView *)tipView
{
  [tipView removeFromSuperview];
  
}


@end
