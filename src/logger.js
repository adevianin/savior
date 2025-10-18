function log(data) {
    let preparedData = JSON.stringify({data});
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/log', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(preparedData);
}

export {
    log
};