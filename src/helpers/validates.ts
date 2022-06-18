import { helpers, required } from '@vuelidate/validators'
const regexUrl = helpers.regex(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)

const rulesValidateLinks = {
    link: {
        regexUrl: helpers.withMessage('The link is not valid', regexUrl),
        required: helpers.withMessage('This link is required', required)
    },
    titleLink: {
        required: helpers.withMessage('This titleLink is required', required)
    }
}

export {
   rulesValidateLinks
}
