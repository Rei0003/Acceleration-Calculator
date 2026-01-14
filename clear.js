
function clearInputs(){
  var elements = document.getElementsByTagName("input");
  for (var i=0; i < elements.length; i++) {
    if (elements[i].type == "text") {
      elements[i].value = "";
    }
  }
  var selects = document.getElementsByTagName("select");
  for (var i=0; i < elements.length; i++) {
    if (selects[i].type == "text") {
      selects[i].value = "";
    }
  }
}
