#get all the names of the repos
#curl -H "Accept: application/vnd.github+json" https://api.github.com/users/CharlyReux/repos
#Get the readme
#curl   -H "Accept: application/vnd.github.html" https://api.github.com/repos/CharlyReux/myWebsite/readme > test.html

import requests
import json
import sys
import base64

AllRepos= requests.get("https://api.github.com/users/CharlyReux/repos",headers={"Accept":"application/vnd.github+json","Authorization":"token " +sys.argv[0]})

JsonRepos = json.loads(AllRepos.content)

for rep in JsonRepos:
    
    RHtml = requests.get("https://api.github.com/repos/CharlyReux/"+rep["name"]+"/readme",headers={"Accept": "application/vnd.github.html","Authorization":"token " +sys.argv[0]})
    

    puReq = requests.put("https://api.github.com/repos/CharlyReux/myWebsite/contents/Readmes/"+rep["name"]+"_readme.html",data={"message":"getting Readme","committer":{"name":"CharlyReux","email":"charlyreux@gmail.com"},"content":base64.b64encode(RHtml.content)},headers={"Accept": "application/vnd.github.html","Authorization":"token " +sys.argv[0]})
    print(puReq.content)