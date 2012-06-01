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

@interface MainViewController ()

- (void)playSound;

@end

@implementation MainViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)dealloc
{
    [webView release];
    [imageView release];
    [activityIndicator release];
    [super dealloc];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    [webView release]; webView = nil;
    [imageView release]; imageView = nil;
    [activityIndicator release]; activityIndicator = nil;
}

- (void) viewWillDisappear:(BOOL)animated
{
    [webView resignFirstResponder];
    [super viewWillDisappear:animated];
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
    if ([[[request URL] lastPathComponent] isEqualToString:@"playSound"]) {
        [self playSound];
        return NO;
    }
    
    return YES;
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    NSLog(@"%@",error.description);
}

- (void)webViewDidStartLoad:(UIWebView *)webView
{
//    [activityIndicator startAnimating];
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
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

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return UIInterfaceOrientationIsPortrait(interfaceOrientation);
}

@end
