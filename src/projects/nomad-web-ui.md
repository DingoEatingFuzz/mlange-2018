_I work on Nomad as an employee of HashiCorp._

Nomad is a cluster scheduler by HashiCorp. The purpose of a cluster scheduler is to assist with the workflow of getting all your software working somewhere in your fleet of compute capacity. Cluster schedulers automate the process of finding what server is best fit to run software. This software could be a service, like a web server, or a batch job, like a video render.

## Nomad is for everyone

This is a very technical product generally used by SREs or anyone else whose responsibilities are under the umbrella of devops. Although Nomad can also be used via the commandline, a good graphical user interface can simplify common operations such as debugging issues, keeping tabs on jobs running in the cluster, and keeping tabs on the nodes in the cluster.

A graphical user interface also invites a broader audience of people to interact with Nomad. It doesn't have to strictly be an internal devops tool It could also be used by management, security teams, or a variety of others if the experience is sufficiently accessible to less savvy users.

## My personal motivation

I'm always drawn to the challenge of making technical domains more accessible. I like to think I have decent breadth in software engineering, but I'm still behind the curve when it comes to architecting and operating large scale systems for deploying and managing production services. This describes many engineers and many many people who aren't engineers. However, a lot of the high-level concepts of Nomad are surprisingly straight-forward, since they are found in the real world all the time. Separating the minutiae of technical implementations, such as dynamically allocating a port for Docker to use, from the conceptual machinery, such as a fleet of batch jobs stuck in queue because the cluster is at capacity, creates an opportunity to lower the barrier of entry to using Nomad. The UI is in the right place to seize this opportunity.

Seizing this opportunity takes a combination of technical expertise and user empathy.

I gave a talk on [how I made the Nomad UI realtime at EmberFest](/talks/going-realtime-with-ember).

## Technology used

- Ember JS
- D3
- Go
