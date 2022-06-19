import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    //below we call to each property that will need to be validated and use Yup to define the requirements for each property 
    catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(50, 'Max 50 characters').nullable(true)
})

const todoSchema = Yup.object().shape({
    name: Yup.string().max(25, 'Max 25 characters').required(), 
    details: Yup.string().max(500, 'Max 500 characters').nullable(true), 
    done: Yup.bool().required(),
    categoryId: Yup.number().required()
})

export { todoSchema };
export default catSchema;