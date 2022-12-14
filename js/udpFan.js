var responseJSON = null;

function start(){
    let articleData = {
        title: "null",
        content: "null",
        author: "null",
        imageLink: "http://wt.kpi.fei.tuke.sk/uploads/eJPTZdHH74MqkNK9_v12044gd0000ce5nupbc77u00oh0qkt0.gif",
        tags: "null"
    }
    let postReqSettings = //an object wih settings of the request
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(articleData)
        }
    for (let i = 19507; i < 19556; i++) {
    const url = `https://wt.kpi.fei.tuke.sk/api/article/${i}`;
    function reqListenerComments() {
        console.log("new");
        console.log(this.responseText)
        if (this.status === 200) {
            responseJSON = JSON.parse(this.responseText)
        } else {
            console.log("no article: "+i);
        }
        articleData.tags = responseJSON.tags;
        articleData.title = responseJSON.title;
        articleData.content = responseJSON.content;
        articleData.author = responseJSON.author;
        fetch(`https://wt.kpi.fei.tuke.sk/api/article/${i}`, postReqSettings)
    }

    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListenerComments);
    ajax.open("GET", url, false);
    ajax.send();
    }
}