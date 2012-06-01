//
//  AppDelegate.m
//  ScoreShaker
//
//  Created by Matthias Nagel on 01.06.12.
//  Copyright (c) 2012 HdM Stuttgart. All rights reserved.
//

#import "AppDelegate.h"
#import "GANTracker.h"

static NSString* const kAnalyticsAccountId = @"UA-32341829-1";
static const NSInteger kGANDispatchPeriodSec = 10;

@implementation AppDelegate

- (void)dealloc
{
    [[GANTracker sharedTracker] stopTracker];
    [window release];
    [viewController release];
    [super dealloc];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [[GANTracker sharedTracker] startTrackerWithAccountID:kAnalyticsAccountId
                                           dispatchPeriod:kGANDispatchPeriodSec
                                                 delegate:nil];
    NSError *error;
    
    if (![[GANTracker sharedTracker] setCustomVariableAtIndex:1
                                                         name:[[NSBundle mainBundle] bundleIdentifier]
                                                        value:[[NSBundle mainBundle] objectForInfoDictionaryKey: @"CFBundleShortVersionString"]
                                                    withError:&error]) {
        NSLog(@"error in setCustomVariableAtIndex");
    }
    
    if (![[GANTracker sharedTracker] trackPageview:@"/StartView"
                                         withError:&error]) {
        NSLog(@"error in trackPageview");
    }

    
    window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    viewController = [[MainViewController alloc] init];
    [window addSubview:viewController.view];
    window.backgroundColor = [UIColor blackColor];
    [window makeKeyAndVisible];
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
