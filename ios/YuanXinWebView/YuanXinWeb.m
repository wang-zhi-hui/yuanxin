//
//  YuanXinWebViewEnd.m
//  YuanXin
//
//  Created by Changxiangkun on 16/4/23.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "YuanXinWeb.h"
#import <UIKit/UIKit.h>

#import "RCTEventDispatcher.h"
#import "RCTConvert.h"
#import "UIView+React.h"
#import "RCTLog.h"
#import "RCTUtils.h"
#import "YuanXinWebManager.h"

@interface YuanXinWeb()
@property (nonatomic,strong)YuanXinWebManager *currentMagager;
@end

@implementation YuanXinWeb
{
  UIWebView *_webView;
  NSString *_injectedJavaScript;
  
}

- (void)dealloc
{
  _webView.delegate = nil;
}

- (instancetype)initWithManager:(YuanXinWebManager *)manager
{
  RCTAssertParam(manager);
  self.currentMagager = manager;
  if ((self = [super initWithFrame:CGRectZero])) {
    super.backgroundColor = [UIColor clearColor];
    _automaticallyAdjustContentInsets = YES;
    _contentInset = UIEdgeInsetsZero;
    _webView = [[UIWebView alloc] initWithFrame:self.bounds];
    _webView.delegate = self;
    [self addSubview:_webView];
  }
  return self;

}


- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    super.backgroundColor = [UIColor clearColor];
    _automaticallyAdjustContentInsets = YES;
    _contentInset = UIEdgeInsetsZero;
    _webView = [[UIWebView alloc] initWithFrame:self.bounds];
    _webView.delegate = self;
    [self addSubview:_webView];
  }
  return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)

- (void)goForward
{
  [_webView goForward];
}

- (void)goBack
{
  [_webView goBack];
}

- (void)reload
{
  [_webView reload];
}

- (void)setSource:(NSDictionary *)source
{
  if (![_source isEqualToDictionary:source]) {
    _source = [source copy];
    
    // Check for a static html source first
    NSString *html = [RCTConvert NSString:source[@"html"]];
    if (html) {
      NSURL *baseURL = [RCTConvert NSURL:source[@"baseUrl"]];
      [_webView loadHTMLString:html baseURL:baseURL];
      return;
    }
    
    NSURLRequest *request = [RCTConvert NSURLRequest:source];
    // Because of the way React works, as pages redirect, we actually end up
    // passing the redirect urls back here, so we ignore them if trying to load
    // the same url. We'll expose a call to 'reload' to allow a user to load
    // the existing page.
    if ([request.URL isEqual:_webView.request.URL]) {
      return;
    }
    if (!request.URL) {
      // Clear the webview
      [_webView loadHTMLString:@"" baseURL:nil];
      return;
    }
    [_webView loadRequest:request];
  }
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  _webView.frame = self.bounds;
}

- (void)setContentInset:(UIEdgeInsets)contentInset
{
  _contentInset = contentInset;
  [RCTView autoAdjustInsetsForView:self
                    withScrollView:_webView.scrollView
                      updateOffset:NO];
}

- (void)setBackgroundColor:(UIColor *)backgroundColor
{
  CGFloat alpha = CGColorGetAlpha(backgroundColor.CGColor);
  self.opaque = _webView.opaque = (alpha == 1.0);
  _webView.backgroundColor = backgroundColor;
}

- (UIColor *)backgroundColor
{
  return _webView.backgroundColor;
}

- (NSMutableDictionary<NSString *, id> *)baseEvent
{
  NSMutableDictionary<NSString *, id> *event = [[NSMutableDictionary alloc] initWithDictionary:@{
                                                                                                 @"url": _webView.request.URL.absoluteString ?: @"",
                                                                                                 @"loading" : @(_webView.loading),
                                                                                                 @"title": [_webView stringByEvaluatingJavaScriptFromString:@"document.title"],
                                                                                                 @"canGoBack": @(_webView.canGoBack),
                                                                                                 @"canGoForward" : @(_webView.canGoForward),
                                                                                                 }];
  
  return event;
}

- (void)refreshContentInset
{
  [RCTView autoAdjustInsetsForView:self
                    withScrollView:_webView.scrollView
                      updateOffset:YES];
}



#pragma mark - UIWebViewDelegate methods

- (BOOL)webView:(__unused UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request
 navigationType:(UIWebViewNavigationType)navigationType
{
  BOOL isJSNavigation = [request.URL.scheme isEqualToString:RCTJSNavigationScheme];
  
  // skip this for the JS Navigation handler
  if (!isJSNavigation && _onShouldStartLoadWithRequest) {
    NSMutableDictionary<NSString *, id> *event = [self baseEvent];
    [event addEntriesFromDictionary: @{
                                       @"url": (request.URL).absoluteString,
                                       @"navigationType": @(navigationType)
                                       }];
    if (![self.delegate webView:self
      shouldStartLoadForRequest:event
                   withCallback:_onShouldStartLoadWithRequest]) {
      return NO;
    }
  }
  
  if (_onLoadingStart) {
    // We have this check to filter out iframe requests and whatnot
    BOOL isTopFrame = [request.URL isEqual:request.mainDocumentURL];
    if (isTopFrame) {
      NSMutableDictionary<NSString *, id> *event = [self baseEvent];
      [event addEntriesFromDictionary: @{
                                         @"url": (request.URL).absoluteString,
                                         @"navigationType": @(navigationType)
                                         }];
      _onLoadingStart(event);
    }
  }
  
  // JS Navigation handler
  return !isJSNavigation;
}

- (void)webView:(__unused UIWebView *)webView didFailLoadWithError:(NSError *)error
{
  if (_onLoadingError) {
    if ([error.domain isEqualToString:NSURLErrorDomain] && error.code == NSURLErrorCancelled) {
      // NSURLErrorCancelled is reported when a page has a redirect OR if you load
      // a new URL in the WebView before the previous one came back. We can just
      // ignore these since they aren't real errors.
      // http://stackoverflow.com/questions/1024748/how-do-i-fix-nsurlerrordomain-error-999-in-iphone-3-0-os
      return;
    }
    
    NSMutableDictionary<NSString *, id> *event = [self baseEvent];
    [event addEntriesFromDictionary:@{
                                      @"domain": error.domain,
                                      @"code": @(error.code),
                                      @"description": error.localizedDescription,
                                      }];
    _onLoadingError(event);
  }
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
  if (_injectedJavaScript != nil) {
    NSString *jsEvaluationValue = [webView stringByEvaluatingJavaScriptFromString:_injectedJavaScript];
    
    NSMutableDictionary<NSString *, id> *event = [self baseEvent];
    event[@"jsEvaluationValue"] = jsEvaluationValue;
    
    _onLoadingFinish(event);
  }
  // we only need the final 'finishLoad' call so only fire the event when we're actually done loading.
  else if (_onLoadingFinish && !webView.loading && ![webView.request.URL.absoluteString isEqualToString:@"about:blank"]) {
    _onLoadingFinish([self baseEvent]);
  }
  
  JSContext *context=[webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
  
  context[@"YuanXin"] = self.currentMagager;
  
}

- (void)send:(NSString *)message{
  NSMutableDictionary<NSString *, id> *onBridgeMessageEvent = [[NSMutableDictionary alloc] initWithDictionary:@{
                                                                                                                @"messages": message
                                                                                                                }];
  
  _onBridgeMessage(onBridgeMessageEvent);
}

/*
 // Only override drawRect: if you perform custom drawing.
 // An empty implementation adversely affects performance during animation.
 - (void)drawRect:(CGRect)rect {
 // Drawing code
 }
 */

@end
