export default class EmailService {
    constructor() {
        this.axios = require("axios")
        this.emailUrl = "http://localhost:3090/receipts"
    }
    sendMail(data) {
        return new Promise((resolve, reject) => {
            this.axios.post(this.emailUrl, data)
                .then(response => {
                    if (response.status === 201) return resolve(response.data)
                })
                .catch(err => { console.log(err) })
        })
    }
}