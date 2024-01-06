const pages=['Home','About','Contact']
// Create a new unordered list element
var unorderedList = document.createElement('ul');

// console.log(unorderedList)
// Create list items and append them to the unordered list
for (var i = 0; i < pages.length ; i++) {
  var listItem = document.createElement('li');
  var aItem = document.createElement('a');
  aItem.textContent = pages[i];
  // make an array of href to move onto next page
  aItem.href = '#'+pages[i]+'.html'; 
  listItem.appendChild(aItem);
  unorderedList.appendChild(listItem);
}

// Find an existing element in the document to append the unordered list to
var parentElement = document.getElementById('navigation');

// Append the unordered list to the existing element
parentElement.appendChild(unorderedList);
