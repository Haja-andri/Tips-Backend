
exports.seed = function(knex) {
  return knex('accounts').truncate()
  .then(()=>{
    return knex('customers').insert([
      {
        name: 'Phil', 
        first_name: 'Collins', 
        mobile: '+33617570858' , 
        email: 'phil@email.com',
        password: 'dfe9q8y4tbasiu840KJHS83kn',
      },
      {
        name: 'Peter', 
        first_name: 'Brad', 
        mobile: '+33617570860' , 
        email: 'peter@email.com',
        password: 'dfe9q8y4tbasiuHGSD*&T840KJHS83kn',
      },
    ]);  
  });
};
