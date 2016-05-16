//
//  YuanXinWebViewManagerEnd.m
//  YuanXin
//
//  Created by Changxiangkun on 16/4/23.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "YuanXinWebManager.h"
#import "RCTBridge.h"
#import "RCTUIManager.h"
#import "YuanXinWeb.h"
#import "UIView+React.h"
#import "RCTEventDispatcher.h"
#import "RCTView.h"
#import "RCTConvert.h"
#import "RCTLog.h"
#import "RCTUtils.h"

@interface YuanXinWebManager ()<YuanXinWebDelegate>

@end

static NSString *const RCTStorageDirectory = @"RCTAsyncLocalStorage_V1";
static NSString *const RCTManifestFileName = @"manifest.json";

@implementation YuanXinWebManager
{
  NSConditionLock *_shouldStartLoadLock;
  BOOL _shouldStartLoad;
   NSMutableDictionary<NSString *, NSString *> *_manifest;
}

RCT_EXPORT_MODULE()

- (UIView *)view
{
  YuanXinWeb *webView = [[YuanXinWeb alloc] initWithManager:self];
  [webView setTag:1001];
  webView.delegate = self;
  return webView;
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary)
RCT_REMAP_VIEW_PROPERTY(bounces, _webView.scrollView.bounces, BOOL)
RCT_REMAP_VIEW_PROPERTY(scrollEnabled, _webView.scrollView.scrollEnabled, BOOL)
RCT_REMAP_VIEW_PROPERTY(scalesPageToFit, _webView.scalesPageToFit, BOOL)
RCT_REMAP_VIEW_PROPERTY(decelerationRate, _webView.scrollView.decelerationRate, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(injectedJavaScript, NSString)
RCT_EXPORT_VIEW_PROPERTY(contentInset, UIEdgeInsets)
RCT_EXPORT_VIEW_PROPERTY(automaticallyAdjustContentInsets, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onLoadingStart, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadingFinish, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadingError, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onShouldStartLoadWithRequest, RCTDirectEventBlock)
RCT_REMAP_VIEW_PROPERTY(allowsInlineMediaPlayback, _webView.allowsInlineMediaPlayback, BOOL)

- (NSDictionary<NSString *, id> *)constantsToExport
{
  return @{
           @"JSNavigationScheme": RCTJSNavigationScheme,
           @"NavigationType": @{
               @"LinkClicked": @(UIWebViewNavigationTypeLinkClicked),
               @"FormSubmitted": @(UIWebViewNavigationTypeFormSubmitted),
               @"BackForward": @(UIWebViewNavigationTypeBackForward),
               @"Reload": @(UIWebViewNavigationTypeReload),
               @"FormResubmitted": @(UIWebViewNavigationTypeFormResubmitted),
               @"Other": @(UIWebViewNavigationTypeOther)
               },
           };
}

RCT_EXPORT_METHOD(callScript:(NSString *)callScriptString)
{
  UIWebView *web = (UIWebView *)[self.view viewWithTag:1001];
  [web stringByEvaluatingJavaScriptFromString:callScriptString];
}

RCT_EXPORT_METHOD(goBack:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, YuanXinWeb *> *viewRegistry) {
    YuanXinWeb *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[YuanXinWeb class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view goBack];
    }
  }];
}

RCT_EXPORT_METHOD(goForward:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[YuanXinWeb class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view goForward];
    }
  }];
}

RCT_EXPORT_METHOD(reload:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, YuanXinWeb *> *viewRegistry) {
    YuanXinWeb *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[YuanXinWeb class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
    } else {
      [view reload];
    }
  }];
}


#pragma mark - Exported synchronous methods

- (BOOL)webView:(__unused YuanXinWeb *)webView
shouldStartLoadForRequest:(NSMutableDictionary<NSString *, id> *)request
   withCallback:(RCTDirectEventBlock)callback
{
  _shouldStartLoadLock = [[NSConditionLock alloc] initWithCondition:arc4random()];
  _shouldStartLoad = YES;
  request[@"lockIdentifier"] = @(_shouldStartLoadLock.condition);
  callback(request);
  
  // Block the main thread for a maximum of 250ms until the JS thread returns
  if ([_shouldStartLoadLock lockWhenCondition:0 beforeDate:[NSDate dateWithTimeIntervalSinceNow:.25]]) {
    BOOL returnValue = _shouldStartLoad;
    [_shouldStartLoadLock unlock];
    _shouldStartLoadLock = nil;
    return returnValue;
  } else {
    RCTLogWarn(@"Did not receive response to shouldStartLoad in time, defaulting to YES");
    return YES;
  }
}

