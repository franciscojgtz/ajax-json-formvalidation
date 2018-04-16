/*
*Validate LogOn
*/
function validateLogon(){
	var userId = document.logonForm.userid.value.trim();
	var userPassword = document.logonForm.password.value;
	
	var userIdValidation = {name: "username",
							val: userId,
							required: true, 
							alphanumeric: true,
							min:5,
							max:50,
							};
							
	var passwordValidation = {name: "password",
							  val: userPassword,
							  required: true, 
							  password: true,
							  min:8,
							  max:41,
							  };
							  
	var validationFields = [userIdValidation, passwordValidation];
	var validate = [];
	validate = validateInput(validationFields);
	displayValidationErrors(validate, "status");
	
	var obj = document.getElementById("status");
	if(validate.length == 0){
		obj.innerHTML = "no errors";
	}
	
	return false;
}

/*
*Display the errors encountered in the validation process
*errors is an array
*/
function displayValidationErrors(errors, divID){
	var numberOfErrors = errors.length;
	var obj = document.getElementById(divID);
	var errorsList = "<ul>";
	
	for	(i = 0; i < numberOfErrors; i++) {
		errorsList+= "<li>" + errors[i] +"</li>";
	} 
	
	errorsList += "</ul>";
	obj.innerHTML = errorsList;
	
}