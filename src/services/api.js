const CORS_URL = 'https://thingproxy.freeboard.io/fetch/'

function getData(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(console.log);
}

function getZillowPrice(url) {
    return fetch(`${CORS_URL}${url}`);
}

export { getData, getZillowPrice };
