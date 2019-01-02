I've been bouldering for about five years now. Over this period of time, I've had good days and I've had bad days. I've had long periods of growth as well as long periods of stagnation. I've taken time off due to injury or various life events, and I've had stints where I'm gone to the gym three or more times a week. Once I was hooked, I couldn't not track my workouts. And since I wanted to track data, I couldn't help but go overboard and make a web app for it. This satisfying all my competing desires to build products, climb fake rocks, and enable my incredibly casual interest in the quantified self.

## Building a product from scratch

Whenever I build a product from scratch, I start with asking why I even feel the urge to build the product. This first helps me prioritize work and second keeps me from adding scope for scope's sake. I'm a firm believer in Kathy Sierra's [Making Users Awesome](http://seriouspony.com/badass-users-the-book/) concept. The gist of which is that users don't want products, or web apps, or material goods. They want to be more awesome. To this extent, no amount of clever engineering or smart design will keep users if you aren't making them feel more awesome.

I knew that in my mind I would be more awesome if I had an unlimited memory when it came to how my climbing sessions went. What to build and how to build it all came after this core hypothesis.

## Being mindful of user experience

The experiment that tested this hypothesis needed to be able to track pertinent climbing metrics, and it needed to be able to report those metrics back to a user at a later date. So I set out to make a single page that allowed a user to punch in the difficulty of a problem they just climbed using the [Hueco, or V-Scale](https://en.wikipedia.org/wiki/Grade_(bouldering)#Hueco_scale). My user experience chops kicked in at this point. I think one of the most important and undervalued aspects of user experience (especially in today's increasingly dynamic use of technology) is designing for context.

In this case, the context is climbing in a gym. Your hands are chalky, your fingers hurt, your fingerprint may be worn to the point where it won't unlock your phone anymore, and yet I'm asking you to interact with this app. Your mind is on the wall: what will you climb next? What did you do wrong? Does your friend need a spotter? Are you in a stranger's way? And yet, I'm asking you to interact with this app. For these reasons, I assumed that a short time to input data would be important. I say "assume" because despite being an active boulderer, a seasoned web developer, and a student of user experience, I didn't actually know for sure until I tested the assumption.

## Testing assumptions

In addition to making users awesome, I am a fan of the [Lean](http://theleanstartup.com/) methodology. Although not prescribed directly in The Lean Startup, the [Riskiest Assumption Test](https://hackernoon.com/the-mvp-is-dead-long-live-the-rat-233d5d16ab02) perfectly describes the importance and science behind what an MVP is meant to do. In the case of Climb Tracker, the riskiest assumption was that people would be willing to pull out their phones to log their climbs as they climbed. This could be tested before I went down the path of making beautiful charts to report back metrics to a user.

I could have done this test in a low-tech manner, but this was my side project, and I'm an engineer. Of course I wanted to make a good project, but I'm also not about to turn down a good excuse to kick the tires on new tech. In 2016, that new tech was React. So I made a prototype of the climb tracking experience in React and shipped it as a progressive web app. I used React and Firebase to quickly take care of authentication and realtime storage.

## Carrying through with product development

The test was mostly successful. I loved the experience, and my friends were pleased with it. One friend ultimately didn't care enough to bother tracking everything (the product would likely never work for him). Another friend liked it, but really didn't want to climb with his phone on him. He immediately asked for a UI that worked on his Android Wear watch. I politely but firmly told him no :)

Now that my riskiest assumption had been tested and passed, I could move on to building the rest of the app. Instead, I did nothing. As side projects so often go, it fell to the wayside. It still stored data forever in Firebase, so I wasn't losing information for future analysis, but I didn't make the time to improve the app.

I have since worked on it more and added a Reports section, which includes monthly digests for every month with reported climbs in it. I want to do more beyond this, but even as is, I'm happy with it as a side project.

## Technology Used

- React
- Gulp
- Less
- Firebase
- PWA
