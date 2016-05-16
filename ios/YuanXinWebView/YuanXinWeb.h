//
//  YuanXinWebViewEnd.h
//  YuanXin
//
//  Created by Changxiangkun on 16/4/23.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTView.h"
#import "RCTBridgeModule.h"
#import "RCTAutoInsetsProtocol.h"
#import "YuanXinWebManager.h"

@class YuanXinWeb;

/**
 * Special scheme used to pass messages to the injectedJavaScript
 * code without triggering a page load. Usage:
 *
 *   window.location.href = RCTJSNavigationScheme + '://hello'
 */
extern NSString *const RCTJSNavigationScheme;

@protocol YuanXinWebDelegate <NSObject>

- (BOOL)webView:(YuanXinWeb *)webView
shouldStartLoadForRequest:(NSMutableDictionary<NSString *, id> *)request
   withCallback:(RCTDirectEventBlock)callback;

@end


@interface YuanXinWeb : RCTView<UIWebViewDelegate, RCTAutoInsetsProtocol>

@property (nonatomic, weak) id<YuanXinWebDelegate> delegate;

@property (nonatomic, copy) NSDictionary *source;
@property (nonatomic, assign) UIEdgeInsets contentInset;
@property (nonatomic, assign) BOOL automaticallyAdjustContentInsets;
@property (nonatomic, copy) NSString *injectedJavaScript;
@property (nonatomic, copy) RCTDirectEventBlock onLoadingStart;
@property (nonatomic, copy) RCTDirectEventBlock onLoadingFinish;
@property (nonatomic, copy) RCTDirectEventBlock onLoadingError;
@property (nonatomic, copy) RCTDirectEventBlock onShouldStartLoadWithRequest;
@property (nonatomic, copy) RCTDirectEventBlock onBridgeMessage;

- (instancetype)initWithManager:(YuanXinWebManager *)manager NS_DESIGNATED_INITIALIZER;


- (void)send:(NSString *)message;
- (void)goForward;
- (void)goBack;
- (void)reload;

@end
