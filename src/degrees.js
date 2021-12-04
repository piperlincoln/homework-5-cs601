// Track whether the degree information has already been loaded into the table.
var loadedTable = false;

/*
 * This function creates a fetch request to return a promise
 * and process the returned JSON data about college degrees.
 *
 * Author: Piper Lincoln
 */
async function getDegrees(url) {
  let response = await fetch(url);
  // Check the status of the response.
  if (response.status === 200) {
    let degrees = await response.json();
    var content = '';
    degrees.data.forEach(function(data) {
      content +='<tr>';
      content += '<td>' + data.degree.school + '</td>';
      content += '<td>' + data.degree.type + '</td>';
      content += '<td>' + data.degree.major + '</td>';
      content += '<td>' + data.degree.year + '</td>';
      content += '</tr>';
    });
    $('#degree-table').append(content);
  } else {
    alert("Error: The JSON data could not be retrieved by fetch.");
  }
}

/*
 * This function continually checks if the DOM is ready
 * before adding a submission event listener for the form.
 *
 * Author: Josh Hanson
 * Modifier: Piper Lincoln
 */
function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

/*
 * This function listens for a mouse click before populating the table.
 *
 * Author: Piper Lincoln
 */
domReady(function() {
  alert("Click anywhere to populate the table.");
  window.addEventListener('click', (event) => {
    if (!loadedTable) {
      loadedTable = true;
      getDegrees("https://raw.githubusercontent.com/piperlincoln/homework-5-cs601/main/src/my_college_degrees.json");
    }
  });
});
