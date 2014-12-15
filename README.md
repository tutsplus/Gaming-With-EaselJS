### Tuts+ Course: Gaming With EaselJS
**Instructor: Jason Green**

In this course we'll be jumping right into the action and building out the basic functionality of two real game projects. Using the canvas framework, EaselJS, we'll make a simple tile based puzzle game and a scrolling space shooter. You should already have a fundemental understanding of the Canvas APIs, or you can checkout [Canvas Essentials](http://code.tutsplus.com/courses/canvas-essentials), a starter course which will get you up to speed with what's going on under the hood.

Source files for the Tuts+ course: [Gaming With EaselJS](https://courses.tutsplus.com/courses/)

**Available on Tuts+ November 2014**

### Install ###
Install node and npm.

Then;
```
npm install -g bower
npm install -g grunt
```
Then from the specific lesson folder you want to run
```
bower install
npm install
```

### Run ###
Also from the lesson folder
```
grunt
```

navigate to localhost:9001 in a modern browser

### Temporary fix for Easel version issue ###
I should have locked down the version of easel in the package.json file. At the moment the version is `"*"` but it should have been a specific number. For now, you can fix the problem by pointing `grunt copy` to the right version number.

Goto `Gruntfile.js` and change `line 16` to `'bower_components/easeljs/lib/easeljs-0.8.0.combined.js'` (or which ever version is being loaded into `bower_components`.

Then goto `app/index.html` and change `line 11` to `<script src="scripts/easeljs-0.8.0.combined.js"></script>`

I will try to fix the issue soon.
