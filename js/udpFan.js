var responseJSON = null;

function start() {
    for (let i = 19518; i < 19527; i++) {
        let articleData = {
            title: "null",
            content: "null",
            author: "null",
            imageLink: "http://wt.kpi.fei.tuke.sk/uploads/eJPTZdHH74MqkNK9_v12044gd0000ce5nupbc77u00oh0qkt0.gif",
            tags: "null"
        }

        //for (let i = 19507; i < 19556; i++) {

        const url = `https://wt.kpi.fei.tuke.sk/api/article/${i}`;

        function reqListenerComments() {
            console.log("new");
            console.log(this.responseText)
            if (this.status === 200) {
                responseJSON = JSON.parse(this.responseText)
            } else {
                console.log("no article: " + i);
            }
            articleData.tags = responseJSON.tags;
            articleData.title = responseJSON.title;
            articleData.content = responseJSON.content;
            articleData.author = responseJSON.author;

            let postReqSettings = //an object wih settings of the request
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(articleData)
                }
            fetch(`https://wt.kpi.fei.tuke.sk/api/article/${i}`, postReqSettings)
        }

        var ajax = new XMLHttpRequest();
        ajax.addEventListener("load", reqListenerComments);
        ajax.open("GET", url, false);
        ajax.send();
    }
}


let opinion = {
    meno: null,
    nazor: null,
    url: null,
    email: null,
    okres: null,
    byvanie: null,
}

function jsread() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
            let myResponse = JSON.parse(req.responseText)
            console.log(req.responseText);
            console.log(myResponse);

            opinion.meno = myResponse.meno;
            opinion.nazor = myResponse.nazor;
            opinion.url = myResponse.url;
            opinion.email = myResponse.email;
            opinion.okres = myResponse.okres;
            opinion.byvanie = myResponse.byvanie;

            console.log(opinion.meno);
        }
    };

    req.open("GET", "https://api.jsonbin.io/v3/b/639b2e2fdfc68e59d5690c43?$.moduleAccess.*", true);
    req.setRequestHeader("X-Master-Key", "$2b$10$CtrPg47kZ8WUa5Hu0Gr1weqPBbRky2xxHFVx3/J8Z2IxsfxU6CqIG");
    req.send();
}

function jsudp() {

    let add = {
        "record": {
            "articles": [{
                "id": 17166,
                "author": "AngryGreta78",
                "dateCreated": "2021-05-09T22:11:52Z",
                "imageLink": "https://assets.teenvogue.com/photos/5d3875dcc6732300082916c8/16:9/w_2560%2Cc_limit/00-story.jpg",
                "lastUpdated": "2022-11-20T11:33:34Z",
                "title": "Climate Activists",
                "tags": ["ConEvent"]
            }, {
                "id": 14,
                "author": "terez.biak",
                "dateCreated": "2021-05-10T06:59:46Z",
                "imageLink": "https://cdn.pixabay.com/photo/2017/01/31/15/33/linux-2025130_960_720.png",
                "lastUpdated": "2022-11-20T11:15:25Z",
                "title": "NEMAZAŤ",
                "tags": ["tux"]
            }]
        }
    }
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
            console.log(this.responseText)
        }
    };

    req.open("PUT", "https://api.jsonbin.io/v3/b/639b2141dfc68e59d56901d2", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2b$10$CtrPg47kZ8WUa5Hu0Gr1weqPBbRky2xxHFVx3/J8Z2IxsfxU6CqIG");
    req.send(add);

}

function add() {
    let opinions = [];
    console.log(opinions);
    var newKey = 'key_2';
// Создание объекта
    var obj = new Object()
// Ключ
    obj[newKey] = ['d', 'e', 'f']

    opinions.push(obj);
    console.log(opinions);
}

