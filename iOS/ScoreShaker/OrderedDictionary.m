//
//  OrderedDictionary.m
//
//  Created by Matt Gallagher on 19/12/08.
//  Copyright 2008 Matt Gallagher. All rights reserved.
//
//  Permission is given to use this source code file without charge in any
//  project, commercial or otherwise, entirely at your risk, with the condition
//  that any redistribution (in part or whole) of source code must retain
//  this copyright and permission notice. Attribution in compiled projects is
//  appreciated but not required.
//

#import "OrderedDictionary.h"

NSString* DescriptionForObject(NSObject *object, id locale, NSUInteger indent)
{
	NSString *objectString;
	if ([object isKindOfClass:[NSString class]])
		objectString = (NSString *)[[object retain] autorelease];

	else if ([object respondsToSelector:@selector(descriptionWithLocale:indent:)])
		objectString = [(NSDictionary *)object descriptionWithLocale:locale indent:indent];

	else if ([object respondsToSelector:@selector(descriptionWithLocale:)])
		objectString = [(NSSet *)object descriptionWithLocale:locale];

	else
		objectString = [object description];

	return objectString;
}

@implementation OrderedDictionary

+ (id)dictionaryWithKeysAndObjects:(id)firstKey, ... 
{
	OrderedDictionary* dictionary = [OrderedDictionary dictionary];

	va_list args;
    va_start(args, firstKey);
    for (NSObject* key = firstKey; key != nil; key = va_arg(args, NSObject*))
    {
		NSObject* object = va_arg(args, NSObject*);
		if (object==nil)
			break;
		
		[dictionary setKey:key andObject:object];
    }
    va_end(args);

	return dictionary;
}

- (id)init
{
	return [self initWithCapacity:0];
}

- (id)initWithCapacity:(NSUInteger)capacity
{
	if ((self = [super init])==nil)
		return nil;

	dictionary = [[NSMutableDictionary alloc] initWithCapacity:capacity];
	array = [[NSMutableArray alloc] initWithCapacity:capacity];

	return self;
}

- (void)dealloc
{
	[dictionary release];
	[array release];
	[super dealloc];
}

- (id)copy
{
	return [self mutableCopy];
}

- (void)setObject:(id)anObject forKey:(id)aKey
{
	// ignore nil objects and keys
	if (anObject==nil || aKey==nil)
		return;
	
	//if (![dictionary objectForKey:aKey])
	if (!CFDictionaryContainsKey((CFDictionaryRef)dictionary, aKey))
		[array addObject:aKey];

	[dictionary setObject:anObject forKey:aKey];
}

- (void)setKey:(id)aKey andObject:(id)anObject
{
	// ignore nil objects and keys
	if (anObject==nil || aKey==nil)
		return;
	
	//if (![dictionary objectForKey:aKey])
	if (!CFDictionaryContainsKey((CFDictionaryRef)dictionary, aKey))
		[array addObject:aKey];

	[dictionary setObject:anObject forKey:aKey];
}

- (void)removeObjectForKey:(id)aKey
{
	[dictionary removeObjectForKey:aKey];
	[array removeObject:aKey];
}

- (NSUInteger)count
{
	return [dictionary count];
}

- (id)objectForKey:(id)aKey
{
	return [dictionary objectForKey:aKey];
}

- (NSEnumerator *)keyEnumerator
{
	return [array objectEnumerator];
}

- (NSEnumerator *)reverseKeyEnumerator
{
	return [array reverseObjectEnumerator];
}

- (void)insertObject:(id)anObject forKey:(id)aKey atIndex:(NSUInteger)anIndex
{
	//if (![dictionary objectForKey:aKey])
	if (!CFDictionaryContainsKey((CFDictionaryRef)dictionary, aKey))
		[self removeObjectForKey:aKey];

	[array insertObject:aKey atIndex:anIndex];
	[dictionary setObject:anObject forKey:aKey];
}

- (id)keyAtIndex:(NSUInteger)anIndex
{
	return [array objectAtIndex:anIndex];
}

/*
- (NSString *)descriptionWithLocale:(id)locale indent:(NSUInteger)level
{
	NSMutableString *indentString = [NSMutableString string];
	NSUInteger i, count = level;
	for (i = 0; i < count; i++)
		[indentString appendFormat:@"    "];
	
	NSMutableString *description = [NSMutableString string];
	[description appendFormat:@"%@{\n", indentString];
	for (NSObject *key in self)
	{
		[description appendFormat:@"%@    %@ = %@;\n",
			indentString,
			DescriptionForObject(key, locale, level),
			DescriptionForObject([self objectForKey:key], locale, level)];
	}
	[description appendFormat:@"%@}\n", indentString];
	return description;
}
 */

@end
