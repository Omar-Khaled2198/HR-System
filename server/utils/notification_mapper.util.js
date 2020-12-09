const NotificationMapper = function(action){
    
    const notification = {
        notification : {
            sound: "default",
			title: 
					action=="UPDATEPROFILE"? 
							"Profile Updated" : 
					action=="NEWTASK"? 
							"New Task" : 
					action=="UPDATETASK"? 
							"Task Status" :
					action=="UPDATEVACATION"?
							"Vacation Request Status"
							: 
							"",
			body:
					action=="UPDATEPROFILE"? 
							"Your Profile has been updated!" : 
					action=="NEWTASK"? 
							"You have been assigned to a new Task!" : 
					action=="UPDATETASK"? 
							"Your tasks status has been changed!" :
					action=="UPDATEVACATION"?
							"Your vacation request status has been changed!"
							: 
							"",
				
        }
    }
    
        return notification;
}

module.exports = NotificationMapper;