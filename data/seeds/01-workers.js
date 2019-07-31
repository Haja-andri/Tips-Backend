
exports.seed = function(knex) {
  return knex('accounts').truncate()
  .then(()=>{
    return knex('workers').insert([
      {
        name: 'Andri', 
        first_name: 'Andjy', 
        job_title: 'Cook', 
        mobile: '+33617570858' , 
        email: 'andjy@email.com',
        photo: 'https://source.unsplash.com/1600x900/?portrait',
        start_date: '06/2019',
        tagline: 'Awsome tagline here',
        password: 'dfe9q8y4tbasiu840KJHS83kn',
      },
      {
        name: 'Ben', 
        first_name: 'Harpper', 
        job_title: 'Waiter', 
        mobile: '+33617570859' , 
        email: 'ben@email.com',
        photo: 'https://source.unsplash.com/1600x900/?portrait',
        start_date: '06/2016',
        tagline: 'Live before you die',
        password: 'dfe9q8y4tbasiu840KGGSVDJHS83kn',
      },
      {
        name: 'Anni', 
        first_name: 'Hatta', 
        job_title: 'Cleaner', 
        mobile: '+33617570860' , 
        email: 'anni@email.com',
        photo: 'https://source.unsplash.com/1600x900/?portrait',
        start_date: '06/2012',
        tagline: 'Anni rocks',
        password: 'dfe9q8y4tHSGDbasiuSHDGU840KJHS83kn',
      },
    ]);
  })
};
