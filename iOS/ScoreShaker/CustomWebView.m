//
//  CustomWebView.m
//  ScoreShaker
//
//  Created by Matthias Nagel on 01.06.12.
//  Copyright (c) 2012 HdM Stuttgart. All rights reserved.
//

#import "CustomWebView.h"
#import "GANTracker.h"


@implementation CustomWebView

- (void)motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event
{
    if ( event.subtype == UIEventSubtypeMotionShake )
    {
        NSError *error;
        if (![[GANTracker sharedTracker] trackEvent:@"Shake"
                                             action:@"call js"
                                              label:@"shake"
                                              value:1
                                          withError:&error]) {
            NSLog(@"error in trackEvent");
        }
        
        NSString *filePath  = [[NSBundle mainBundle] pathForResource:@"www/ScoreShaker_App.js" ofType:nil]; 
        NSString *jsString  = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
        [self stringByEvaluatingJavaScriptFromString:jsString];
        
        [self stringByEvaluatingJavaScriptFromString:@"ScoreShaker.NativeController.shaked()"];
    }
    
    if ( [super respondsToSelector:@selector(motionEnded:withEvent:)] )
        [super motionEnded:motion withEvent:event];
}

- (BOOL)canBecomeFirstResponder
{ 
    return YES;
}

@end
