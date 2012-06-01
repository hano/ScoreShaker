//
//  DataManager.h
//  iCRMcontainer
//
//  Created by Marco Hanowski on 11.05.12.
//  Copyright (c) 2012 M-Way Solutions GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DataManager : NSObject

+ (DataManager*)instance;
- (BOOL)connected;

@end
