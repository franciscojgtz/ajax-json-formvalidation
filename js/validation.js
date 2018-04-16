/*
*Validate an input in the form of an object
*/
function validateInput(validationFields){
	var numberOfFields = validationFields.length;
	var errors = [];

	for	(i = 0; i < numberOfFields; i++) {
		//validate each field and add the errors to the array
		var fieldErrors = [];
		fieldErrors = validate(validationFields[i]);
		errors = errors.concat(fieldErrors);
	} 
	return errors;
}

/*
*Validate each of the variables that are part of the object
*/
function validate(validationValues){
	var errors = [];
	var input = validationValues.val;
	
	if((typeof validationValues.required != 'undefined')  && (validationValues.required)){
		if (input.length == 0) {
			var msg = "Required input for: " + validationValues.name;
			errors.push(msg);;
		}
	}
	
	if(typeof validationValues.min != 'undefined'){
		if (input.length < validationValues.min) {
			var msg = "Input for " + validationValues.name + " must be at least " + validationValues.min + " digits long";
			errors.push(msg);
		}
	}
	
	if(typeof validationValues.max != 'undefined'){
		if (input.length > validationValues.max) {
			var msg = "Input for " + validationValues.name + " cannot be more than " + validationValues.max + " digits long";
			errors.push(msg);
		}
	}
	
	if(typeof validationValues.numeric != 'undefined'){
		input = +input;
		if (isNaN(input)) {
			var msg = "Input for " + validationValues.name + " must be a number";
			errors.push(msg);
		}
	}

	if((typeof validationValues.alphanumeric != 'undefined') && (validationValues.required)){
		if(!(/^([a-zA-Z0-9 _-]+)$/gi.test(input))){
			var msg = "Only letters and and numbers are allowed for: " + validationValues.name;
			errors.push(msg);
		}
	}
	
	// at least one number, one lowercase and one uppercase letter
    // at least eight characters
	if((typeof validationValues.password != 'undefined') && (validationValues.required)  && (validationValues.password)){	
		var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
		if(!re.test(input)){
			var msg = validationValues.name + " must have at least one number and one uppercase letter and be at leat 8 digits long";
			errors.push(msg);
		}
	}
	
	//check if passwords match
	if((typeof validationValues.match != 'undefined') && (validationValues.required)){	
		if(!(input == validationValues.match)){
			var msg = validationValues.name + " does not match the password";
			errors.push(msg);
		}
	}
	
	if(typeof validationValues.money != 'undefined'){	
		input = +input;
		if(isNaN(input)){
			var msg = validationValues.name + " is not money";
			errors.push(msg);
		}
	}
	
	if((typeof validationValues.date != 'undefined') && (validationValues.required)){	
		if(!isValidDate(input)){
			var msg = validationValues.name + " is not a valid date";
			errors.push(msg);
		}
	}
	
	return errors;
}

//this function was found at
//https://www.informationbuilders.com/support/developers/javascript-validate-date-entry
function isValidDate(dateStr) {
 
 // Checks for the following valid date formats:
 // MM/DD/YYYY
 // Also separates date into month, day, and year variables
 var datePat = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;
 
 var matchArray = dateStr.match(datePat); // is the format ok?
 if (matchArray == null) {
  msg = "Date must be in MM/DD/YYYY format";alert(msg);
  return false;
 }
 
 month = matchArray[1]; // parse date into variables
 day = matchArray[3];
 year = matchArray[4];
 if (month < 1 || month > 12) { // check month range
  msg = "Month must be between 1 and 12";
  return false;
 }
 if (day < 1 || day > 31) {
  msg = "Day must be between 1 and 31";
  return false;
 }
 if ((month==4 || month==6 || month==9 || month==11) && day==31) {
  msg = "Month "+month+" doesn't have 31 days!";
  return false;
 }
 if (month == 2) { // check for february 29th
  var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
  if (day>29 || (day==29 && !isleap)) {
   msg = "February " + year + " doesn't have " + day + " days!";
   return false;
    }
 }
 return true;  // date is valid
}