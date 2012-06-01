//
//  DataManager.m
//  iCRMcontainer
//
//  Created by Marco Hanowski on 11.05.12.
//  Copyright (c) 2012 M-Way Solutions GmbH. All rights reserved.
//

#import "DataManager.h"
#import "Reachability.h"

@implementation DataManager

- (id)init
{
    if ((self = [super init])==nil)
    	return nil;
    
	return self;
}

+ (DataManager*)instance
{
    static DataManager* instance = nil;
    if (instance==nil)
    instance = [[DataManager alloc] init];
    return instance;
}

- (BOOL)connected
{
    //return NO; // force for offline testing
    Reachability *hostReach = [Reachability reachabilityForInternetConnection];
    NetworkStatus netStatus = [hostReach currentReachabilityStatus];
    return !(netStatus == NotReachable);
}

@end
