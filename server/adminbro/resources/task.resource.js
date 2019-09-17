const Task = require("../../models/task.model");
const ProfileRepository = require("../../repositories/profile.repository");

module.exports = {
    resource: Task,
    options: {
        properties:{
            _id: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: false,
                    edit: false
                }
            },
            timestamp: {
                isVisible: {
                    new: false,
                    list: false,
                    filter: false,
                    show: false,
                    edit: false
                }
			},
			deadline: {
				type: "date"
			}
        },
        actions: {
            new: {
                label: "Assign",
                actionType: 'resource',
                isVisible: true,
                handler: async (request, response, data) => {
                    if (request.method === 'post') {
                      let record = await data.resource.build(request.payload.record)
                      record.params.timestamp = Date.now();
					  record = await record.save()
                      if (record.isValid()) {
						const query = {_id:record.params.assigned_to};
						const update = {$push:{"tasks":record.params._id}}
						await ProfileRepository.Update(query,update);
                        return {
                          redirectUrl: data.h.recordActionUrl({
                            resourceId: data.resource.id(), recordId: record.id(), actionName: 'show',
                          }),
                          record: record.toJSON(),
                        }
                      }
                      return { record: record.toJSON() }
                    }
                    return {}
                  }
            },
            edit: {
              isVisible: false
            }
        }
    }
}