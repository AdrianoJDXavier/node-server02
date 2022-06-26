var form_id_js = "javascript_form";

var data_js = {
    "access_token": "uv5xbljs4wzs8nu0uwc8h2nf"
};

function js_onSuccess() {
    var lang = localStorage.getItem("lang");
    if (lang == "en") {
        document.getElementById("js_send").innerHTML = "Message sent successfully";
    } else {
        document.getElementById("js_send").innerHTML = "Mensagem enviada com sucesso";
    }
}

function js_onError(error) {
    var lang = localStorage.getItem("lang");
    if (lang == "en") {
        document.getElementById("js_send").innerHTML = "Oops! There was an error sending the message";
    } else {
        document.getElementById("js_send").innerHTML = "Oops! Houve algum erro ao enviar a mensagem";
    }
    sendButton.disabled = false;
}

var sendButton = document.getElementById("js_send");

function js_send() {
    var lang = localStorage.getItem("lang");
    if (lang == "en") {
        sendButton.value = 'Sending...';
    } else {
        sendButton.value = 'Enviando...';
    }
    sendButton.disabled = true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else
            if (request.readyState == 4) {
                js_onError(request.response);
            }
    };

    var subject = document.querySelector("#" + form_id_js + " [name='contactSubject']").value;

    var formatMessage = "Nome: " + document.querySelector("#" + form_id_js + " [name='contactName']").value;
    formatMessage = formatMessage + "\nEmail: " + document.querySelector("#" + form_id_js + " [name='contactEmail']").value;
    formatMessage = formatMessage + "\nMensagem: " + document.querySelector("#" + form_id_js + " [name='contactMessage']").value;

    var message = formatMessage;
    data_js['subject'] = subject;
    data_js['text'] = message;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
    var form_data = [];
    for (var key in data_js) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});