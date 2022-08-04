#get all the names of the repos
#curl -H "Accept: application/vnd.github+json" https://api.github.com/users/CharlyReux/repos
#Get the readme
#curl   -H "Accept: application/vnd.github.html" https://api.github.com/repos/CharlyReux/myWebsite/readme > test.html

import requests
import json
import os
import sys


scriptPath = os.path.dirname(os.path.realpath(__file__))

AllRepos= requests.get("https://api.github.com/users/CharlyReux/repos",headers={"Accept":"application/vnd.github+json","Authorization":sys.argv[0]})

JsonRepos = json.loads(AllRepos.content)

for rep in JsonRepos:
    f = open(scriptPath+"/../dist/assets/Readmes/"+rep["name"]+"_README.html","w")
    
    RHtml = requests.get("https://api.github.com/repos/CharlyReux/"+rep["name"]+"/readme",headers={"Accept": "application/vnd.github.html","Authorization":sys.argv[0]})
    
    f.write(RHtml.content.decode("utf-8"))
    f.close()