import Mustache from "./mustache.js";
import processOpnFrmData from "./addOpinion.js";
import articleFormsHandler from "./articleFormsHandler.js";

let AdminId = "id117074500003811940767";
let myTag = "maria";


export default [
    {
        //часть после '#' в URL (в файлике index.html 29 строка) название ссылки
        hash: "welcome",
        ///идентификатор html-файла id
        target: "router-view",
        //функция, которая возвращает содержимое для отображения html-файлу
        getTemplate: (targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-welcome").innerHTML
        //"template-welcome" говорит о том какой script(с каким id) должен быть вызван в файле index.html
    },
    {
        //при клике на ссылку href="#okresy"
        hash: "okresy",
        target: "router-view",
        //будет вызванна функция okresyTemplate
        getTemplate: okresyTemplate
    },
    {
        //при клике на ссылку href="#cena"
        hash: "cena",
        target: "router-view",
        getTemplate: cenaTemplate
    },
    {
        //при клике на ссылку href="#zvierata"
        hash: "zvierata",
        target: "router-view",
        getTemplate: (targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-zvierata").innerHTML
    },
    {
        //при клике на ссылку href="#opinions"
        hash: "opinions",
        target: "router-view",
        getTemplate: createHtml4opinions
    },
    {
        //при клике на ссылку href="#addOpinion"
        hash: "addOpinion",
        target: "router-view",
        getTemplate: (targetElm) => {
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-addOpinion").innerHTML,
                    userr
                );
            document.getElementById("opnFrm").onsubmit = processOpnFrmData;
        }
    },
    {
        //при клике на ссылку href="#articles"
        hash: "articles",
        target: "router-view",
        getTemplate: fetchAndDisplayArticles
    },
    // 6 сдача
    {
        hash: "article",
        target: "router-view",
        getTemplate: fetchAndDisplayArticleDetail
    }
    ,
    {
        hash: "artDelete",
        target: "router-view",
        getTemplate: DeleteArticle
    },
    {
        hash: "artEdit",
        target: "router-view",
        getTemplate: editArticle
    },
    {
        hash: "addarticles",
        target: "router-view",
        getTemplate: addArticle
    },
    {
        hash: "findarticles",
        target: "router-view",
        getTemplate: findArticle
    },
    {
        hash: "commentPost",
        target: "router-view",
        getTemplate: addComment
    }
    ,
    {
        hash: "show",
        target: "router-view",
        getTemplate: Showf
    },
    {
        hash: "showCommentForm",
        target: "router-view",
        getTemplate: ShowComForm
    }
    ,
    {
        hash: "hide",
        target: "router-view",
        getTemplate: Hidef
    }
    ,
    {
        hash: "SignIn",
        target: "router-view",
        getTemplate: SigLogIn
    },
    {
        hash: "DelOpinion",
        target: "router-view",
        getTemplate: DelOpinion
    }
];
//6 сдача
const urlBase = "https://wt.kpi.fei.tuke.sk/api";
const articlesPerPage = 20;

//функция возвращает количество статей
function total() {
    const url = "https://wt.kpi.fei.tuke.sk/api/article";

    var textarticles = 0;

    function reqListener() {
        console.log(this.responseText)
        if (this.status === 200) {
            textarticles = JSON.parse(this.responseText);
            var totalArticles = textarticles.meta.totalCount;
        }
    }

    console.log(url)
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
    console.log("send")

    return totalArticles;
}

let opinions2 = [];
//функция берет данные из localStorage браузера
//помещает их в переменную opinions
//ShowOpinions*
function createHtml4opinions(targetElm) {
    //переменная localStorage
    //const opinionsFromStorage = localStorage.myTreesComments;
    // if (opinionsFromStorage) {
    //     //помещаем данные в переменную
    //     opinions = JSON.parse(opinionsFromStorage);
    //     //для каждой записи которая хранится в localStorage
    //     opinions.forEach(opinion => {
    //         opinion.created = (new Date(opinion.created)).toDateString();
    //     });
    // }
    let opinions = [];

    let opinionsAllForAdnim = [];
    if (userr.id !== null) {
        //let idGoodleUser = 1234567;
        function reqListenerComments() {
            if (this.status === 200) {
                opinions = JSON.parse(this.responseText);
                opinions2 = JSON.parse(this.responseText);

                if (userr.id === AdminId) {
                    let keysOpinions = Object.keys(opinions);
                    for (let i = 0; i < keysOpinions.length; i++) {
                        for (let j = 0; j < opinions[keysOpinions[i]].length; j++) {
                            opinions[keysOpinions[i]][j].a = keysOpinions[i];
                            opinions[keysOpinions[i]][j].d = j;
                            opinionsAllForAdnim.push(opinions[keysOpinions[i]][j]);
                        }
                    }
                    opinions = opinionsAllForAdnim;
                    opinions.admin = "🔑 Admin panel 🔑";
                    opinions.name = "All Visitors Opinions";
                    opinions.youCanDel = "You can delete opinion by clicking on it";
                } else {
                    opinions.name = "Opinions from Visitor: " + userr.name;
                }
            }
        }

        let url = `https://api.npoint.io/7277534d6c85d7e10b53/`;
        if (userr.id !== AdminId)
            url += userr.id;

        var ajax = new XMLHttpRequest();
        ajax.addEventListener("load", reqListenerComments);
        ajax.open("GET", url, false);
        ajax.send();
    }

    document.getElementById(targetElm).innerHTML = Mustache.render(
        document.getElementById("template-opinions").innerHTML,
        opinions
    );
}

function DelOpi() {
    const element = document.getElementById('showDelButOpi');
    const element2 = document.getElementsByClassName('showDelButOpi2');
    element.style.cssText = 'display: table-cell';
    element2.style.cssText = 'display: table-cell';
}

//функция открытия файла dataOkresy
//и рендера (отображения странички) "Okresy Bratislavy"
function okresyTemplate(targetElm) {
    //try - пробуем открыть файл
    try {
        //новый запрос
        var request = new XMLHttpRequest();
        //открываем его, используем метод GET для получения данных
        request.open("GET", "files/dataOkresy.json", false);
        request.send(null)
        //помещаем данные из файла в переменную
        var data = JSON.parse(request.responseText);
        //генерируем (отображаем) страничку
        //"template-okresy" - какой скрипт будет запущен
        //data - передаем переменную. В html файле будут данные браться с неё
        document.getElementById(targetElm).innerHTML = Mustache.render(document.getElementById("template-okresy").innerHTML, data)
    } catch (ex) {
        //catch - если не сможем открыть файл
        document.getElementById(targetElm).innerHTML =
            Mustache.render(
                document.getElementById("template-error").innerHTML);
    }
}

//функция открытия файла dataCena
//и рендера (отображения странички) "Сena bývania v Bratislave"
function cenaTemplate(targetElm) {
    try {
        var request = new XMLHttpRequest();
        request.open("GET", "files/dataCena.json", false);
        request.send(null)
        var data = JSON.parse(request.responseText);
        document.getElementById(targetElm).innerHTML = Mustache.render(document.getElementById("template-cena").innerHTML, data)
    } catch (ex) {
        //если не сможем открыть файл
        document.getElementById(targetElm).innerHTML =
            Mustache.render(
                document.getElementById("template-error").innerHTML);
    }
}

//переменная которая хранит в себе максимальное количество статей
var totalCountArt = 0;
var totalCountCom = 0;

//функция, которая покажет максимальное количество страничек
function totalCountf() {
    var urlbase = "https://wt.kpi.fei.tuke.sk/api/article";

    function reqListener1() {
        console.log(this.responseText)
        if (this.status === 200) {
            const responseJSON = JSON.parse(this.responseText)
            totalCountArt = parseInt(responseJSON.meta.totalCount);
        } else {
            alert("error");
        }
    }

    var ajax1 = new XMLHttpRequest();
    ajax1.addEventListener("load", reqListener1);
    //async - false  важно!!!
    ajax1.open("GET", urlbase, false);
    ajax1.send();
}

function totalCountComments(articleId) {
    var urlbase = `https://wt.kpi.fei.tuke.sk/api/article/${articleId}/comment`;

    function reqListener1() {
        console.log(this.responseText)
        if (this.status === 200) {
            const responseJSON = JSON.parse(this.responseText)
            totalCountCom = parseInt(responseJSON.meta.totalCount);
        } else {
            alert("error");
        }
    }

    var ajax1 = new XMLHttpRequest();
    ajax1.addEventListener("load", reqListener1);
    //async - false  важно!!!
    ajax1.open("GET", urlbase, false);
    ajax1.send();

}

//переменная запоминает на какой были страничке от 1 до (последней) для статей
var oldpage = 1;
var oldpageComments = 1;
var display = false;
// var data4rendering = {
//     offsets: 0,
//     offsets20: 20,
//     currPage: 1,
//     pageCount: 65,
//     textarticles: "JSON.parse(this.responseText)"
// };
//функция получает статьи с сайта
//и отображает страничку "Articles"
//имеет 5 параметров
//targetElm - идентификатор html-файла его id
//current - текущая страничка
//totalCount - количество страничек
//offset - количество статей
//jump - число (флаг) с какой статьи, отображать статьи-->
function fetchAndDisplayArticles(targetElm, current, offset, jump, tagtextt2, findAuthor2, title2) {
    //вызываем функцию подсчета статей
    totalCountf();
    //делим количество статей на 20, чтобы узнать сколько страничек нам потребуется
    var totalCount = totalCountArt / 20;
    //Math.ceil() округляем до целого числа. А + 1 даем на одну стр больше
    totalCount = Math.ceil(totalCount) + 1;

    current = parseInt(current);
    offset = parseInt(offset);
    jump = parseInt(jump);


    //data4rendering - Переменная массив. С неё мы получаем данные в html файле
    //Хранит в себе:
    //offsets - с какой статьи - отображать статьи
    //offsets20 - до какой статьи - отображать статьи + 20 (для отображения в заголовке)
    //currPage - количество страничек
    //textarticles - массив статей полученных с сайта туке
    var tagtextInput = document.getElementById("tagText");
    var findAuthor = document.getElementById("findAuthor");
    var title = document.getElementById("findTitle");

    var data4rendering = {
        tagText: tagtextInput?.value || null,
        findAuthor: findAuthor?.value || null,
        title: title?.value || null,
        offsets: offset,
        offsets20: offset,
        currPage: current,
        pageCount: totalCount,
        tagtextt2: tagtextt2,
        textarticles: "JSON.parse(this.responseText)"
    };
    //создаем 2 переменных чтобы из них брать данные о количестве стр в html файле
    data4rendering.totalCountEnd = totalCount;
    data4rendering.totalCountArti = totalCountArt;

    //если текущая страничка дальше первой(вторая и дальше) - тогда мы можем отобразить кнопку (prevPage)
    //и осуществить переход назад (current - 1)
    if (current > 1) {
        data4rendering.prevPage = current - 1;
    }

    //если текущая страничка НЕ последняя - тогда мы можем отобразить кнопку (nextPage)
    //и осуществить переход вперед (current + 1)
    if (current < totalCount) {
        data4rendering.nextPage = current + 1;
    }


    /////отображение следующих 20 статей
    //если например мы с 1 перешли на 2 страничку
    //то ткущая страничка (2) больше старой (1) с которой мы перешли
    //тогда отображать статьи с число+20
    if (current > oldpage) {
        data4rendering.offsets += 20;
        if (current === totalCount)
            data4rendering.offsets = totalCountArt;
    }
    //иначе если мы возвращаемся
    //то число - 20
    if (current < oldpage) {
        data4rendering.offsets -= 20;
        //если мы переходим с последней на предыдущую страничку
        //то нам нужно указать правильное число с какой статьи отображать
        //и просто -20 не подойдёт
        if (current === totalCount - 1) {
            //узнаем количество страниц
            var offsetsss = totalCountArt / 20;
            //Math.floor() округление в меньшую сторону
            offsetsss = Math.floor(offsetsss);
            //умножаем на 20 количество страничек
            offsetsss = offsetsss * 20;
            data4rendering.offsets = offsetsss;
            //пример
            //906 статей всего
            //906/20 = 45,3
            //45,3 = 45
            //45*20 = 900
            //на предпоследней страничке будем отображать с 900 статьи, а не с (906-20) 886 статьи
        }
    }

    //переменная которая запоминает на какой страничке
    //мы были до клика перехода на другую страничку
    oldpage = current;

    //если мы нажали на кнопку перехода на первую страничку (Start page)
    //тогда устанавливаем переменную "data4rendering.offsets" на значение 0
    //отображать статьи с нулевой
    if (jump === 0) {
        data4rendering.offsets = 0;
        oldpage = 1;
    }

        //если мы нажали на кнопку перехода на последнюю страничку (End page)
        //тогда устанавливаем переменную "data4rendering.offsets" на значение 1280
    //отображать статьи с последней (мы их не сможем отобразить, потому что меньше)
    else if (jump === 1) {
        data4rendering.offsets = totalCountArt;
        oldpage = totalCount;
    }

    //Установить значение в переменной "offsets20" на 20 больше
    //чем с какой статьи мы отображаем статьи.
    //Чтобы получить вид например 20 - 40
    data4rendering.offsets20 = data4rendering.offsets + 20;

    //если мы на предпоследней страничке будем отображать например 900-906, а не 900-920
    if (current === totalCount - 1)
        data4rendering.offsets20 = totalCountArt;
    //если мы на последней страничке будем отображать например 906-906
    if (current === totalCount) {
        data4rendering.offsets20 = data4rendering.offsets;
    }

    //ссылка на сайт со статьями
    //
    // ?max=20&offset=${data4rendering.offsets}  - разбираем что тут написано <3
    //
    //max=20 - тут задаем сколько статей будем получать с сайта,
    //в нашем случае мы будем получать по 20 статей. Так нужно по заданию(отображать только 20 статей на страничке)
    //
    //offset=${data4rendering.offsets} - тут задаем с какой статьи мы отображаем статьи
    //
    //так как это строка, а нам в неё нужно передать значение с переменной, то используем такую конструкцию
    //${data4rendering.offsets} - ${переменная} - называется экранирование переменных
    let url = `https://wt.kpi.fei.tuke.sk/api/article?max=20&offset=${data4rendering.offsets}`;
    //alert("[" + tagtextt2 + "]");
    //if (tagtextt2 !== undefined && tagtextt2 !== '') {

    if (data4rendering.tagText !== null) {
        url += `&tag=${data4rendering.tagText}`;
    }
    if (data4rendering.findAuthor !== null) {
        url += `&author=${data4rendering.findAuthor}`;
    }
    if (data4rendering.title !== null) {
        url += `&title=${data4rendering.title}`;
    }
    //TagFind*
    if (tagtextt2 === myTag) {
        url = `https://wt.kpi.fei.tuke.sk/api/article?max=20&offset=${data4rendering.offsets}&tag=${tagtextt2}`;
    }
    //alert("[" + data4rendering.tagtext + "]");
    //tagtextt2 = data4rendering.tagtextt2;

    //alert(url);

    //тут у нас функция проверяет если нет ошибки доступа к сайту
    //то будем отображать(рендерить) страничку html
    //status === 200 значит ошибок нет
    function reqListener() {
        // stiahnuty text
        console.log(this.responseText)
        if (this.status === 200) {
            data4rendering.textarticles = JSON.parse(this.responseText);

            // 6 сдача
            addArtDetailLink2ResponseJson(data4rendering);

            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles").innerHTML,
                    data4rendering);
            //"template-articles" - будем отображать этот скрипт с html файлика
            //и передаем туда эту переменную data4rendering
        } else {
            //если не сможем открыть сайт со статьями
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-error").innerHTML);
        }
    }

    //Создаем соединение,
    //передаем ссылку url,
    //и получаем данные
    console.log(url)
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
    console.log("send")
}

