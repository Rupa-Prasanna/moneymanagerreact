import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

// import MoneyDetails from "../MoneyDetails"

import TransactionItem from '../TransactionItem'

/* const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
] */

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    balance: 0,
    income: 0,
    expenses: 0,
    typeInput: 'INCOME',
  }

  onDelete = id => {
    const {transactionsList} = this.state
    const deletedTransaction = transactionsList.filter(each => each.id === id)

    this.setState(prev => ({
      transactionsList: prev.transactionsList.filter(each => each.id !== id),
      balance:
        deletedTransaction.type === 'Income'
          ? prev.balance - parseInt(deletedTransaction.amount)
          : prev.balance + parseInt(deletedTransaction.amount),
      income:
        deletedTransaction.type === 'INCOME'
          ? prev.income - parseInt(deletedTransaction.amount)
          : prev.income,
      expenses:
        deletedTransaction.type === 'EXPENSES'
          ? prev.expenses - parseInt(deletedTransaction.amount)
          : prev.expenses,
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({typeInput: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {typeInput, amountInput, titleInput} = this.state

    if (typeInput === 'INCOME') {
      this.setState(prev => ({
        income: prev.income + parseInt(amountInput),
        balance: prev.balance + parseInt(amountInput),
      }))
    } else {
      this.setState(prev => ({
        expenses: prev.expenses + parseInt(amountInput),
        balance: prev.balance - parseInt(amountInput),
      }))
    }
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: typeInput,
    }
    this.setState(prev => ({
      transactionsList: [...prev.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      typeInput: 'INCOME',
    }))
  }

  render() {
    const {
      transactionsList,
      titleInput,
      amountInput,
      balance,
      income,
      expenses,
      typeInput,
    } = this.state

    return (
      <div className="bg-container">
        <div className="name-container">
          <h1> Hi Rupa </h1>
          <p>
            Welcome back to your <span className="span">Money Manager </span>
          </p>
        </div>
        <div className="mid-container">
          <div className="type-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
              className="image"
            />
            <div className="amount-container">
              <p>Your Balance</p>
              <p data-testid="balanceAmount">
                Rs <span className="amount">{balance}</span>
              </p>
            </div>
          </div>
          <div className="type-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
              className="image"
            />
            <div className="amount-container">
              <p>Your Income</p>
              <p data-testid="incomeAmount">
                Rs <span className="amount">{income}</span>
              </p>
            </div>
          </div>
          <div className="type-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
              className="image"
            />
            <div className="amount-container">
              <p>Your Expenses</p>
              <p data-testid="expensesAmount">
                Rs <span className="amount">{expenses}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <div className="transaction-container">
            <h1> Add Transaction </h1>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <label htmlFor="title"> TITLE </label>
              <input
                type="text"
                id="title"
                placeholder="TITLE"
                value={titleInput}
                onChange={this.onChangeTitle}
              />
              <label htmlFor="amount"> AMOUNT </label>
              <input
                type="text"
                id="amount"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={this.onChangeAmount}
              />
              <label htmlFor="type"> TYPE </label>
              <select
                type="text"
                id="type"
                value={typeInput}
                onChange={this.onChangeType}
              >
                <option value="INCOME"> Income </option>
                <option value="EXPENSES"> Expenses</option>
              </select>
              <div className="button">
                <button type="submit"> Add </button>
              </div>
            </form>
          </div>
          <div className="output-container">
            <h1> History </h1>

            <div className="heading">
              <p className="details"> Title</p>
              <p className="details"> Amount </p>
              <p className="details"> Type </p>
            </div>
            <hr className="hr" />
            <div className="output">
              <ul className="output">
                {transactionsList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    onDelete={this.onDelete}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
