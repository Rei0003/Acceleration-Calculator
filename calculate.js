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

function calculateAcceleration() {

    const powerInput = document.getElementById("enginePower");
    const powerUnit = powerInput.nextElementSibling.value;

    const emptyW = parseFloat(document.getElementById("emptyWeight").value);
    const payloadW = parseFloat(document.getElementById("payloadWeight").value);

    const vehicleType = document.getElementById("vehicleType").value;
    const driveType = document.getElementById("driveType").value;
    const motorType = document.getElementById("motorType").value;
    const gearbox = document.getElementById("gearboxType").value;
    const tireType = document.getElementById("tireType").value;
    const condition = document.getElementById("conditionType").value;

    if (
        isNaN(emptyW) || emptyW <= 0 ||
        isNaN(payloadW) ||
        isNaN(parseFloat(powerInput.value))
    ) return;

    const selects = [
        vehicleType,
        driveType,
        motorType,
        gearbox,
        tireType,
        condition
    ];

    if (selects.includes("Select")) return;

    let P = parseFloat(powerInput.value);

    switch (powerUnit) {
        case "HP": P *= 745.7; break;
        case "kW": P *= 1000; break;
        case "MW": P *= 1e6; break;
        case "W": break;
    }

    function toKg(value, unit) {
        switch (unit) {
            case "lb": return value * 0.453592;
            case "t": return value * 1000;
            case "US ton": return value * 907.185;
            case "long ton": return value * 1016.05;
            default: return value;
        }
    }

    const emptyUnit = document.getElementById("emptyWeight").nextElementSibling.value;
    const payloadUnit = document.getElementById("payloadWeight").nextElementSibling.value;

    const totalMass = toKg(emptyW, emptyUnit) + toKg(payloadW, payloadUnit);

    const v60 = 26.8224;
    const KE = 0.5 * totalMass * v60 * v60;
    const X = KE / P;

    const vehicleFactor = {
        "Sports car": 1.15,
        "Sedan": 1.27,
        "Hatchback": 1.30,
        "SUV": 1.35
    }[vehicleType];

    const drivePenalty = {
        "AWD (All Wheel Drive)": 2.7,
        "RWD (Rear Wheel Drive)": 3.2,
        "FWD (Front Wheel Drive)": 3.5
    }[driveType];

    const tirePenalty = {
        "Performance tires": 0.2,
        "Normal tires": 0.5
    }[tireType];

    const conditionPenalty = {
        "Dry": 0,
        "Damp": 0.5,
        "Wet": 1.0
    }[condition];

    const motorFactor = motorType === "Electric" ? 0.92 : 1.05;

    const tireFactor = tireType === "Performance tires" ? 0.95 : 1.08;

    const conditionFactor =
        condition === "Dry" ? 1.0 :
        condition === "Damp" ? 1.15 : 1.30;

    const gearboxPenalty = {
        "Direct-drive (Electric car)": 0,
        "Dual-clutch (Combustion car)": 0.25,
        "Automatic (Combustion car)": 0.4,
        "Manual (Combustion car)": 0.6
    }[gearbox];

    const base1 = vehicleFactor * X;
    const base2 = drivePenalty + tirePenalty + conditionPenalty;

    let time060 = Math.max(base1, base2);
    time060 = time060 * motorFactor * tireFactor * conditionFactor + gearboxPenalty;

    const timeRounded = time060.toFixed(1);

    let classText;
    if (time060 > 9) classText = "Slow";
    else if (time060 > 6.5) classText = "Average";
    else if (time060 > 4.5) classText = "Fast";
    else if (time060 > 3.2) classText = "High-performance";
    else classText = "Supercar";

    const table = document.querySelector("table");
    const row = table.rows[3];

    row.cells[1].textContent = `${timeRounded}s`;
    row.cells[2].textContent = classText;
}

function clearTable(){

    const table = document.querySelector("table");
    const row = table.rows[3];
  
    row.cells[1].textContent = "-";
    row.cells[2].textContent = "-";
    row.cells[3].textContent = "-";
}
