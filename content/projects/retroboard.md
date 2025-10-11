---
title: Retroboard
description: Open source retro-style LED matrix display for general use, inspired by the Tidbyt
img: assets/img/retroboard/IMG_0982_crop.jpg
order: 3
category: personal
tags:
- open-source
- led-matrix
- raspberry-pi
---

## About

The Retroboard project is LED matrix software and a web application designed to control RGB LED matrices using a Raspberry Pi. The project is inspired by the Tidbyt Kickstarter.

The setup is intended for a Raspberry Pi, specifically a 3B+ model, and requires the use of an Adafruit RGB Matrix HAT, a 5V power supply, and a 64x32 RGB LED Matrix, P3. The project leverages the rpi-rgb-led-matrix library by hzeller. The system consists of two applications that have been dockerized for ease of testing and deployment. Both the app and API directories have their own Dockerfile, allowing them to be built and run separately if needed. The web application is built on React. The API is built simply from Flask, providing a Python basis for the API which allows for easy integration into the LED driver library.

As of the time of writing, the project is in its early stages with minimal functionality. The ultimate goal is to create a fully configurable and customizable LED matrix application that can be used in a variety of cases and allows any user to develop their own application.

::blog-image
---
imagePath: /img/retroboard/IMG_0982_crop.jpg
caption: Retroboard snapshot. Currently the Retroboard has a couple baked in applications such as a stock chart and standard clock.
width: 640px
---
::

::blog-image
---
imagePath: /img/retroboard/IMG_0977.JPG
caption: Retroboard internals. The board is powered with a raspberry pi which hosts both the local LED matrix drivers as well as the web application.
width: 640px
---
::

::blog-image
---
imagePath: /img/retroboard/sim.jpg
caption: There also exists an online simulator for testing applications and display. This is useful for quick development away from the Retroboard.
width: 640px
---
::

## Future Work

I would like to develop an application store which allows anyone to create and deploy custom applications for the Retroboard. More work needs to be done with asynchronous task handling between the app and drivers. Lastly, a bluetooth application for setup and control would prove useful and potentially eliminate the need for a local network connection for some applications.

::github-repo-card
---
repo: lancewilhelm/retroboard
---
