import Joi from "joi";

export const addCategorySchema = Joi.object({
    name: Joi.string()
        .valid(
            "Gujarati",
            "Chiness",
            "South Indian",
            "Burger",
            "Pizza",
            "Italian",
            "Dessert",
            "Drinks",
        )
        .required()
        .message({
            "string-base":"category name must be in string formate",
            "any.only":"please select a valid category",
            "any.requried":"category name requried"
        }),

        description:({
            "string-base":"Description must be in string formate",
            "string.min":"description must be in at lest 5 charcter long",
            "string.max":"descripton must be in atleast 100 charcters ",
            "any.requried":"description is requried"
        }),
});

export const updateCategorySchema = addCategorySchema
.fork(["name","description"],(fields)=>fields.optional())
.or("name","description")
.message({
    "object.missing":"name and description any one is requeried"
})