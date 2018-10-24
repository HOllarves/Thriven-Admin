export default class ClientService {

  constructor() {
    this.axios = require("axios")
    this.clientsUrl = "http://localhost:3090/clients/"
    this.paymentsUrl = "http://localhost:3090/payments/"
    this.investmentsUrl = "http://localhost:3090/investments/"
    this.receiptsUrl = "http://localhost:3090/receipts/"
  }

  getClients() {
    return new Promise((resolve, reject) => {
      this.axios.get(this.clientsUrl)
        .then(response => {
          if (response.status === 200) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  getClientById(id) {
    return new Promise((resolve, reject) => {
      this.axios.get(this.clientsUrl + id)
        .then(response => {
          if (response.status === 200) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  addClient(data) {
    return new Promise((resolve, reject) => {
      this.axios.post(this.clientsUrl, data)
        .then(response => {
          if (response.status === 201) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  editClient(id, data) {
    return new Promise((resolve, reject) => {
      this.axios.put(this.clientsUrl + id, data)
        .then(response => {
          if (response.status === 202) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  deleteClient(id) {
    return new Promise((resolve, reject) => {
      this.axios.delete(this.clientsUrl + id)
        .then(response => {
          if (response.status === 204) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  makePayment(data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      this.axios.post(this.paymentsUrl, data)
        .then(response => {
          console.log(response)
          if (response.status === 201) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  getPayments() {
    return new Promise((resolve, reject) => {
      this.axios.get(this.paymentsUrl)
        .then(response => {
          if (response.status === 200) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  getPaymentById(id) {
    return new Promise((resolve, reject) => {
      this.axios.get(this.receiptsUrl + id)
        .then(response => {
          if (response.status === 200) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  getPaymentsToClient(client_id) {
    return new Promise((resolve, reject) => {
      this.axios.get(this.paymentsUrl + client_id)
        .then(response => {
          if (response.status === 200) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  addInvestment(data) {
    return new Promise((resolve, reject) => {
      this.axios.post(this.investmentsUrl, data)
        .then(response => {
          console.log(response)
          if (response.status === 201) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  getClientByInvestment(id) {
    return new Promise((resolve, reject) => {
      this.axios.get(this.investmentsUrl + id)
        .then(response => {
          if (response.status === 200) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  editInvestment(id, data) {
    return new Promise((resolve, reject) => {
      this.axios.put(this.investmentsUrl + id, data)
        .then(response => {
          if (response.status === 202) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }

  deleteInvestment(id) {
    return new Promise((resolve, reject) => {
      this.axios.delete(this.investmentsUrl + id)
        .then(response => {
          if (response.status === 204) return resolve(response.data)
        })
        .catch(err => { console.log(err) })
    })
  }
}
