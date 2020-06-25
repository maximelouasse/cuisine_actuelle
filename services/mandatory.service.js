/* 
Definition
*/
    const Mandatories = {
        register: ['email'],
        login: ['email'],
        me: ['email'],
        partner: ['store_name', 'address', 'city', 'zipcode', 'dept_name', 'dept', 'store_location']
    };
//

/* 
Export
*/
    module.exports = Mandatories;
//