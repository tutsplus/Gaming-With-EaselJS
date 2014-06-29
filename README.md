# README #

### Install ###
Install node, npm, bower, and grunt.

run bower install, npm install, and grunt

navigate to localhost:9001







     $(document).ready(function() {
         var map = new Array();
         map[0] = new Array(1,1,1,1);
         map[1] = new Array(1,0,0,1,1,1,1,1);
         map[2] = new Array(1,0,2,0,0,3,0,1);
         map[3] = new Array(1,0,3,0,0,2,4,1);
         map[4] = new Array(1,1,1,0,0,1,1,1);
         map[5] = new Array(0,0,1,1,1,1);
         for(i=0;i<map.length;i++){
             for(j=0;j<map[i].length;j++){
                 switch(map[i][j]){
                     case 1:
                         $("#sokoban").append('<div class = "wall" style = "top:'+i*32+'px;left:'+j*32+'px"></div>');
                         break;
                     case 2:
                         $("#sokoban").append('<div class = "goal" style = "top:'+i*32+'px;left:'+j*32+'px"></div>');
                         break;
                     case 3:
                         $("#sokoban").append('<div id = "c'+i+'_'+j+'" class = "crate" style = "z-index:1000;top:'+i*32+'px;left:'+j*32+'px"></div>');
                         break;
                     case 4:
                         map[i][j]=0;
                         var player_pos = new Array(i,j);
                         $("#sokoban").append('<div id ="player" style = "z-index:1000;top:'+i*32+'px;left:'+j*32+'px"></div>');
                         break;
                     case 5:
                         $("#sokoban").append('<div class = "goal" style = "top:'+i*32+'px;left:'+j*32+'px"></div>');
                         $("#sokoban").append('<div id = "c'+i+'_'+j+'" class = "crate" style = "z-index:1000;top:'+i*32+'px;left:'+j*32+'px"></div>');
                         break;
                     case 6:
                         map[i][j]=2;
                         var player_pos = new Array(i,j);
                         $("#sokoban").append('<div class = "goal" style = "top:'+i*32+'px;left:'+j*32+'px"></div>');
                         $("#sokoban").append('<div id ="player" style = "z-index:1000;top:'+i*32+'px;left:'+j*32+'px"></div>');
                         break;
                 }
             }
         }
         function possible_move(x,y){
             var tile = map[player_pos[0]+y][player_pos[1]+x]
             var far_tile = map[player_pos[0]+2*y][player_pos[1]+2*x]
             var can_move = false;
             var solved = true;
             if(tile==0 || tile==2){
                    can_move = true;
                    solved = false;
               }
               else{
                    if((tile==3 || tile==5) && (far_tile==0 || far_tile==2)){
                         map[player_pos[0]+y][player_pos[1]+x]-=3;
                         map[player_pos[0]+2*y][player_pos[1]+2*x]+=3;
                         $("#c"+(player_pos[0]+y)+"_"+(player_pos[1]+x)).animate({
                              left: "+="+(x*32),
                              top: "+="+(y*32)
                         },100,function(){
                              for(i=0;i<map.length;i++){
                                   for(j=0;j<map[i].length;j++){
                                        if(map[i][j]==2){
                                             solved = false;
                                             break;
                                        }
                                   }
                              }
                              if(solved){
                                   alert("SOLVED")
                              }
                         }).attr("id","c"+(player_pos[0]+2*y)+"_"+(player_pos[1]+2*x))
                         can_move = true;
                    }
               }    
               if(can_move){
                    player_pos[0]+=y;
                    player_pos[1]+=x;
                 $("#player").animate({
                     left: "+="+(x*32),
                         top: "+="+(y*32)
                 },100);  
               }
         }
         $(document).keydown(function(event) {
             switch(event.keyCode){
                 case 65:
                     possible_move(-1,0)
                     break;
                 case 87:
                     possible_move(0,-1)
                     break;
                 case 68:
                     possible_move(1,0)
                     break;
                 case 83:
                     possible_move(0,1)
                     break;
             }
            });
     });
     


     
