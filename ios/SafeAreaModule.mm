#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
@interface SafeAreaModule : NSObject <RCTBridgeModule>
@end

@implementation SafeAreaModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getSafeAreaInsets:(RCTResponseSenderBlock)callback) {
    UIViewController *rootViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    UIEdgeInsets safeAreaInsets = UIEdgeInsetsZero;

    if (@available(iOS 11.0, *)) {
        safeAreaInsets = rootViewController.view.safeAreaInsets;
    }

    NSDictionary *result = @{
        @"top": @(safeAreaInsets.top),
        @"bottom": @(safeAreaInsets.bottom),
        @"left": @(safeAreaInsets.left),
        @"right": @(safeAreaInsets.right)
    };

    callback(@[[NSNull null], result]);
}

@end
