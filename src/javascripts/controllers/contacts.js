import {Contact} from '../models/contact'

export const contactAPI = (req, res, next) => {
    let contact = new Contact(req.body)
    contact.save(err => {
        if(err) {
            res.json({success: False, message: "unable to save to DB"})
        } else {
            res.status(200)
            res.end()
        }
    })
} 