function calculatePToW() {
  const enginePowerInput = document.getElementById("enginePower");
  const emptyWeightInput = document.getElementById("emptyWeight");
  const payloadWeightInput = document.getElementById("payloadWeight");

  const powerUnit = enginePowerInput.nextElementSibling.value; 
  const weightUnit = emptyWeightInput.nextElementSibling.value;

  let power = parseFloat(enginePowerInput.value);
  let emptyWeight = parseFloat(emptyWeightInput.value) || 0;
  let payloadWeight = parseFloat(payloadWeightInput.value) || 0;

  if (isNaN(power) || emptyWeight <= 0) {
    console.warn("Missing or invalid inputs");
    return;
  }

  switch (powerUnit) {
    case "kW":
      power = power * 1.34102;
      break;
    case "W":
      power = power * 0.00134102;
      break;
    case "MW":
      power = power * 1341.02;
      break;
    case "HP":
    default:
      break;
  }

  switch (weightUnit) {
    case "lb":
      emptyWeight *= 0.453592;
      break;
    case "t":
      emptyWeight *= 1000;
      break;
    case "US ton":
      emptyWeight *= 907.185;
      break;
    case "long ton":
      emptyWeight *= 1016.05;
      break;
    case "kg":
    default:
      break;
  }

  const payloadUnit = payloadWeightInput.nextElementSibling.value;
  switch (payloadUnit) {
    case "lb":
      payloadWeight *= 0.453592;
      break;
    case "t":
      payloadWeight *= 1000;
      break;
    case "US ton":
      payloadWeight *= 907.185;
      break;
    case "long ton":
      payloadWeight *= 1016.05;
      break;
    case "kg":
    default:
      break;
  }

  const totalWeightKg = emptyWeight + payloadWeight;
  const weightTonne = totalWeightKg / 1000;

  const pToW = power / weightTonne; 
  const rounded = Math.round(pToW);

  const table = document.querySelector("table");
  const row = table.rows[3]; 
  const pToWCell = row.cells[3]; 

  pToWCell.textContent = `${rounded} hp/tonne`;
}

