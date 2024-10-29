"use strict";
class Digit {
    constructor(digit) {
        if (digit.length !== 1 || !Digit.alphabet.includes(digit)) {
            throw new Error(`"${digit}" is not a valid digit. Permitted characters: ${Digit.alphabet.split('').join(', ')}.\`)`);
        }
        this.digit = digit;
    }
    toString() {
        return this.digit;
    }
    valueOf() {
        return Digit.alphabet.indexOf(this.digit);
    }
}
Digit.alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
class Multiplier {
    constructor() {
        this.multipliers = [7, 3, 1];
        this.index = 0;
    }
    valueOf() {
        const multiplier = this.multipliers[this.index];
        this.index = (this.index + 1) % this.multipliers.length;
        return multiplier;
    }
}
function checkDigit(str) {
    let sum = 0;
    let multiplier = new Multiplier();
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == "<") {
            continue;
        }
        sum += (((new Digit(str.charAt(i))).valueOf() * multiplier.valueOf()) % 10);
    }
    return sum % 10;
}
class AuthorityID {
    constructor(authorityID) {
        if (authorityID.length != 4) {
            throw new Error("AuthorityID must be 4 digits long.");
        }
        else if (!AuthorityID.allowedFirstCharacters.includes(authorityID.charAt(0))) {
            throw new Error("AuthorityID must begin with either L, M, N, P, R, T, V, W, X or Y.");
        }
        else if (!new RegExp(`^[${AuthorityID.allowedCharacters}]*$`).test(authorityID)) {
            throw new Error(`AuthorityID "${authorityID}" contains illegal characters. Permitted characters: ${AuthorityID.allowedCharacters.split('').join(', ')}.`);
        }
        this.authorityID = authorityID;
    }
    toString() {
        return this.authorityID;
    }
    static generate() {
        const authorityIDs = [
            'L01X',
            'L2CJ',
            'L353',
            'L6Z8',
            'L72G',
            'L73Y',
            'L79V',
            'L7TH',
            'L88N',
            'L933'
        ];
        return authorityIDs[Math.floor(Math.random() * authorityIDs.length)];
    }
}
AuthorityID.allowedFirstCharacters = 'LMNPRTVWXY';
AuthorityID.allowedCharacters = '0123456789CFGHJKLMNPRTVWXYZ';
class AssignedNumber {
    constructor(assignedNumber) {
        if (assignedNumber.length != 5) {
            throw new Error("AssignedNumber must be 5 digits long.");
        }
        else if (!new RegExp(`^[${AssignedNumber.allowedCharacters}]*$`).test(assignedNumber)) {
            throw new Error(`AssignedNumber "${assignedNumber}" contains illegal characters. Permitted characters: ${AssignedNumber.allowedCharacters.split('').join(', ')}.`);
        }
        this.assignedNumber = assignedNumber;
    }
    toString() {
        return this.assignedNumber;
    }
    static generate() {
        let assignedNumber = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * AssignedNumber.allowedCharacters.length);
            assignedNumber += AssignedNumber.allowedCharacters[randomIndex];
        }
        return assignedNumber;
    }
}
AssignedNumber.allowedCharacters = '0123456789CFGHJKLMNPRTVWXYZ';
class DocumentID {
    constructor(authorityID, assignedNumber) {
        this.authorityID = authorityID;
        this.assignedNumber = assignedNumber;
    }
    toString() {
        return "" + this.authorityID + this.assignedNumber;
    }
    checkDigit() {
        return checkDigit(this.toString());
    }
}
class DateYYMM {
    constructor(date) {
        this.year = date.getFullYear().toString().slice(-2);
        this.month = (date.getMonth() + 1).toString().padStart(2, '0');
    }
    toString() {
        return this.year + this.month;
    }
}
class DateYYMMDD extends DateYYMM {
    constructor(date) {
        super(date);
        this.day = date.getDate().toString().padStart(2, '0');
    }
    toString() {
        return super.toString() + this.day;
    }
    checkDigit() {
        return checkDigit(this.toString());
    }
}
function generateBirthDate() {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 18 - Math.floor(Math.random() * 51));
    birthDate.setDate(birthDate.getDate() - Math.floor(Math.random() * 366));
    return birthDate.toISOString().slice(0, 10);
}
function generateExpiryDate() {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 6);
    return expiryDate.toISOString().slice(0, 10);
}
function generateIssuingDate() {
    return new Date().toISOString().slice(0, 10);
}
class MachineReadableZone {
    constructor(authorityID, assignedNumber, birthDate, expiryDate, issuingDate) {
        this.documentCode = "ID";
        this.issuingState = "D";
        this.documentID = new DocumentID(new AuthorityID(authorityID), new AssignedNumber(assignedNumber));
        this.birthDate = new DateYYMMDD(birthDate);
        this.expiryDate = new DateYYMMDD(expiryDate);
        this.nationality = "D";
        this.versionNumber = new DateYYMM(issuingDate);
    }
    toString() {
        let line1 = "";
        line1 = line1 + this.documentCode + this.issuingState;
        line1 = line1 + "<".repeat(2);
        line1 = line1 + this.documentID;
        line1 = line1 + this.documentID.checkDigit();
        line1 = line1 + "<".repeat(15);
        let line2 = "";
        line2 = line2 + this.birthDate + this.birthDate.checkDigit();
        line2 = line2 + "<".repeat(1);
        line2 = line2 + this.expiryDate + this.expiryDate.checkDigit();
        line2 = line2 + this.nationality;
        line2 = line2 + "<".repeat(2);
        line2 = line2 + this.versionNumber;
        line2 = line2 + "<".repeat(7);
        line2 = line2 + checkDigit(this.documentID.toString() + this.documentID.checkDigit() + this.birthDate + this.birthDate.checkDigit() + this.expiryDate + this.expiryDate.checkDigit() + this.versionNumber);
        let line3 = "";
        line3 = line3 + "MUSTERMANN";
        line3 = line3 + "<".repeat(2);
        line3 = line3 + "ERIKA";
        line3 = line3 + "<".repeat(13);
        return line1 + "\n" + line2 + "\n" + line3;
    }
}
function loadHTML() {
    const persogenDashboard = document.querySelector('.persogen-dashboard');
    const htmlContent = `
    <fieldset id="fieldset">
        <legend id="fieldset-legend">ID Card Number Generator</legend>
        <form>
            <input id="input-field-1" class="input-field" type="text" maxlength="4">
            <label id="input-field-1-label" for="input-field-1">Authority ID</label>
            <br>
            <input id="input-field-2" class="input-field" type="text" maxlength="5">
            <label id="input-field-2-label" for="input-field-2">Number</label>
            <br>
            <input id="input-field-3" class="input-field" type="date">
            <label id="input-field-3-label" for="input-field-3">Birth Date</label>
            <br>
            <input id="input-field-4" class="input-field" type="date">
            <label id="input-field-4-label" for="input-field-4">Expiry Date</label>
            <br>
            <input id="input-field-5" class="input-field" type="date">
            <label id="input-field-5-label" for="input-field-5">Issuing Date</label>
            <br>
            <button id="button-reset">Reset</button>
            <button id="button-random">New</button>
        </form>
        <br>
        <label id="output-field-label" for="output-field">ID Card Number</label>
        <br>
        <textarea id="output-field" rows="3" cols="30" readonly></textarea>
    </fieldset>
    `;
    if (persogenDashboard) {
        persogenDashboard.innerHTML = htmlContent;
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    loadHTML();
    const inputField1 = document.getElementById("input-field-1");
    const inputField2 = document.getElementById("input-field-2");
    const inputField3 = document.getElementById("input-field-3");
    const inputField4 = document.getElementById("input-field-4");
    const inputField5 = document.getElementById("input-field-5");
    const inputFields = document.querySelectorAll('.input-field');
    const buttonRandom = document.getElementById("button-random");
    const buttonReset = document.getElementById("button-reset");
    const outputField = document.getElementById("output-field");
    let inputField1Placeholder;
    let inputField2Placeholder;
    let inputField3Placeholder;
    let inputField4Placeholder;
    let inputField5Placeholder;
    function updateOutputField() {
        try {
            const authorityID = inputField1.value.trim() !== '' ? inputField1.value : inputField1Placeholder;
            const assignedNumber = inputField2.value.trim() !== '' ? inputField2.value : inputField2Placeholder;
            const birthDate = inputField3.value;
            const expiryDate = inputField4.value;
            const issuingDate = inputField5.value;
            let mrz = new MachineReadableZone(authorityID, assignedNumber, new Date(birthDate), new Date(expiryDate), new Date(issuingDate));
            outputField.value = mrz.toString();
        }
        catch (error) {
            outputField.value = "" + error;
        }
    }
    inputField1.addEventListener("input", updateOutputField);
    inputField2.addEventListener("input", updateOutputField);
    inputField3.addEventListener("input", updateOutputField);
    inputField4.addEventListener("input", updateOutputField);
    inputField5.addEventListener("input", updateOutputField);
    inputFields.forEach((inputField) => {
        inputField.addEventListener("input", () => {
            if (inputField.value === inputField.placeholder) {
                inputField.classList.add('placeholder');
            }
            else if (inputField.classList.contains('placeholder')) {
                inputField.classList.remove('placeholder');
            }
        });
    });
    function reset() {
        inputField1.value = '';
        inputField2.value = '';
        inputField3.value = inputField3Placeholder;
        inputField4.value = inputField4Placeholder;
        inputField5.value = inputField5Placeholder;
        inputField3.classList.add('placeholder');
        inputField4.classList.add('placeholder');
        inputField5.classList.add('placeholder');
        updateOutputField();
    }
    buttonReset.addEventListener("click", (event) => { reset(); event.preventDefault(); });
    function random() {
        inputField1Placeholder = AuthorityID.generate();
        inputField2Placeholder = AssignedNumber.generate();
        inputField3Placeholder = generateBirthDate();
        inputField4Placeholder = generateExpiryDate();
        inputField5Placeholder = generateIssuingDate();
        inputField1.placeholder = inputField1Placeholder;
        inputField2.placeholder = inputField2Placeholder;
        inputField3.placeholder = inputField3Placeholder;
        inputField4.placeholder = inputField4Placeholder;
        inputField5.placeholder = inputField5Placeholder;
        reset();
    }
    buttonRandom.addEventListener("click", (event) => { random(); event.preventDefault(); });
    random();
});
