# Lib

The lib folder will contain all files will be part of the dist version.

## The flow of the calls will be:

1. Get the spects.
1. Registrer the spects of the API in the current object.
1. Create all the methods that are mapping the spects.
1. Crete an initial mapping that will be a basic interface to the main process to the real methods.

The mapping of the current object should be replaceble. In this way will be possible to prevent between an API change and the current behavior of the app.