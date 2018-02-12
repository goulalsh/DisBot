var crawler = new crawler("https://www.metal-archives.com/band/random");
    .on("fetchcomplete", function () {
        console.log("Aquired the requested resource")

crawler.interval = 10000; //ten seconds
crawler.maxConcurrency = 3;
crawler.maxDepth = 1; //Only the first page is fetched with linked CSS and images

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    console.log("Recieved %s (&d bytes)", queueItem.url, responseBuffer.length);
    console.log("Resource type %s", response.headers['content-type']);
}
crawler.start();
    });