function ioread() {
    let opinions = [];
    let opinions2 = [];
    let articleData = {
        name: "fghdfghfghjfghfghfghfgh",
        comment: "cool site",
        url: "https://assets.teenvogue.com/photos/5d3875dcc6732300082916c8/16:9/w_2560%2Cc_limit/00-story.jpg",
        email: "articles@gmail.com",
        okres: "Okresy Bratislavy",
        byvanie: "V byte, V dome"
    }
    let newID = {}

    function reqListenerComments() {
        //let idGoogleUser = 'idTEST';
        let op2 = [];
        //let idGoogleUser = 'id1199999999999999';
        let idGoogleUser = 'id101241995083733801348';
        if (this.status === 200) {
            let responseJSON = JSON.parse(this.responseText)
            opinions = JSON.parse(this.responseText)
            //
            console.log(opinions);
            let keysName = Object.keys(opinions);
            keysName.push(idGoogleUser)
            let newPOST = [];
            newPOST.push(keysName[0]);

            // console.log(newPOST);
            // console.log(keysName);
            // console.log(keysName.length);
            // console.log(opinions[keysName[2]].length);


            //delete

            delete opinions[idGoogleUser][0];
            console.log(opinions);
            //-------


            for (let i = 0; i < 1; i++) {
                console.log(i + " : " + opinions[keysName[i]].length);
                for (let j = 0; j < opinions[keysName[i]].length; j++) {
                    op2[keysName[i]].push(opinions[keysName[i]][j]);
                }
            }
            console.log(newPOST);
            //console.log("k: " + opinions[idGoogleUser]);
            // if (opinions[idGoogleUser] === undefined){
            //     //opinions.push(articleData);
            //     opinions2.push({idGoogleUser : articleData});
            //     opinions2.push({idGoogleUser : articleData});
            //     console.log(opinions2);
            // }
            //     opinions[idGoogleUser].push(articleData);
            //     console.log(opinions);
            //     //console.log(this.responseText);
            //
            //     let postReqSettings = //an object wih settings of the request
            //         {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json;charset=utf-8',
            //             },
            //             body: JSON.stringify(opinions)
            //         }
            //     fetch(`https://api.npoint.io/7277534d6c85d7e10b53`, postReqSettings)
            //         .then(response => {      //fetch promise fullfilled (operation completed successfully)
            //             if (response.ok) {    //successful execution includes an error response from the server. So we have to check the return status of the response here.
            //                 return response.json(); //we return a new promise with the response data in JSON to be processed
            //             } else { //if we get server error
            //                 return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
            //             }
            //         })
            //         .finally(() =>
            //             alert("ok")
            //         )
        }
    }

    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListenerComments);
    ajax.open("GET", `https://api.npoint.io/7277534d6c85d7e10b53`, false);
    ajax.send();
}

function Deleteopi() {
    let opinions = [];

    function reqListenerComments() {
        if (this.status === 200) {
            opinions = JSON.parse(this.responseText)
            console.log(opinions);

            let keysName = Object.keys(opinions);
            console.log(keysName);
            // console.log(keysName.length);
            // console.log(opinions[keysName[2]].length);


            //delete
            //delete opinions[keysName[1]][0];
            opinions[keysName[1]].splice(0, 1);
            console.log(opinions);

            let postReqSettings = //an object wih settings of the request
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(opinions)
                }
            fetch(`https://api.npoint.io/7277534d6c85d7e10b53`, postReqSettings)
                .then(response => {      //fetch promise fullfilled (operation completed successfully)
                    if (response.ok) {    //successful execution includes an error response from the server. So we have to check the return status of the response here.
                        return response.json(); //we return a new promise with the response data in JSON to be processed
                    } else { //if we get server error
                        return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
                    }
                })
                .finally(() =>
                    alert("ok")
                )
        }
    }

    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListenerComments);
    ajax.open("GET", `https://api.npoint.io/7277534d6c85d7e10b53`, false);
    ajax.send();
}

function ioPOST() {
    let articleData = {
        name: "fghdfghfghjfghfghfghfgh",
        comment: "cool site",
        url: "https://assets.teenvogue.com/photos/5d3875dcc6732300082916c8/16:9/w_2560%2Cc_limit/00-story.jpg",
        email: "articles@gmail.com",
        okres: "Okresy Bratislavy",
        byvanie: "V byte, V dome"
    }
    let idGoodleUser = 1234567;

    function reqListenerComments() {
        if (this.status === 200) {
            let responseJSON = JSON.parse(this.responseText)
            console.log(responseJSON);
            console.log(this.responseText);
            let postReqSettings = //an object wih settings of the request
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(articleData)
                }
            fetch(`https://api.npoint.io/7277534d6c85d7e10b53/117074500003811940767`, postReqSettings)
                .then(response => {      //fetch promise fullfilled (operation completed successfully)
                    if (response.ok) {    //successful execution includes an error response from the server. So we have to check the return status of the response here.
                        return response.json(); //we return a new promise with the response data in JSON to be processed
                    } else { //if we get server error
                        return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
                    }
                })
                .finally(() =>
                    alert("ok")
                )
        }
    }

    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListenerComments);
    ajax.open("GET", `https://api.npoint.io/7277534d6c85d7e10b53`, false);
    ajax.send();


}

function delOpi() {
    function reqListenerComments() {
        if (this.status === 200) {
            let responseJSON = JSON.parse(this.responseText)
            console.log(responseJSON);
            console.log(this.responseText);
            fetch(`https://api.npoint.io/7277534d6c85d7e10b53/id101241995083733801348`, {
                method: 'DELETE',
                mode: 'cors'
            })
                .then(response => {      //fetch promise fullfilled (operation completed successfully)
                    if (response.ok) {    //successful execution includes an error response from the server. So we have to check the return status of the response here.
                        return response.json(); //we return a new promise with the response data in JSON to be processed
                    } else { //if we get server error
                        return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
                    }
                })
                .finally(() =>
                    alert("ok")
                )
                .catch(err => {
                    console.error(err)
                });
        }
    }

    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListenerComments);
    ajax.open("GET", `https://api.npoint.io/7277534d6c85d7e10b53`, false);
    ajax.send();
}


function ioPOST2() {
    var req = new XMLHttpRequest();
    req.open("PUT", "https://api.npoint.io/9ab18429bfd7de6a2de3/next_steps/0", true);
    req.send("sdfsdf");
}