/*
window._analytics =
    {
        "segment_key" : '34Q2oApcF5UJE03NgXwTY6A7f6MTs3kx'
    };
*/

// Track Single page app
analytics.track('{GitHub.io - Home}', {
    URL: 'https://ibm-bluemix.github.io/'
});

// Track hyper link
var footer01 = document.getElementById('IBMBluemix');
analytics.trackLink(footer01, 'Footer | IBM Bluemix.', {
    Direct: 'https://www.ibm.com/cloud-computing/bluemix'
});

var footer02 = document.getElementById('IBMBluemixGitHub');
analytics.trackLink(footer02, 'Footer | GitHub', {
    Direct: 'https://github.com/IBM-Bluemix'
});

var count = 1;
var sampleTitle;
$("li.inside.project-item.ng-scope" ).each(function( index ) {
    //sample_name = $( this ).text();
    sampleTitle = $(".project-outer .link-title").text();
    console.log( 'Count: ' + count);
    count++;
});