//
// 6 сдача
//
//ButtonDel*
//fetch(ссылка на удаление, метод DELETE)
function DeleteArticle(targetElm, articleId, currPage, offsets) {
    fetch(`https://wt.kpi.fei.tuke.sk/api/article/${articleId}`, {method: 'DELETE'})
        .then(() => window.location.hash = `#articles/${currPage}/${offsets}`)
        .catch(() => window.alert("Error delete"));
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//AddComenttts*
function addComment(targetElm, articleId, offsetFromHash, totalCount, currPage, offsets, articleId2, current, comOffsets) {
    const commentsData = {
        text: document.getElementById("commentcontent").value.trim(),
        author: document.getElementById("commentauthor").value.trim()
    };
    const postReqSettings = //an object wih settings of the request
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(commentsData)
        };
    fetch(`https://wt.kpi.fei.tuke.sk/api/article/${articleId}/comment`, postReqSettings)
        .then(() => window.location.hash = `#article/${articleId}/${offsetFromHash}/${totalCount}/${currPage}/${offsets}/${articleId2}/${current}/${comOffsets}`);
}


// функция заходит в статью и открывает линк артикл
//DisplayArticle*
function addArtDetailLink2ResponseJson(data4rendering) {

    data4rendering.textarticles.articles = data4rendering.textarticles.articles.map(
        article => (
            {
                ...article,
                detailLink: `#article/${article.id}/${data4rendering.textarticles.meta.offset}/${data4rendering.textarticles.meta.totalCount}/${data4rendering.currPage}/${data4rendering.offsets}/${data4rendering.textarticles.articles.id}/1/0`
            }
        )
    );
}

