//
//  MainViewController.h
//  iCRMcontainer
//
//  Created by Marco Hanowski on 11.05.12.
//  Copyright (c) 2012 M-Way Solutions GmbH. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CustomWebView.h"
#import "FBConnect.h"

@interface MainViewController : UIViewController <UIWebViewDelegate, UIApplicationDelegate, UIAlertViewDelegate,FBRequestDelegate,FBDialogDelegate,FBSessionDelegate>
{
    CustomWebView *webView;
    UIActivityIndicatorView *activityIndicator;
    UIImageView *imageView;
    NSString *game;
    UIButton *facebookButton;
}

@end
