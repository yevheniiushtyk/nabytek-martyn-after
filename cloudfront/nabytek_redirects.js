function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (uri === '/services.html') {
        var response = {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: {value: '/kuchyne-na-miru'}
            }
        };

        return response;
    }

    if (uri === '/kuchyne_na_miru.html') {
        var response = {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: {value: '/kuchyne-na-miru'}
            }
        };

        return response;
    }

    if (uri === '/vestavene_skrine.html') {
        var response = {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: {value: '/vestavene-skrine'}
            }
        };

        return response;
    }

    if (uri === '/stoly.html') {
        var response = {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: {value: '/stoly'}
            }
        };

        return response;
    }

    if (uri === '/drevene_postele.html') {
        var response = {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: {value: '/drevene-postele'}
            }
        };

        return response;
    }

    if (uri === '/jine.html') {
        var response = {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: {value: '/ostatni'}
            }
        };

        return response;
    }

    if (uri === '/contact_us.html') {
        var response = {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: {value: '/kontakt'}
            }
        };

        return response;
    }

    if (uri === '/kuchyne-na-miru') {
        request.uri = '/kuchyne-na-miru.html';
    }

    if (uri === '/vestavene-skrine') {
        request.uri = '/vestavene-skrine.html';
    }

    if (uri === '/stoly') {
        request.uri = '/stoly.html';
    }

    if (uri === '/drevene-postele') {
        request.uri = '/drevene-postele.html';
    }

    if (uri === '/schodiste') {
        request.uri = '/schodiste.html';
    }

    if (uri === '/ostatni') {
        request.uri = '/ostatni.html';
    }

    if (uri === '/kontakt') {
        request.uri = '/kontakt.html';
    }

    if (uri === '/drevene-zidle') {
        request.uri = '/drevene-zidle.html';
    }

    if (uri === '/drevene-stoly') {
        request.uri = '/drevene-stoly.html';
    }

    return request;
}
