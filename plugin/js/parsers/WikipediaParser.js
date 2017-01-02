/*
  Parses files on wikipedia.org
*/
"use strict";

parserFactory.registerRule(
    function(url, dom) {           // eslint-disable-line no-unused-vars
        return util.extractHostName(url).endsWith(".wikipedia.org"); 
    }, 
    function() { return new WikipediaParser() }
);

class WikipediaParser extends Parser{
    constructor() {
        super();
    }

    getChapterUrls(dom) {
        // special case, just return URL of current page
        let chapter = {
            sourceUrl:  dom.baseURI,
            title: dom.title
        };
        return Promise.resolve([chapter]);
    };

    // returns the element holding the story content in a chapter
    findContent(dom) {
        return dom.getElementById("bodyContent");
    };

    extractLanguage(dom) {
        return util.getElement(dom, "html").getAttribute("lang");
    };    
}