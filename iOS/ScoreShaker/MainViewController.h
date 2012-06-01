//
//  MainViewController.h
//  iCRMcontainer
//
//  Created by Marco Hanowski on 11.05.12.
//  Copyright (c) 2012 M-Way Solutions GmbH. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CustomWebView.h"

@interface MainViewController : UIViewController <UIWebViewDelegate, UIApplicationDelegate>
{
    CustomWebView *webView;
    UIActivityIndicatorView *activityIndicator;
    UIImageView *imageView;
}

@end
