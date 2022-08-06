#get all the names of the repos
#curl -H "Accept: application/vnd.github+json" https://api.github.com/users/CharlyReux/repos
#Get the readme
#curl   -H "Accept: application/vnd.github.html" https://api.github.com/repos/CharlyReux/myWebsite/readme > test.html

import requests
import json
import sys
import base64

token = sys.argv[1]


AllRepos= requests.get("https://api.github.com/users/CharlyReux/repos",headers={"Accept":"application/vnd.github+json","Authorization":"token "+token})

JsonRepos = json.loads(AllRepos.content)

for rep in JsonRepos:
    
    RHtml = requests.get("https://api.github.com/repos/CharlyReux/"+rep["name"]+"/readme",headers={"Accept": "application/vnd.github.html","Authorization":"token "+token})
    if(RHtml.status_code ==404):
        continue

    #Getting the sha of the readmes
    ShaReq = requests.get("https://api.github.com/repos/CharlyReux/myWebsite/contents/Readmes/"+rep["name"]+"_README.html",headers={"Accept": "application/vnd.github+json","Authorization":"token "+token})
    if(ShaReq.status_code!=404):
        ShaReqJson = json.loads(ShaReq.content)
        ShaValue = ShaReqJson["sha"]
    else:
        ShaValue =""
    


    #Modifying or creating the readmes in the repository
    ta={"message":"getting Readme","committer":{"name":"CharlyReux","email":"charlyreux@gmail.com"},"content":base64.b64encode(RHtml.content).decode("utf8"),"sha":ShaValue}
    tastr = json.dumps(ta)

    puReq = requests.put("https://api.github.com/repos/CharlyReux/myWebsite/contents/Readmes/"+rep["name"]+"_README.html",data=tastr,headers={"Accept": "application/vnd.github+json","Authorization":"token "+token})
    print(puReq.content)