let n=-1;
var hours_start;
var minutes_start;
var seconds_start;
var seconds_result;
var hours=0 ;//= now.getHours();
var minutes = 0;//now.getMinutes();
var counterInterval;
var accuracy=0;
var max_len;
var cng_cnt=0;

function update(from_key){
    
    // Get the paragraph element
var paragraph = document.getElementById('paragraph');

// Extract the text content of the paragraph
var paragraphText = paragraph.textContent || paragraph.innerText;
// Tokenize the content into words (split by whitespace)
var words = paragraphText.split(/\s+/);
// Count the number of words
var wordCount = words.length;
max_len = paragraphText.length;
if(n==max_len+1) {
    clearInterval(counterInterval);
    result_wpm(wordCount);
    return;
}
// Check if the text has at least 10 characters

    // Create a span element to wrap the 10th character
    var span = document.createElement('span');
    span.className = 'highlight'; // Add a class for styling
    // span.textContent = paragraphText.charAt(n-1); // JavaScript uses zero-based indexing
    span.textContent = paragraphText.substring(0,n); // JavaScript uses zero-based indexing
    
    // Replace the 10th character with the span
    // paragraph.innerHTML = paragraphText.substring(0, n-1) + span.outerHTML + paragraphText.substring(n);
    paragraph.innerHTML =  span.outerHTML + paragraphText.substring(n);
    // console.log(paragraph.innerHTML)
    if(from_key) {
        // console.table([paragraphText.charAt(n-1),from_key]);
        if(from_key != 'Backspace') {
            if( paragraphText.charAt(n-1)===from_key) accuracy = accuracy + 1;
            else {
                span.className = 'highlight-red'; // Add a class for styling
                span.textContent = paragraphText.charAt(n-1); // JavaScript uses zero-based indexing
                paragraph.innerHTML = paragraphText.substring(0, n-1) + span.outerHTML + paragraphText.substring(n);
            }
        }
        if(from_key === 'Backspace') {
            if(accuracy<=0) accuracy=0;
            else accuracy=accuracy-1;
        }
        // console.log(accuracy)
    }
    n=n+1;
}

function start(button){
    
    button.blur();
    var paragraphElement = document.getElementById('paragraph');
    var spanElement = paragraphElement.querySelector('span');
    // Check if the span element exists within the paragraph
    if (spanElement) {
        // Log the DOM representation of the span element
        // console.log(spanElement.outerHTML);
        spanElement.className="";
    }
    var resultElement = document.getElementById('result');
    if(resultElement){
        resultElement.textContent = "";
    }

    // initial time
    var now = new Date();
    hours_start = now.getHours();
    minutes_start = now.getMinutes();
    seconds_start = now.getSeconds();
    // Update the clock every second (1000 milliseconds)
    counterInterval = setInterval(updateClock, 1000);
    minutes = 0;
    hours = 0;
    accuracy = 0;

    n = 1;
    
}

    // Add an event listener for the "keydown" event on the document
    document.addEventListener('keydown', function (event) {
        var isAllowed = /^[a-zA-Z0-9\s\[\](),'"\/\\:;-\{\}\?`~!@#$%^&*()+=_]$/.test(event.key);
        if(event.key ==='Backspace'){
            // console.log('Backspace key pressed:', event.key);
            if(n<=2) n=0;
            else n=n-2;
            update(event.key);
        }
        else if(isAllowed) update(event.key);
    });

    function updateClock() {
        var currentTimeElement = document.getElementById('currentTime');
        var now = new Date();
        
        var seconds = now.getSeconds();

        if(seconds-seconds_start<0) seconds = seconds-seconds_start+60;
        else seconds = seconds-seconds_start;
        seconds_result = seconds;
        // Format the time as HH:MM:SS
        var formattedTime = hours + ':' + addLeadingZero(minutes) + ':' + addLeadingZero(seconds);

        // Update the content of the currentTimeElement
        currentTimeElement.textContent = formattedTime;

        if(seconds==59) minutes=minutes+1;
        if(minutes==59) hours=hours+1;
        
    }

    // Function to add a leading zero to single-digit numbers
    function addLeadingZero(number) {
        return number < 10 ? '0' + number : number;
    }

    function result_wpm(wordCount){
        var paragraph = document.getElementById('result');
        
        var wpm =60/(hours*60*60+minutes*60+seconds_result)*wordCount; 
        var acc = accuracy/max_len*100;
        var txt = `Word Per Minute :: ${wpm.toFixed(2)}`+"<br>"+
                  `Accuracy :: ${acc.toFixed(3)}%`;
        paragraph.innerHTML = txt;
        // console.log(wpm.toFixed(3));
        // console.log(max_len,accuracy);


    }


    function change(){
        const text_array = ["The Indian Space Research Organisation's inaugural solar mission, Aditya-L1, has reached its destination within the anticipated four-month timeframe, Prime Minister Narendra Modi said yesterday.",
            "North Korea's military fired over 60 artillery rounds near Yeonpyeong Island yesterday, Seoul's military said, a day after both sides staged live-fire drills in the same area near their contested maritime border.",
            "A Myanmar rebel alliance has gained control of a key town along the country's volatile northern border with China after weeks of fierce fighting with junta troops, the alliance and the junta said.",
            "Rescuers and residents sifted through rubble Saturday as their focus turned to recovering bodies and cleaning up rather than finding survivors, five days after a huge earthquake struck central Japan and killed at least 126 people.",
            "India's Gautam Adani once again became Asia's richest man yesterday, according to a Bloomberg index of the world's billionaires, a year after allegations of market manipulation hammered his conglomerate's stock prices."];

        var main_para = document.getElementById('paragraph');
        main_para.innerHTML = text_array[cng_cnt%5];
        cng_cnt=cng_cnt+1;

    }

