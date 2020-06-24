const demo = {

    db: {},

    init: () => {
        demo.db = new PouchDB('building-on-html5');
        console.log(demo.db);
    },

    add: async () => {
      const person = {
          _id: 'craig',
          twitter: 'craigshoemaker'
      };

      const response = await demo.db.put(person);
      console.log(response);
    },

    get: async () => {
        const craig = await demo.db.get('craig');
        console.log(craig);
    },

    update: async () => {
        const person = await demo.db.get('craig');
        person.github = 'craigshoemaker';
        const response = await demo.db.put(person);
        console.log(response);
    },

    delete: async () => {
        const person = await demo.db.get('craig');
        const response = await demo.db.remove(person);
        console.log(response);
    }
};