Line 7: loading jQuery

Line 9: function to be executed when the document is ready

Lines 10-16: map initialization. Unfortunately javascript does not support multi-dimensional array creation on the fly…

Lines 17-46: drawing the map. As you can see, all map elements are divs of different classes placed according to their position in the map. Movig objects, such as the player and the crates, are stylized with an high z-index to always stay on top of the map. Various objects are mapped this way:

0: empty tile
1: wall
2: place where to drop a crate
3: crate – crate divs are created with an unique id to indentify them when it’s time to be pushed by the player
4: player
5: crate on a place where to drop a crate (3+2)
6: player on a place where to drop a crate (4+2)

Lines 47-87: Core function… checks for a possible move, eventually moves player and crates and sees if the game is solved.

A game is solved where there are not places where to drop a crate without a crate on them. That is, there isn’t any 2 in the map.

Every time I move a crate, I change its id according to its new position.

Lines 88-103: Checking for key presses.

Hope you enjoy it.

Rate this post: 1 Star2 Stars3 Stars4 Stars5 Stars (12 votes, average: 4.50 out of 5)

Learn how to make a successful commercial Flash game from a real world example: get the fully commented source code of Globez, a Flash game played millions of times which generated a four figure income. Limited copies available.

Get it now
Be my fan on Facebook and follow me on Twitter! Exclusive content for my Facebook fans and Twitter followers
This post has 14 comments


Jason L.
on June 14, 2010 at 8:47 pm
Pretty cool! And just a heads up, Google Chrome threw a “malicious site” warning. I wasn’t able to get the source that threw it, but watch out.


Emanuele Feronato
on June 14, 2010 at 10:43 pm
Thank you! Removed!!!


majenn
on March 5, 2011 at 8:25 am
r u really the creator of sokoban game?
im playing STAND ALONE VERSION just now i discover this game and it is really cool.

Creation Of A Skoban Game With jQuery | jQuery Wisdom
on March 31, 2011 at 6:34 pm
[...] Web Site Demo Download Share and Enjoy: [...]


art gabriel
on May 21, 2011 at 2:34 am
:) very nice…

10 Cool jQuery Developed Games | Code to Preload
on October 11, 2011 at 5:59 am
[...] A Skoban gam completely made using jQuery. This is based on my previous Skoban game which was made using Flash. Source [...]


Alex
on May 4, 2012 at 2:45 pm
R button should be for restart:)


Vincent
on April 10, 2013 at 5:20 am
I’m wondering if I can use your jquery code for myself. I have already used it and tweaked it up a bit containing a total of 10 levels of my own. I would like to have your permission to use your code before I go any farther.


Emanuele Feronato
on April 10, 2013 at 3:11 pm
sure, use it as you want


noone
on June 29, 2013 at 12:49 pm
This code don’t work!

Create HTML5 tile based games like Sokoban in a quick with PuzzleScript - Emanuele Feronato
on November 22, 2013 at 11:45 pm
[...] a fan of Sokoban game, if you are an old time reader of the blog you should remember at least the creation of a Sokoban game with jQuery, the complete Flash Sokoban game in less than 2KB, the Flash 3D Sokoban prototype with Flare3D and [...]


CodeTrain
on April 9, 2014 at 5:24 am
I was looking at the code and messing around and I want to know how to make multiple crates be able to be move by the player?

Learn jQuery with jQuery 2.0 Development Cookbook, and start making games with it - Emanuele Feronato
on April 10, 2014 at 11:09 pm
[…] the sole use of jQuery I was able to made complete prototypes of games like Sokoban, Bejeweled and […]

10 Cool jQuery Developed Games | jQuery4U | No.1 Resource for jQuery Developers
on April 23, 2014 at 5:51 am
[…] A Skoban gam completely made using jQuery. This is based on my previous Skoban game which was made using Flash. Source […]

 Name (required)

 Mail (will not be published) (required)

 Website




< Create a Flash game like Talesworth – Step 4: One-way doors Create a Flash Racing Game Tutorial – AS3 version >






© 2006 - 2014 by Emanuele Feronato