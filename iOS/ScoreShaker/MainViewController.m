//
//  MainViewController.m
//  iCRMcontainer
//
//  Created by Marco Hanowski on 11.05.12.
//  Copyright (c) 2012 M-Way Solutions GmbH. All rights reserved.
//

#import "MainViewController.h"
#import <AudioToolbox/AudioToolbox.h>
#import "DataManager.h"
#import "AppDelegate.h"
#import "const.h"

@interface MainViewController ()

- (void)playSound;

@end

@implementation MainViewController

- (void)dealloc
{
    [webView release];
    [imageView release];
    [activityIndicator release];
    [game release];
    [facebookButton release];
    [super dealloc];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    [webView release]; webView = nil;
    [imageView release]; imageView = nil;
    [facebookButton release]; facebookButton = nil;
    [activityIndicator release]; activityIndicator = nil;
}

- (void) viewWillDisappear:(BOOL)animated
{
    [webView resignFirstResponder];
    [super viewWillDisappear:animated];
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        AppDelegate *appDelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
        
        if ([appDelegate facebook] == nil) {
            [appDelegate setFacebook:[[[Facebook alloc] initWithAppId:FACEBOOK_ID andDelegate:self]autorelease]];
            NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
            if ([defaults objectForKey:@"FBAccessTokenKey"] && [defaults objectForKey:@"FBExpirationDateKey"]) {
                appDelegate.facebook.accessToken = [defaults objectForKey:@"FBAccessTokenKey"];
                appDelegate.facebook.expirationDate = [defaults objectForKey:@"FBExpirationDateKey"];
            }
        }
    }
    return self;
}

- (void)loadView
{
    [super loadView];
    
    self.view.backgroundColor = [UIColor clearColor];

    if ([[DataManager instance] connected]) {
        webView = [[CustomWebView alloc] initWithFrame:self.view.bounds];
        webView.scrollView.scrollEnabled = NO;
        webView.delegate = self;
        webView.backgroundColor = [UIColor clearColor];
        webView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        [self.view addSubview:webView];
    }
    else {
        UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"Hint" message:@"You need an internet connection" delegate:nil cancelButtonTitle:@"Ok" otherButtonTitles:nil, nil] autorelease];
        [alert show];
    }
    
    activityIndicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
    activityIndicator.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    activityIndicator.frame = self.view.frame;
    activityIndicator.hidesWhenStopped = YES;
    [self.view addSubview:activityIndicator];
    
    facebookButton = [UIButton buttonWithType:UIButtonTypeCustom];
    facebookButton.alpha = 0.0f;
    facebookButton.frame = CGRectMake(10, self.view.frame.size.height-60, 50, 50);
    [facebookButton setBackgroundImage:[UIImage imageNamed:@"facebook.png"] forState:UIControlStateNormal];
    [facebookButton addTarget:self action:@selector(doFacebook) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:facebookButton];
    
    imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"Default.png"]];
    imageView.frame = CGRectMake(0, -20, 320, 480);
    [self.view addSubview:imageView];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [webView becomeFirstResponder];
    [webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[[NSBundle mainBundle] 
                                                                              pathForResource:@"www/index" ofType:@"html"]isDirectory:NO]]];
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    if ([[[request URL] absoluteString] hasPrefix:@"game"]) {
        
        [game release]; game = nil;
        game = [[[request URL] lastPathComponent] retain];
        
        [UIView animateWithDuration:0.5f animations:^{
            facebookButton.alpha = 1.0f;
        } completion:^(BOOL finished){
        }];
        
        [self playSound];
        
        return NO;
    }
    
    if ([[[request URL] absoluteString] isEqualToString:@"http://the-m-project.org/"]) {
        
        UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:NSLocalizedString(@"Hint", nil) message:NSLocalizedString(@"Change_to_Safari", nil) delegate:self cancelButtonTitle:NSLocalizedString(@"No", nil) otherButtonTitles:NSLocalizedString(@"Yes", nil), nil] autorelease];
        [alert show];
        return NO;
    }

    return YES;
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (buttonIndex == 1) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://the-m-project.org/"]];
    }
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    NSLog(@"%@",error.description);
}

- (void)webViewDidStartLoad:(UIWebView *)webView
{
}

- (void)webViewDidFinishLoad:(UIWebView *)_webView
{
    NSString *filePath  = [[NSBundle mainBundle] pathForResource:@"www/ScoreShaker_App.js" ofType:nil]; 
    NSString *jsString  = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    [webView stringByEvaluatingJavaScriptFromString:jsString];
    
    [webView stringByEvaluatingJavaScriptFromString:@"ScoreShaker.NativeController.isInNativeContainer()"];
    
    [UIView animateWithDuration:0.5f animations:^{
        imageView.alpha = 0.0;
    } completion:^(BOOL finished){
    }];
}

