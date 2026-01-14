
function clearInputs(){
  var elements = document.getElementsByTagName("input");
  for (var i=0; i < elements.length; i++) {
    if (elements[i].type == "number") {
      elements[i].value = "";
    }
  }
  var selects = document.getElementsByTagName("select");
  for (var i=0; i < selects.length; i++) {
     selects[i].selectedIndex = 0;
  }
}
