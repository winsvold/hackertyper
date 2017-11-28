export const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Accumsan sit amet nulla facilisi morbi tempus iaculis urna id. Sit amet tellus cras adipiscing. Montes nascetur ridiculus mus mauris vitae ultricies leo. Sed felis eget velit aliquet sagittis id. Sed cras ornare arcu dui vivamus arcu felis. Bibendum ut tristique et egestas quis ipsum. Magna ac placerat vestibulum lectus. Nisi vitae suscipit tellus mauris a. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Ac turpis egestas maecenas pharetra. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Massa eget egestas purus viverra accumsan.'

export const code = `function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}`;

export function loremIpsumGetter(numberOfLetters) {
    return loremIpsum.slice(0,numberOfLetters);
}

export function codeGetter(numberOfLetters) {
    return code.slice(0,numberOfLetters);
}