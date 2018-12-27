The [CIVIC Platform](https://civicplatform.org) is the culmination of many years of civic work from [Hack Oregon](http://hackoregon.org). I can't take credit for all of it. It's not my brain child, and it's the collaborative output of hundreds of volunteers, but in 2018 I served as the platform product owner and eventually the organization's CTO.

## Some Background

I was drawn to Hack Oregon for two reasons: the ability to give back with skills instead of money and the attitude and ambition of the Hack Oregon organization. I've always felt kind of weird as a software engineer in the grand scheme f people and work in America. It's no secret that software engineers make good money despite having relatively low education and skill requirements, but why is that? The pointed answer is capitalism, but I think a more accurate answer is luck. I just happened to enjoy writing code and making websites, and that just so happened to translate into a solid career in a growing market.

In addition to this luck, I managed to succeed in spite of the conditions of living in America working against me. The two most significant decisions that put me where I am now is the laptop my grandma bought me for my eighth grade graduation, and my personal dodging of financial aid in college in order to graduate despite not being able to afford it at the time. By all means, neither of these decisions were savvy. My grandma spent too much on that laptop given her income, and I accepted tens of thousands of dollars in debt even though I couldn't get approved for a loan. Regardless, both decisions set me up for success. So why? Not why did they set me up for success, I think that part is obvious. My confusions and curiosity has always been in the question, "why were decisions that were so obvious in their value also so obviously bad decisions fiscally and socially?" If getting a laptop early and going to college were exactly what I should have done, why is it that they were even remotely risky decisions to make?

That's why I'm interested in civics. Hack Oregon is gives me an outlook to work in civics while also giving back to my local (Portland, OR) community.

## The CIVIC Platform

Over the years, the projects at Hack Oregon have had common technology problems. Things like setting up databases, managing data as we receive it, writing ETL code to make turn spreadsheets machine readable, building APIs, and building UIs. The CIVIC Platform aims to aid in solving these common problems, which we have divided into four pillars:

  1. **Data Transfer and Security:** Data if often found in silos within organizations. What common tools can we build to securely extract data from these silos and make sure that this data is kept current?
  2. **Structure and Scale:** Data is generally shapeless when we receive it, meaning there is no way to query it and the only way to work with it is to download entire archives. Can we write tools to transform shapeless data into databases and handle a variety of scales of data?
  3. **Developers and Specialists:** Data will always have nuance to it, and databases are too open-ended. Can we take the gruntwork out of making APIs for these databases to make it easier to access data as well as give a restricted and curated experience to prevent misinterpretations and abuse of the data?
  4. **Access and Equity:** Data alone isn't knowledge, and expecting everyone to make API calls in order to learn from data isn't fair to all. Can we create visualizations and sandboxes for exploring data?

In the 2018 project season, we delivered on all four pillars. There is more work to do, and there always will be due to the nature of platforms, but I'm incredibly proud of what we collectively built with a volunteer workforce.

I also [gave a talk on the CIVIC Platform at CascadiaJS](/talks/open-source-and-the-volunteer-workforce).

## Technology Used

- AWS (EC2, ECS, S3, Lambda)
- Postgres
- Docker
- Python
- Django
- Django REST Framework
- React
- Redux
- Mapbox
- Victory Charts
