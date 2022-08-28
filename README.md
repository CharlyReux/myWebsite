# myWebsite
This repository contains all the code I used for my personnal website available at [https://charlyr.me](https://charlyr.me)
## Hosting
In order to host this website, I challenged myself to make my own server. So I used a old computer that I did not use anymore, I reset it and put an ubuntu 22.04 on it. I then made two VMs  and I set them up as a kubernetes kluster with kubeadm. The website is hosted as a container in the cluster, I used the student github offer to get the domain name and used let's encrypt for the certificate. And finally, I used NGINX to handle the requests.<bt>
Unfortunatly, my old computer was not strong enough to work as a multinode cluster with two VMs so I had to reset it again with a ubuntu Server and a microK8s cluster which I am now using.
