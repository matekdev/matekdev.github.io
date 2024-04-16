---
title: 'Building Open-Source Software: NVIDIA Software Intern Experience'
description: 'My time as a Software Intern at NVIDIA'
date: '2022-01-27'
---

I wrote this [article](https://olc.sfu.ca/olc/blog/building-open-source-software-nvidia-software-intern-experience) for my university so I thought I might as well post it here.

To give a quick spiel, my name is Matthew Zegar and I’m a third-year Software Systems student at Simon Fraser University. My previous internship experiences included working on a Marvel mobile game at Kabam and a mobile app in Flutter at HomeX. In my free time I spend quite a lot of time contributing to open-source which can all be checked out at my [GitHub profile](https://github.com/matekdev).

Towards the end of 2020 I was searching for the last place I wanted to do my final internship. It somehow ended up being at NVIDIA...

<Heading title="Interview Process" />

NVIDIA has all their internship roles posted on their [Workday website](https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite). There are plenty of internships available across multiple countries and a wide variety of teams to apply for. As the SFU co-op coordinators always suggest, the secret is to just apply, apply, and apply.

<Heading title="PerfLab Intern (Toronto, Ontario, Remote)" />

Applying through Workday I managed to get a role as a PerfLab Intern which tasked me with testing the performance of NVIDIA GPUs (Graphics Processing Units). I was able to automate and improve the internal benchmarking software which assisted with testing NVIDIA GPU performance. There is quite a lot more to mention, however, I’m unfortunately unable to elaborate to avoid leaking any sensitive information.

I was encouraged by my manager to investigate and apply to the various other intern roles NVIDIA had to offer, so I did!

<Heading title="Data Visualization (Santa Clara, California, Remote)" />

I ended up finding a Data Visualization role which worked on the open-source NVIDIA project [RAPIDS](https://developer.nvidia.com/rapids). You can think of RAPIDS as a publicly available data science library that is GPU accelerated. It exposes data science libraries to a friendly Python interface which allows data scientists to pick it up with ease.

[node-RAPIDS](https://github.com/rapidsai/node) is essentially an extension of RAPIDS, however, instead you can interact with the data science libraries with Node.js bindings instead of Python. node-RAPIDS is the primary project I worked on during the summer and fall term of 2021.

<Heading title="SQL Module" />

One of the larger projects I owned was developing a separate [SQL (Structured Query Language) module](https://github.com/rapidsai/node/tree/main/modules/sql) we’ve included inside of [node-RAPIDS](https://github.com/rapidsai/node). We were able to hook up Node.js bindings to the open-source GPU accelerated SQL library [BlazingSQL](https://github.com/BlazingDB/blazingsql). You can think of BlazingSQL as essentially just SQL queries sped up massively by utilizing NVIDIA GPUs. This resulted in the ability to call into our SQL module from Node.js and process queries on multiple NVIDIA GPUs.

To showcase the full potential of this tech a simple demo was built. I downloaded the entirety of English Wikipedia and loaded it up into our SQL module. We were now able to search through English Wikipedia blazing fast. To give an example of usage, we could scan every English Wikipedia page for the word "Shakespeare" and see how many pages mention the playwright (in only ~40 seconds using only two NVIDIA GPUs!).

<Youtube id="rH7Wxn5Yr_A" />

<Heading title="Conclusion" />

If anyone ever has the opportunity to work at NVIDIA, I’d say take it. NVIDIA is one of the top tech companies in the world working on some bleeding edge technology across multiple different subject areas. It was amazing being able to collaborate with talented people on a daily basis to build out some really interesting projects. My time at NVIDIA on both teams are still some of my most memorable university experiences I had.
