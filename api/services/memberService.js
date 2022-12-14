var cosmosClient = require('../cosmosClient');

const database = cosmosClient.database('young-investors');
const collection = database.container('members');

const memberService = {
  getMembers: async () => {
    let iterator = collection.items.readAll();
    let { resources } = await iterator.fetchAll();
    return resources;
  },

  async updateMember(member) {
    let itemToUpdate = collection.item(member.id, undefined);
    let { resource } = await itemToUpdate.replace(member);
    return resource;
  },
};

module.exports = memberService;
