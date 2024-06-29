function handler(event) {
    var request = event.request;

    if (request.headers.host.value.startsWith("www.")) {
        var redirectURL = "https://" + request.headers.host.value.replace("www.", "") + request.uri;

        return {
            statusCode: 301,
            statusDescription: "Moved Permanently",
            headers: {
                location: { value: redirectURL }
            }
        };
    }

    return request;
}