function fetchAndDisplayArticleDetail(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash, currPage, offsets, articleId, comPage, comOffsets) {
    fetchAndProcessArticle(...arguments, false);
}

function editArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash, currPage, offsets, articleId, comPage, comOffsets) {
    fetchAndProcessArticle(...arguments, true);
}

//AddArticles*
//заполняем переменную var data данными и передаем ее в форму articleFormsHandler.js
function addArticle(targetElm) {
    totalCountf();
    var totalCount = totalCountArt + 1;
    var d = new Date();
    var data = {
        id: 19290,
        //AddMyName*
        author: userr.name,
        dateCreated: d.toISOString(),
        imageLink: "",
        title: "",
        tags: [
            "mari"
        ]
    };
    data.formTitle = "Article Add";
    data.submitBtTitle = "Add article";
    data.backLink = "#articles/1/0";

    document.getElementById(targetElm).innerHTML =
        Mustache.render(
            document.getElementById("template-article-form").innerHTML,
            data
        );
    if (!window.artFrmHandler) {
        window.artFrmHandler = new articleFormsHandler("https://wt.kpi.fei.tuke.sk/api");
    }
    window.artFrmHandler.assignFormAndArticle2("articleForm", "hiddenElm", 19290);

}

let responseJSONComment = "test";

