let templates = {
    get: function (templateName) {
        let url = `./scripts/templates/${templateName}.handlebars`;
        return requester.get(url);
    }
};