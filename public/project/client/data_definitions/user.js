var User = (function() {
	"use strict"
	
	return class {
		
		// String * String * String -> User
		constructor(username, password, email) {
			this.username = username;
			this.password = password;
			this.email = email;
		}
		
	};
	
})();