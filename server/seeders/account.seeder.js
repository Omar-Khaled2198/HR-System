const AccountSeeder = function(number){

    const faker = require('faker');
    const AccountRepository = require("../repositories/account.repository");
    const AccountRepositoryInstance = new AccountRepository();
    for(var i=0;i<number;i++){
        
        let account = {
            email: faker.internet.email(),
            password: "123456789",
            role: "employee",
            profile : {
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                job_title: faker.name.jobTitle(),
            }
        }
        try {
           
            AccountRepositoryInstance.Create(account);
            console.log("Done: ",i+1);
          } catch (error) {
            console.log(error);
          }
        
    }
}


module.exports = AccountSeeder;