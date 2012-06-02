//
//  AppDelegate.h
//  ScoreShaker
//
//  Created by Matthias Nagel on 01.06.12.
//  Copyright (c) 2012 HdM Stuttgart. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MainViewController.h"
#import "FBConnect.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate>
{
    UIWindow *window;
    MainViewController *viewController;
    
    Facebook *facebook;
    NSMutableDictionary *userPermissions;
}

@property (nonatomic,retain) Facebook *facebook;
@property (nonatomic,readonly) NSArray *facebookPermissions;
@property (nonatomic,retain) NSMutableDictionary *userPermissions;

@end
