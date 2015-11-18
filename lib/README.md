# Lib

The lib folder will contain all files will be part of the dist version.

Some of the taken decissions are the following:

## Functions

0. The compatibility will ne nased for the 5% rule.

## Structure

1. The basic component should be *totally* stand alone
1. The size of the compiled component should be small as possible

## The flow of the calls will be:

2. Get the spects.
2. Registrer the spects of the API in the current object.
2. Create all the methods that are mapping the spects.
2. Crete an initial mapping that will be a basic interface to the main process to the real methods.

The mapping of the current object should be replaceble. In this way will be possible to prevent between an API change and the current behavior of the app.

## Flow:

3. this.getSpec();
	3. 

## Random decisions taken:

4. Should the call method get the basic config params from the 'this' or as a params? Params because in this sense it is a 'util' method that just deals witht the technology over the component is running. Should be possible to abstract easly.