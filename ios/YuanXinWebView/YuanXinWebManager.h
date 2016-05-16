//
//  YuanXinWebViewManagerEnd.h
//  YuanXin
//
//  Created by Changxiangkun on 16/4/23.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTViewManager.h"
#import <JavaScriptCore/JavaScriptCore.h>

@protocol JSObjcDelegate;

@protocol JSObjcDelegate <JSExport>
- (NSString *)getUserToken;
//- (void)getRefreshUserToken;
- (void)send:(NSString *)message;
- (void)showLoginView;
- (void)closePage;


@end

@interface YuanXinWebManager : RCTViewManager<JSObjcDelegate>

@end