- (void)playSound
{
    AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
    CFBundleRef mainBundle = CFBundleGetMainBundle();
    
    CFURLRef soundFileURLRef = CFBundleCopyResourceURL(mainBundle, 
                                                       (CFStringRef) @"yeah", CFSTR ("caf"), NULL);
    
    UInt32 soundID;
    AudioServicesCreateSystemSoundID(soundFileURLRef, &soundID);
    AudioServicesPlaySystemSound(soundID);
}

#pragma mark - Facebook

- (void)showLoggedIn 
{
    [self apiDialogFeedUser];
}

- (void)showLoggedOut 
{
}

- (void)doFacebook
{
    AppDelegate *appDelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    if (![[appDelegate facebook] isSessionValid]) {
        [[appDelegate facebook] authorize:[appDelegate facebookPermissions]];
    } else {
        [self showLoggedIn];
    }
}

- (void)storeAuthData:(NSString *)accessToken expiresAt:(NSDate *)expiresAt {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:accessToken forKey:@"FBAccessTokenKey"];
    [defaults setObject:expiresAt forKey:@"FBExpirationDateKey"];
    [defaults synchronize];
}

#pragma mark - FBSessionDelegate Methods

- (void)fbDidLogin {
    [self showLoggedIn];
    
    AppDelegate *appDelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    [self storeAuthData:[[appDelegate facebook] accessToken] expiresAt:[[appDelegate facebook] expirationDate]];
}

-(void)fbDidExtendToken:(NSString *)accessToken expiresAt:(NSDate *)expiresAt {
    NSLog(@"token extended");
    [self storeAuthData:accessToken expiresAt:expiresAt];
}

-(void)fbDidNotLogin:(BOOL)cancelled 
{
}

- (void)fbDidLogout 
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults removeObjectForKey:@"FBAccessTokenKey"];
    [defaults removeObjectForKey:@"FBExpirationDateKey"];
    [defaults synchronize];
    
    [self showLoggedOut];
}

- (void)fbSessionInvalidated {
    UIAlertView *alertView = [[UIAlertView alloc]
                              initWithTitle:@"Auth Exception"
                              message:@"Your session has expired."
                              delegate:nil
                              cancelButtonTitle:@"OK"
                              otherButtonTitles:nil,
                              nil];
    [alertView show];
    [alertView release];
    [self fbDidLogout];
}

#pragma mark - FBRequestDelegate Methods

- (void)request:(FBRequest *)request didReceiveResponse:(NSURLResponse *)response {
    NSLog(@"received response");
}

- (void)request:(FBRequest *)request didLoad:(id)result {
    NSLog(@"received response");
}

- (void)request:(FBRequest *)request didFailWithError:(NSError *)error {
    NSLog(@"Err message: %@", [[error userInfo] objectForKey:@"error_msg"]);
    NSLog(@"Err code: %d", [error code]);
}

- (void)apiDialogFeedUser {
    SBJSON *jsonWriter = [[SBJSON new] autorelease];
    
    // The action links to be shown with the post in the feed
    NSArray* actionLinks = [NSArray arrayWithObjects:[NSDictionary dictionaryWithObjectsAndKeys:
                                                      @"Get Started",@"name",@"http://m.facebook.com/apps/tellerwaescher/",@"link", nil], nil];
    NSString *actionLinksStr = [jsonWriter stringWithObject:actionLinks];
    // Dialog parameters
    
//    NSMutableDictionary *params = [NSMutableDictionary dictionaryWithObjectsAndKeys:
//                                   game, @"name",
//                                   @"Score Shaker for iOS", @"caption",
//                                   [DataManager instance].currentRecipe.description, @"description",
//                                   FACEBOOK_DEFAULT_ICON, @"picture",
//                                   actionLinksStr, @"actions",
//                                   nil];
//    
//    AppDelegate *appDelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
//    [[appDelegate facebook] dialog:@"feed"
//                         andParams:params
//                       andDelegate:self];
    
}

//- (void)apiDialogFeedUser {
//    SBJSON *jsonWriter = [[SBJSON new] autorelease];
//    
//    // The action links to be shown with the post in the feed
//    NSArray* actionLinks = [NSArray arrayWithObjects:[NSDictionary dictionaryWithObjectsAndKeys:
//                                                      @"Get Started",@"name",@"http://m.facebook.com/apps/hackbookios/",@"link", nil], nil];
//    NSString *actionLinksStr = [jsonWriter stringWithObject:actionLinks];
//    // Dialog parameters
//    NSMutableDictionary *params = [NSMutableDictionary dictionaryWithObjectsAndKeys:
//                                   @"I'm using the Hackbook for iOS app", @"name",
//                                   @"Hackbook for iOS.", @"caption",
//                                   @"Check out Hackbook for iOS to learn how you can make your iOS apps social using Facebook Platform.", @"description",
//                                   @"http://m.facebook.com/apps/hackbookios/", @"link",
//                                   @"http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png", @"picture",
//                                   actionLinksStr, @"actions",
//                                   nil];
//    
//    AppDelegate *appDelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
//    [[appDelegate facebook] dialog:@"feed"
//                      andParams:params
//                    andDelegate:self];
//    
//}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return UIInterfaceOrientationIsPortrait(interfaceOrientation);
}

@end