//ShowComments*
function getComments(id, comOffsets) {
    const url = `${urlBase}/article/${id}/comment/?max=10&offset=${comOffsets}`;
    function reqListenerComments() {
        // stiahnuty text
        console.log("new");
        console.log(this.responseText)
        if (this.status === 200) {
            responseJSONComment = JSON.parse(this.responseText)
        } else {
            alert("Error responseJSONComment");
        }
    }
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListenerComments);
    ajax.open("GET", url, false);
    ajax.send();
}

function fetchAndProcessArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash, currPage, offsets, articleId, comPage, comOffsets, forEdit) {
    const url = `${urlBase}/article/${artIdFromHash}`;

    function reqListener() {
        let data = {
            responseJSON1: "q",
            responseJSON2: "q",
            artIdFromHash: 0
        }
        console.log(this.responseText)
        if (this.status === 200) {
            var responseJSON = JSON.parse(this.responseText)
            //ButtonEdit*
            if (forEdit) {
                responseJSON.GoogleUserName = userr.name;
                responseJSON.formTitle = "Article Edit";
                responseJSON.submitBtTitle = "Save article";
                responseJSON.backLink = `#article/${artIdFromHash}/${offsetFromHash}/${totalCountFromHash}/${currPage}/${offsets}/${articleId}`;

                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-article-form").innerHTML,
                        responseJSON
                    );
                if (!window.artFrmHandler) {
                    window.artFrmHandler = new articleFormsHandler("https://wt.kpi.fei.tuke.sk/api");
                }
                window.artFrmHandler.assignFormAndArticle("articleForm", "hiddenElm", artIdFromHash, offsetFromHash, totalCountFromHash, currPage, offsets, articleId);
            } else {
                //
                //ОТОБРАЖЕНИЕ НЕ ДЛЯ РЕДАКТИРОВАНИЯ
                //
                totalCountComments(artIdFromHash);
                var totalCount = totalCountCom / 10;
                //Math.ceil() округляем до целого числа. А + 1 даем на одну стр больше
                totalCount = Math.ceil(totalCount);
                //------------
                data.artIdFromHash = artIdFromHash;
                data.offsetFromHash = offsetFromHash;
                data.totalCountFromHash = totalCountFromHash;
                data.currPage = currPage;
                data.offsets = offsets;
                data.articleId = articleId;
                data.forEdit = forEdit;
                data.current = parseInt(comPage);
                data.comOffsets = parseInt(comOffsets);
                //------------
                //------------ если доб 21 комент или 31 41 51
                var Tfcom = totalCount;
                if (totalCountCom % 10 === 0)
                    Tfcom += 1;
                var Tocom = (totalCount - 1) * 10;
                if (totalCount === 0)
                    Tocom = 0;
                //------------
                console.log("comOffsets: " + comOffsets);
                console.log("Tocom: " + Tocom);

                console.log("comPage: " + comPage);
                console.log("totalCount: " + totalCount);
                console.log("oldpageComments: " + oldpageComments);
                if (comPage.toString() === totalCount.toString() && comOffsets.toString() === Tocom.toString()) {
                    console.log("rrrrrrrrrrrrrr");
                    if (comPage > 1) {
                        data.prevPage = parseInt(comPage) - 1;
                    }
                    if (comPage < totalCount) {
                        data.nextPage = parseInt(comPage) + 1;
                    }
                    //ТУТ ПОЛУЧАЕМ КОМЕНТЫ
                    getComments(artIdFromHash, Tocom);
                    oldpageComments = totalCount;
                } else {
                    console.log("reeeeeeeeeee");
                    if (comPage > 1) {
                        data.prevPage = parseInt(comPage) - 1;
                    }
                    if (comPage < totalCount) {
                        data.nextPage = parseInt(comPage) + 1;
                    }
                    if (comPage === oldpageComments) {
                        data.comOffsets = 0;
                    }
                    if (comPage > oldpageComments) {
                        data.comOffsets += 10;
                    }
                    if (comPage < oldpageComments) {
                        data.comOffsets -= 10;
                    }

                    console.log(comPage + " " + totalCount);
                    oldpageComments = comPage;
                    getComments(artIdFromHash, data.comOffsets);
                }

                data.responseJSON1 = responseJSON;
                data.responseJSON2 = responseJSONComment;

                //ButtonBack*
                data.backLink = `#articles/${currPage}/${offsets}`;

                data.editLink =
                    `#artEdit/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}/${currPage}/${offsets}/${responseJSON.id}/${data.current}/${data.comOffsets}`;

                data.deleteLink =
                    `#artDelete/${responseJSON.id}/${currPage}/${offsets}`;
                data.commentAdd =
                    `#commentPost/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}/${currPage}/${offsets}/${responseJSON.id}/${Tfcom}/${Tocom}`;

                data.GoogleUserName = userr.name;
                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-article").innerHTML,
                        data
                    );
            }
        } else {

            const errMsgObj = {errMessage: this.responseText};
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles-error").innerHTML,
                    errMsgObj
                );
        }
    }

    console.log(url)
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
}

