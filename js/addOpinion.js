import routes from "./routes.js";

export default function processOpnFrmData(event) {
    //1.prevent normal event (form sending) processing
    event.preventDefault();

    //2. Считываем данные из формы (здесь мы удаляем пробелы до и после строк)
    const nopName = document.getElementById("meno").value.trim();
    const nopOpn = document.getElementById("nazor").value.trim();
    const nopMail = document.getElementById("email").value.trim();
    const nopUrl = document.getElementById("url").value.trim();
    const ch1 = document.getElementById("contactChoice1").checked;
    const ch2 = document.getElementById("contactChoice2").checked;
    const ch3 = document.getElementById("contactChoice3").checked;
    const chh1 = document.getElementById("choice1").checked;
    const chh2 = document.getElementById("choice2").checked;
    const chh3 = document.getElementById("choice3").checked;

    //3. Проверяем данные что ввел пользователь
    if (nopName === "" || nopOpn === "") {
        window.alert("Please, enter both your name and opinion");
        return;
    }
    let stroka = "none";
    let stroka2 = "none";

    //проверяем что выбрали(ответ может быть только 1)
    //и записываем в переменную "stroka"
    if (ch1 === true) {
        stroka = 'Okresy Bratislavy';
    } else if (ch2 === true) {
        stroka = 'Сena bývania';
    } else if (ch3 === true) {
        stroka = 'Domáce zvieratá';
    }

    //проверяем что выбрали(ответов может быть несколько)
    //и записываем в переменную "stroka2"
    if (chh1 === true) {
        stroka2 = 'V byte';
    }
    if (chh2 === true) {
        if (chh1 === true)
            stroka2 += ', V dome';
        else
            stroka2= 'V dome'
    }
    if (chh3 === true) {
        if (chh1 === true || chh2 === true)
            stroka2 += ', Páči sa mi oboje';
        else
            stroka2 = 'Páči sa mi oboje';
    }

    //по умолчанию фото берем с папки с фотками
    //no-image-available
    var foto = "/awt/fig/no-image-available.jpg";
    //если пользователь указал свое фото в форме
    //то путь фото меняем на то, что он задал
    if (nopUrl != "") {
        foto = nopUrl;
    }

    //3. Добавьте данные в массив ответов и локальное хранилище
    const new_opinion =
        {
            name: nopName,
            comment: nopOpn,
            email: nopMail,
            url: foto,
            okres: stroka,
            byvanie: stroka2,
            created: new Date()
        };

    //масив с ответами
    let opinions = [];

    if (localStorage.myTreesComments) {
        opinions = JSON.parse(localStorage.myTreesComments);
    }
    addMyOpinoin(new_opinion);
    opinions.push(new_opinion);
    localStorage.myTreesComments = JSON.stringify(opinions);

    //5. переходим на страничку
    window.location.hash = "#opinions";

}
function addMyOpinoin(new_opinion){
    let opinions = [];
    let idGoogleUser = window.localStorage.getItem('userID');

    function reqListenerComments() {
        if (this.status === 200) {
            let responseJSON = JSON.parse(this.responseText)
            opinions = JSON.parse(this.responseText)
            //
            console.log(opinions);
            opinions[idGoogleUser].push(new_opinion);
            console.log(opinions);
            //console.log(this.responseText);

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
//localStorage.myTreesComments