#pragma mark jsCallFunction

-(NSString *)getUserToken
{
  return [self _getValueForKey:@"cache_oauth_token" errorOut:nil];
}

static NSString *RCTGetManifestFilePath()
{
  static NSString *manifestFilePath = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    manifestFilePath = [RCTGetStorageDirectory() stringByAppendingPathComponent:RCTManifestFileName];
  });
  return manifestFilePath;
}
- (NSString *)_getValueForKey:(NSString *)key errorOut:(NSDictionary **)errorOut
{
  NSString *serialized = RCTReadFile(RCTGetManifestFilePath(), nil, errorOut);
  _manifest = serialized ? RCTJSONParseMutable(serialized, nil) : [NSMutableDictionary new];
  NSString *value = _manifest[key]; // nil means missing, null means there may be a data file, else: NSString
  if (value == (id)kCFNull) {
    value = [RCTGetCache() objectForKey:key];
    if (!value) {
      NSString *filePath = [self _filePathForKey:key];
      value = RCTReadFile(filePath, key, errorOut);
      if (value) {
        [RCTGetCache() setObject:value forKey:key cost:value.length];
      } else {
        // file does not exist after all, so remove from manifest (no need to save
        // manifest immediately though, as cost of checking again next time is negligible)
        [_manifest removeObjectForKey:key];
      }
    }
  }
  return value;
}

static NSCache *RCTGetCache()
{
  // We want all instances to share the same cache since they will be reading/writing the same files.
  static NSCache *cache;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    cache = [NSCache new];
    cache.totalCostLimit = 2 * 1024 * 1024; // 2MB
    
    // Clear cache in the event of a memory warning
    [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationDidReceiveMemoryWarningNotification object:nil queue:nil usingBlock:^(__unused NSNotification *note) {
      [cache removeAllObjects];
    }];
  });
  return cache;
}

- (NSString *)_filePathForKey:(NSString *)key
{
  NSString *safeFileName = RCTMD5Hash(key);
  return [RCTGetStorageDirectory() stringByAppendingPathComponent:safeFileName];
}

static NSString *RCTGetStorageDirectory()
{
  static NSString *storageDirectory = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    storageDirectory = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
    storageDirectory = [storageDirectory stringByAppendingPathComponent:RCTStorageDirectory];
  });
  return storageDirectory;
}

static NSString *RCTReadFile(NSString *filePath, NSString *key, NSDictionary **errorOut)
{
  if ([[NSFileManager defaultManager] fileExistsAtPath:filePath]) {
    NSError *error;
    NSStringEncoding encoding;
    NSString *entryString = [NSString stringWithContentsOfFile:filePath usedEncoding:&encoding error:&error];
    if (error) {
      *errorOut = RCTMakeError(@"Failed to read storage file.", error, @{@"key": key});
    } else if (encoding != NSUTF8StringEncoding) {
      *errorOut = RCTMakeError(@"Incorrect encoding of storage file: ", @(encoding), @{@"key": key});
    } else {
      return entryString;
    }
  }
  return nil;
}

//刷新
- (void)send:(NSString *)message
{
  if(self.bridge){
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"WebViewCommunication" body:message];
  }else{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.bridge.eventDispatcher sendDeviceEventWithName:@"WebViewCommunication" body:message];
    });
  }
}

- (void)showLoginView
{
  NSString *typeString = [NSString stringWithFormat:@"2"];
  
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"WebViewCommunication" body:@{@"type":typeString}];
}

- (void)closePage
{
  NSString *typeString = [NSString stringWithFormat:@"3"];
  
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"WebViewCommunication" body:@{@"type":typeString}];
}




RCT_EXPORT_METHOD(startLoadWithResult:(BOOL)result lockIdentifier:(NSInteger)lockIdentifier)
{
  if ([_shouldStartLoadLock tryLockWhenCondition:lockIdentifier]) {
    _shouldStartLoad = result;
    [_shouldStartLoadLock unlockWithCondition:0];
  } else {
    RCTLogWarn(@"startLoadWithResult invoked with invalid lockIdentifier: "
               "got %zd, expected %zd", lockIdentifier, _shouldStartLoadLock.condition);
  }
}

@end