function findArticle(targetElm) {
    const tagtext = document.getElementById("tagtext").value.trim();
}

function Showf() {
    const element = document.getElementById('tableF');
    element.style.cssText = 'display: inline-table';
    display = true;
}

//showCommentForm*
function ShowComForm() {
    const element = document.getElementById('commentsForm');
    element.style.cssText = 'display: inline-table';
}


function Hidef() {
    const element = document.getElementById('tableF');
    element.style.cssText = 'display: none';
    display = false;
}

var googleUser = {};
let auth22 = {}
var userr = {
    id: "id",
    name: null,
    imgUrl: null,
    email: null
}

//GoogleSignIn*
function SigLogIn(targetElm) {

    startApp(googleUser, userr);
    userr.isSingIn = "You are not sign in account 🙁";
    if (userr.name !== null) {
        userr.isSingIn = "You are sign in account 😃";
    }

    document.getElementById(targetElm).innerHTML =
        Mustache.render(
            document.getElementById("template-SignIn").innerHTML,
            userr
        );
}

function DelOpinion(targetElm, a, d) {
    let flag = false;
    if (AdminId === userr.id)
        flag = confirm("Delete this opinion?")
    else
        alert("You haven't permissions delete this opinions")
    if (flag) {
        function reqListenerComments() {
            if (this.status === 200) {

                console.log(opinions2);

                let keysName = Object.keys(opinions2);
                console.log(" del " + keysName);

                opinions2[a].splice(d, 1);
                console.log(opinions2);

                let postReqSettings = //an object wih settings of the request
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                        body: JSON.stringify(opinions2)
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
                        window.location.hash = "#welcome"
                    )
            }
        }


        var ajax = new XMLHttpRequest();
        ajax.addEventListener("load", reqListenerComments);
        ajax.open("GET", `https://api.npoint.io/7277534d6c85d7e10b53`, false);
        ajax.send();
    } else {
        console.log("no del");
    }
}